import { useState, useEffect, useRef, useCallback } from 'react';
import { updateResume } from '../api/resume';

/**
 * Custom hook for debounced auto-saving to Supabase
 * @param {string} resumeId - ID of the resume to save
 * @param {object} data - The full data object to save
 * @param {number} delayMs - Debounce delay in ms
 * @returns {object} { saveStatus, isSaving, forceSave }
 */
export function useAutosave(resumeId, data, delayMs = 2000) {
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error', 'pending'
  const [isSaving, setIsSaving] = useState(false);
  const dataRef = useRef(data);
  const timeoutRef = useRef(null);
  const initialRender = useRef(true);

  // Keep ref updated with latest data to avoid dependency cycles in debounce
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const save = useCallback(async (dataToSave) => {
    if (!resumeId) return;
    
    setIsSaving(true);
    setSaveStatus('saving');
    
    try {
      await updateResume(resumeId, { sections: dataToSave });
      setSaveStatus('saved');
    } catch (err) {
      console.error('Autosave failed:', err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  }, [resumeId]);

  // Main debounced effect
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setSaveStatus('pending');
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      save(dataRef.current);
    }, delayMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, delayMs, save]);

  // Expose manual save for unmounting or explicit save buttons
  const forceSave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    return save(dataRef.current);
  }, [save]);

  // Save on unmount if pending
  useEffect(() => {
    return () => {
      if (saveStatus === 'pending') {
        forceSave();
      }
    };
  }, [saveStatus, forceSave]);

  return { saveStatus, isSaving, forceSave };
}
