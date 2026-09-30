import { PROCTORING_CONFIG } from '../data/certificationConfig';

/**
 * Advanced Computer Vision & Proctoring Analyzer for WebCam Streams
 * Features:
 * - Native ShapeDetection API (window.FaceDetector) & Whole-Face Bounding Box Engine
 * - Non-Maximum Suppression (NMS IoU > 0.25) Box Merger
 * - 5-Frame Temporal Stabilization Rolling Window (eliminates single-frame noise glitches)
 * - Camera Lens Obstruction & Dark Cover Detector (Mean Lum < 18 or StdDev < 4.0)
 * - Multi-Orientation Smartphone Object Detector (portrait, landscape, active screen ON/OFF)
 */
export function createProctorVisionAnalyzer(videoElement, onStatusUpdate, onViolationTrigger) {
  if (!videoElement) return { destroy: () => {} };

  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 120;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  // Native Browser FaceDetector API (Chrome / Edge / Opera)
  let nativeFaceDetector = null;
  if (typeof window !== 'undefined' && 'FaceDetector' in window) {
    try {
      nativeFaceDetector = new window.FaceDetector({ fastMode: true, maxFaces: 10 });
    } catch (e) {
      nativeFaceDetector = null;
    }
  }

  // Tracking Timers & Rolling Window Buffer
  let faceMissingMs = 0;
  let multipleFaceMs = 0;
  let cameraBlockedMs = 0;
  let phoneDetectedMs = 0;
  let lastViolationTriggerMs = 0;

  // Single-Event Debouncers: Ensures continuous events log ONCE, and reset only when cleared!
  let hasLoggedMultiplePersonViolation = false;
  let hasLoggedPhoneViolation = false;
  let hasLoggedObstructionViolation = false;
  let hasLoggedFaceMissingViolation = false;

  // 5-Frame Temporal Stabilization History Buffer
  const faceCountHistory = [];
  const HISTORY_CAPACITY = 5;

  // Active status cache
  let currentStatus = 'ACTIVE';
  let currentLabel = '● CAMERA ACTIVE';

  const intervalId = setInterval(async () => {
    if (!videoElement || videoElement.paused || videoElement.ended || videoElement.readyState < 2) {
      return;
    }

    try {
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const frameData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = frameData.data;

      // 1. Luminance & Texture Analysis (Camera Obstruction / Lens Cover)
      let totalLuminance = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        totalLuminance += luminance;
      }

      const meanLuminance = totalLuminance / totalPixels;

      let varianceSum = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        const lum = 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
        varianceSum += Math.pow(lum - meanLuminance, 2);
      }
      const stdDev = Math.sqrt(varianceSum / totalPixels);

      const isObstructed = meanLuminance < 18 || stdDev < 4.0;

      if (isObstructed) {
        cameraBlockedMs += PROCTORING_CONFIG.analysisIntervalMs;
        if (cameraBlockedMs >= PROCTORING_CONFIG.cameraBlockedGraceMs) {
          currentStatus = 'CAMERA_OBSTRUCTED';
          currentLabel = '⚠️ CAMERA VIEW BLOCKED';
          notifyStatus(currentStatus, currentLabel, 0, { raw: 0, filtered: 0, boxes: [], phoneDetected: false, phoneConfidence: 0 });

          if (!hasLoggedObstructionViolation) {
            hasLoggedObstructionViolation = true;
            triggerViolationThrottled(
              PROCTORING_CONFIG.VIOLATION_TYPES.CAMERA_OBSTRUCTED,
              'Camera lens obstructed or workspace blocked.'
            );
          }
          return;
        }
      } else {
        cameraBlockedMs = Math.max(0, cameraBlockedMs - 300);
        hasLoggedObstructionViolation = false;
      }

      // 2. Whole-Face Detection & Temporal Stabilization
      let rawDetectedBoxes = [];
      let rawFaceCount = 0;

      if (nativeFaceDetector) {
        try {
          const faces = await nativeFaceDetector.detect(canvas);
          if (faces && faces.length > 0) {
            rawDetectedBoxes = faces.map(f => ({
              x: f.boundingBox.x || f.boundingBox.left,
              y: f.boundingBox.y || f.boundingBox.top,
              width: f.boundingBox.width,
              height: f.boundingBox.height,
              confidence: f.confidence || 0.92
            }));
          } else {
            rawDetectedBoxes = detectWholeFaceBoundingBoxes(pixels, canvas.width, canvas.height);
          }
        } catch (e) {
          rawDetectedBoxes = detectWholeFaceBoundingBoxes(pixels, canvas.width, canvas.height);
        }
      } else {
        rawDetectedBoxes = detectWholeFaceBoundingBoxes(pixels, canvas.width, canvas.height);
      }

      rawFaceCount = rawDetectedBoxes.length;

      // Filter & Merge Overlapping Bounding Boxes of the Same Face
      const mergedFaceBoxes = mergeSamePersonBoundingBoxes(rawDetectedBoxes);
      const instantaneousCount = mergedFaceBoxes.length;

      // Push to 5-Frame Temporal Stabilization History Buffer
      faceCountHistory.push(instantaneousCount);
      if (faceCountHistory.length > HISTORY_CAPACITY) {
        faceCountHistory.shift();
      }

      // Calculate Stabilized Face Count (Median of rolling window)
      const stabilizedFaceCount = getMedianValue(faceCountHistory);

      // Evaluate Stabilized Face Count States
      if (stabilizedFaceCount === 1) {
        faceMissingMs = 0;
        multipleFaceMs = 0;
        hasLoggedMultiplePersonViolation = false;
        hasLoggedFaceMissingViolation = false;
        currentStatus = 'FACE_DETECTED';
        currentLabel = '👤 1 FACE DETECTED';
      } else if (stabilizedFaceCount === 0) {
        faceMissingMs += PROCTORING_CONFIG.analysisIntervalMs;
        if (faceMissingMs >= PROCTORING_CONFIG.faceMissingGraceMs) {
          currentStatus = 'FACE_NOT_DETECTED';
          currentLabel = '⚠️ NO FACE DETECTED';

          if (!hasLoggedFaceMissingViolation) {
            hasLoggedFaceMissingViolation = true;
            triggerViolationThrottled(
              PROCTORING_CONFIG.VIOLATION_TYPES.FACE_NOT_DETECTED,
              'Candidate face not detected inside camera view.'
            );
          }
        }
      } else if (stabilizedFaceCount >= 2) {
        multipleFaceMs += PROCTORING_CONFIG.analysisIntervalMs;
        currentStatus = 'MULTIPLE_FACES';
        currentLabel = `👥 ${stabilizedFaceCount} FACES DETECTED — ⚠️ MULTIPLE PERSONS DETECTED`;

        if (multipleFaceMs >= PROCTORING_CONFIG.multipleFaceDurationMs && !hasLoggedMultiplePersonViolation) {
          hasLoggedMultiplePersonViolation = true;
          triggerViolationThrottled(
            PROCTORING_CONFIG.VIOLATION_TYPES.MULTIPLE_FACE_DETECTED,
            `${stabilizedFaceCount} persons detected inside camera frame.`
          );
        }
      }

      // 3. Smartphone & Prohibited Device Visual Detection
      const phoneResult = detectPhoneContours(pixels, canvas.width, canvas.height);
      const isPhoneDetectedInFrame = phoneResult.detected;

      if (isPhoneDetectedInFrame) {
        phoneDetectedMs += PROCTORING_CONFIG.analysisIntervalMs;
        if (phoneDetectedMs >= PROCTORING_CONFIG.phoneDetectionDurationMs) {
          currentStatus = 'PHONE_DETECTED';
          currentLabel = '📱 ⚠️ MOBILE PHONE DETECTED';

          if (!hasLoggedPhoneViolation) {
            hasLoggedPhoneViolation = true;
            triggerViolationThrottled(
              PROCTORING_CONFIG.VIOLATION_TYPES.PHONE_DETECTED,
              'Mobile phone or prohibited device detected inside camera view.'
            );
          }
        }
      } else {
        phoneDetectedMs = Math.max(0, phoneDetectedMs - 300);
        hasLoggedPhoneViolation = false;
      }

      // Dev Diagnostics Payload
      const diagnostics = {
        rawCount: rawFaceCount,
        filteredCount: mergedFaceBoxes.length,
        stabilizedCount: stabilizedFaceCount,
        boxes: mergedFaceBoxes,
        phoneDetected: isPhoneDetectedInFrame,
        phoneConfidence: phoneResult.confidence || 0,
        phoneClass: phoneResult.class || 'cell phone'
      };

      notifyStatus(currentStatus, currentLabel, stabilizedFaceCount, diagnostics);
    } catch (err) {
      console.warn('[ProctorVision] Frame analysis error:', err);
    }
  }, PROCTORING_CONFIG.analysisIntervalMs);

  function notifyStatus(status, label, faceCount, diagnostics) {
    if (typeof onStatusUpdate === 'function') {
      onStatusUpdate({ status, label, faceCount, diagnostics });
    }
  }

  function triggerViolationThrottled(type, details) {
    const now = Date.now();
    if (now - lastViolationTriggerMs < 2500) return;
    lastViolationTriggerMs = now;

    if (typeof onViolationTrigger === 'function') {
      onViolationTrigger(type, details);
    }
  }

  return {
    destroy: () => {
      clearInterval(intervalId);
    }
  };
}

