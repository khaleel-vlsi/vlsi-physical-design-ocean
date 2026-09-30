# 🏆 VLSI Physical Design Ocean — Certification Exam & Certificate Specification

> **Status**: Paused / Deferred (For Future Reference)  
> **Environment**: 100% Local Development Verified (Zero Production Deployment)  
> **UI Visibility**: Hidden from Student Dashboard & Navigation Bar  

---

## 📌 Executive Summary

This document serves as the **master blueprint and reference specification** for the VLSI Physical Design Ocean Certification Exam System. All exam rules, category allocations, scoring logic, proctoring systems, CSPRNG randomization algorithms, certificate intake forms, vector signature layout, and verification routes are documented below for seamless resumption when required.

---

## 📊 1. Question Bank & Master Distribution (200 Questions)

### Source & Ingestion Rules
- **Master Source**: Google Sheet CSV feed (`https://docs.google.com/spreadsheets/d/1CDqC3mfqraxK28wAO_zF8wC-V3bBLUKwivNvV0wcSO4/gviz/tq?tqx=out:csv`).
- **Difficulty Filter**: **Strictly `ADVANCED` difficulty only**. `EASY`, `MEDIUM`, `HARD`, `BEGINNER`, and `BASIC` questions are strictly filtered out.
- **Validation**: Deduplicated by normalized Question ID and Question Text.
- **Shortage Handling**: If eligible question count in any category is deficient, exam generation is explicitly blocked with a clear warning (no silent category substitutions).

### Exact Category & Sub-Topic Allocations

| Category | Proportion | Total Qs | Sub-Topic Breakdown |
| :--- | :---: | :---: | :--- |
| **STA** | **20%** | **40** | STA (40) |
| **PNR / Physical Design** | **50%** | **100** | PNR Inputs (18), Placement (16), CTS (31), Routing (25), Signoff (10) |
| **Synthesis** | **15%** | **30** | Synthesis (20), Physical Synthesis (10) |
| **Basic / Foundation** | **15%** | **30** | Basic Electronics (6), CMOS & MOSFET (6), Digital (6), Linux (6), RTL (5), DFT (1), TCL (0) |
| **TOTAL** | **100%** | **200** | **Exact 200 Questions** |

---

## ⚙️ 2. Randomization & Exam Logic

1. **CSPRNG Shuffling**: Questions are shuffled independently for every candidate/attempt using `window.crypto.getRandomValues`.
2. **No Global Caching**: Avoids globally cached papers so two concurrent test-takers receive distinct question selections.
3. **Overlap Minimization**: Newly generated paper IDs are checked against recent active snapshots to minimize question overlap.
4. **Hamilton Allocation**: Uses the Hamilton Largest-Remainder Method to allocate sub-topic questions mathematically without rounding errors.
5. **Exam Constraints**:
   - **Duration**: 90 minutes (5400 seconds).
   - **Scoring**: Correct: `+1.0` | Wrong: `-0.5` | Skipped: `0.0`.
   - **Pass Mark**: `160 / 200` (80%).

---

## 🔒 3. Proctoring & Attempt Lock System

- **Vision Proctoring**: Real-time webcam feed analyzing full-face visibility.
- **Violation Triggers**:
  - Tab / Window switching or focus loss.
  - Mobile phone detected in frame.
  - Zero face detected or multiple faces present in frame.
- **Violation Threshold**: Maximum 5 warnings; the **6th violation immediately terminates** the exam attempt.
- **Attempt Locking**:
  - **PASS ($\ge 160/200$)**: Moves candidate to Certificate Intake Form, issues unique certificate, and locks remaining attempts (`attemptsRemaining = 0`).
  - **FAIL / TERMINATED (< 160/200)**: Consumes exactly 1 attempt.

---

## 🎓 4. Certificate intake & Design Specifications

### Intake Flow
Upon passing, the student is prompted with a mandatory **Certificate Details Form**:
- Student Full Name (preserved exactly as typed, no spell-correction).
- Additional Certificate Information (Email, Serial Number).

### Visual Layout (`OfficialCertificateDocument.jsx`)
- **Canvas Format**: A4 Landscape (`297mm x 210mm`) with `#fffdfa` ivory background.
- **Borders & Frame**: Navy and double gold ornamental border with subtle semiconductor trace pattern watermark.
- **Authorized Signatory**:
  - **Signatory**: `Sk.Md.Khaleel`
  - **Signature Asset**: Vector SVG `/assets/signatures/khaleel_signature.svg` inside a fixed $210\text{px} \times 95\text{px}$ container with `mix-blend-mode: multiply`.
  - **Title**: Authorized Signatory, VLSI Physical Design Ocean.
- **Seal & QR Code**: Circular "AUTHENTIC CREDENTIAL" embossed seal and dynamic QR Code pointing to verification URL.

---

## 🛣️ 5. Key System Routes

| Route | Component | Purpose |
| :--- | :--- | :--- |
| `/certification-engine` | `CertificationEngine.jsx` | Full 200-question exam with proctoring |
| `/certification-result` | `CertificationResult.jsx` | Post-exam pass form & certificate preview |
| `/test-cert-direct` | `TestCertDirect.jsx` | **Direct Test Route** for certificate generation bypass |
| `/certificate/verify/:certificateId` | `CertificateVerify.jsx` | Public verification endpoint |

---

## 📁 Key File Locations

- **Question Ingestion**: `src/services/certificationQuestionBankService.js`
- **Exam State & Evaluation**: `src/services/certificationService.js`
- **Certificate Canvas**: `src/components/OfficialCertificateDocument.jsx`
- **Direct Test Mode**: `src/pages/TestCertDirect.jsx`
- **Signature Asset**: `public/assets/signatures/khaleel_signature.svg`

---

## 🔄 Resuming Work Checklist

When ready to return to the Certification System:
1. Refer to this `.md` file for full spec compliance.
2. Launch Vite dev server and test direct certificate generation at `http://localhost:5174/test-cert-direct`.
3. Un-hide certification entry points in Student Dashboard / Navigation when ready for release.