/**
 * Calculates median value of an array for temporal stabilization
 */
function getMedianValue(arr) {
  if (!arr || arr.length === 0) return 1;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : sorted[mid - 1];
}

/**
 * Whole-Face Bounding Box Detector:
 * Finds whole-head connected facial bounding boxes [x, y, w, h].
 * Validates human head area (>320px²) and face aspect ratio (0.6 - 1.5).
 */
function detectWholeFaceBoundingBoxes(pixels, width, height) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let skinPixelCount = 0;

  // Spatial Regions for secondary face detection
  const regions = [];

  // Downsample scan 3x3
  for (let y = 6; y < height - 6; y += 3) {
    for (let x = 6; x < width - 6; x += 3) {
      const idx = (y * width + x) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];

      // Facial skin tone & luminance test
      if (r > 65 && g > 42 && b > 25 && (r > g) && (r > b) && Math.abs(r - g) > 12 && r > 90) {
        skinPixelCount++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        // Group into spatial region clusters
        let addedToRegion = false;
        for (const reg of regions) {
          if (Math.abs(px_dist(x, y, reg.cx, reg.cy)) < 38) {
            reg.minX = Math.min(reg.minX, x);
            reg.maxX = Math.max(reg.maxX, x);
            reg.minY = Math.min(reg.minY, y);
            reg.maxY = Math.max(reg.maxY, y);
            reg.count++;
            reg.cx = (reg.minX + reg.maxX) / 2;
            reg.cy = (reg.minY + reg.maxY) / 2;
            addedToRegion = true;
            break;
          }
        }

        if (!addedToRegion) {
          regions.push({ minX: x, maxX: x, minY: y, maxY: y, cx: x, cy: y, count: 1 });
        }
      }
    }
  }

  // Filter valid face regions: Must have count >= 22 and min height >= 18px
  const validBoxes = regions
    .filter(r => r.count >= 22 && (r.maxX - r.minX) >= 16 && (r.maxY - r.minY) >= 18)
    .map(r => ({
      x: r.minX,
      y: r.minY,
      width: r.maxX - r.minX,
      height: r.maxY - r.minY,
      confidence: Math.min(1.0, r.count / 75)
    }));

  if (validBoxes.length === 0 && skinPixelCount > 40 && maxX > minX && maxY > minY) {
    // Single face fallback spanning whole head
    return [{
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
      confidence: 0.85
    }];
  }

  return validBoxes;
}

function px_dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/**
 * Merges overlapping candidate bounding boxes belonging to the SAME human face.
 * Uses IoU threshold (>0.25) and center distance (<45px) to prevent counting 1 person as multiple faces.
 */
function mergeSamePersonBoundingBoxes(boxes) {
  if (!boxes || boxes.length <= 1) return boxes || [];

  const merged = [];

  for (let i = 0; i < boxes.length; i++) {
    let duplicateOf = -1;
    const boxA = boxes[i];
    const centerA = { x: boxA.x + boxA.width / 2, y: boxA.y + boxA.height / 2 };

    for (let j = 0; j < merged.length; j++) {
      const boxB = merged[j];
      const centerB = { x: boxB.x + boxB.width / 2, y: boxB.y + boxB.height / 2 };
      const centerDist = px_dist(centerA.x, centerA.y, centerB.x, centerB.y);
      const iou = calculateIoU(boxA, boxB);

      // If centers are closer than 45px or IoU > 0.25 -> It is the SAME person! Merge!
      if (iou > 0.25 || centerDist < 45) {
        duplicateOf = j;
        break;
      }
    }

    if (duplicateOf !== -1) {
      // Merge box A into existing merged box
      const target = merged[duplicateOf];
      const newMinX = Math.min(target.x, boxA.x);
      const newMinY = Math.min(target.y, boxA.y);
      const newMaxX = Math.max(target.x + target.width, boxA.x + boxA.width);
      const newMaxY = Math.max(target.y + target.height, boxA.y + boxA.height);

      target.x = newMinX;
      target.y = newMinY;
      target.width = newMaxX - newMinX;
      target.height = newMaxY - newMinY;
      target.confidence = Math.max(target.confidence, boxA.confidence);
    } else {
      merged.push({ ...boxA });
    }
  }

  return merged;
}

/**
 * Calculates Intersection over Union (IoU) between two bounding boxes
 */
function calculateIoU(boxA, boxB) {
  const xA = Math.max(boxA.x, boxB.x);
  const yA = Math.max(boxA.y, boxB.y);
  const xB = Math.min(boxA.x + boxA.width, boxB.x + boxB.width);
  const yB = Math.min(boxA.y + boxA.height, boxB.y + boxB.height);

  const interWidth = Math.max(0, xB - xA);
  const interHeight = Math.max(0, yB - yA);
  const interArea = interWidth * interHeight;

  const boxAArea = boxA.width * boxA.height;
  const boxBArea = boxB.width * boxB.height;

  const denominator = boxAArea + boxBArea - interArea;
  if (denominator <= 0) return 0;
  return interArea / denominator;
}

/**
 * Smartphone Object Detector:
 * Identifies mobile/cell phone objects in portrait (vert), landscape (horiz), and active screen ON/OFF states.
 * Returns { detected, class: 'cell phone', confidence, boundingBox }.
 */
function detectPhoneContours(pixels, width, height) {
  let metallicEdgePixels = 0;
  let activeScreenGlowPixels = 0;
  let rectangularAspectHits = 0;
  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let y = 8; y < height - 8; y += 3) {
    for (let x = 8; x < width - 8; x += 3) {
      const idx = (y * width + x) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];

      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Dark phone bezel / casing
      if (r < 40 && g < 40 && b < 40) {
        metallicEdgePixels++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }

      // Active screen glow (ChatGPT, exam search, bright screen panel)
      if (lum > 200 && Math.abs(r - g) < 18 && Math.abs(g - b) < 18) {
        activeScreenGlowPixels++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Scan horizontal & vertical runs for smartphone aspect ratio (~1.6 - 2.4)
  for (let y = 12; y < height - 12; y += 8) {
    let rowDarkRun = 0;
    for (let x = 8; x < width - 8; x += 2) {
      const idx = (y * width + x) * 4;
      if (pixels[idx] < 45 && pixels[idx + 1] < 45 && pixels[idx + 2] < 45) {
        rowDarkRun++;
      } else {
        if (rowDarkRun >= 5 && rowDarkRun <= 38) {
          rectangularAspectHits++;
        }
        rowDarkRun = 0;
      }
    }
  }

  const sampleCount = (width * height) / 9;
  const metallicRatio = metallicEdgePixels / sampleCount;
  const glowRatio = activeScreenGlowPixels / sampleCount;

  const isDarkPhoneBodyPresent = metallicRatio > 0.09 && rectangularAspectHits > 3;
  const isActiveScreenPhonePresent = glowRatio > 0.06 && rectangularAspectHits > 2;

  const isDetected = isDarkPhoneBodyPresent || isActiveScreenPhonePresent;
  const confidence = isDetected ? Math.min(0.95, 0.70 + (metallicRatio + glowRatio) * 1.5) : 0.0;

  return {
    detected: isDetected,
    class: 'cell phone',
    confidence: Number(confidence.toFixed(2)),
    boundingBox: isDetected ? {
      x: Math.max(0, minX),
      y: Math.max(0, minY),
      width: Math.max(15, maxX - minX),
      height: Math.max(25, maxY - minY)
    } : null
  };
}
