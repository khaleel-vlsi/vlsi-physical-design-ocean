import { supabase } from '../services/supabase';

/**
 * List all resumes for the current user
 */
export async function listResumes(userId) {
  if (!userId) return [];
  
  const { data, error } = await supabase
    .from('resumes')
    .select('id, title, template_id, ats_score, updated_at, is_draft')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
    
  if (error) {
    if (error.message.includes('Could not find the table')) {
      console.warn('Supabase resumes table not found. Returning empty list.');
      // LocalStorage fallback for testing
      const localData = localStorage.getItem(`resume_list_${userId}`);
      return localData ? JSON.parse(localData) : [];
    }
    throw error;
  }
  return data || [];
}

/**
 * Get a single resume by ID
 */
export async function getResume(resumeId) {
  if (!resumeId) return null;
  
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', resumeId)
    .single();
    
  if (error) {
    if (error.message.includes('Could not find the table')) {
      const localData = localStorage.getItem(`resume_data_${resumeId}`);
      return localData ? JSON.parse(localData) : null;
    }
    throw error;
  }
  return data;
}

/**
 * Create a new resume
 */
export async function createResume(userId, { title = 'Untitled Resume', source = 'scratch', templateId = 'professional' } = {}) {
  if (!userId) throw new Error("User ID is required to create resume");
  
  const newResume = {
    user_id: userId,
    title,
    source,
    template_id: templateId,
    sections: {
      personal: {},
      education: [],
      experience: [],
      skills: []
    }
  };

  const { data, error } = await supabase
    .from('resumes')
    .insert(newResume)
    .select()
    .single();
    
  if (error) {
    if (error.message.includes('Maximum 10 resumes allowed')) {
      throw new Error('LimitReached');
    }
    if (error.message.includes('Could not find the table')) {
      const id = 'local-' + Date.now();
      const localResume = { id, ...newResume, updated_at: new Date().toISOString() };
      localStorage.setItem(`resume_data_${id}`, JSON.stringify(localResume));
      
      const list = JSON.parse(localStorage.getItem(`resume_list_${userId}`) || '[]');
      if (list.length >= 10) throw new Error('LimitReached');
      
      list.push({ id, title, template_id: templateId, updated_at: localResume.updated_at });
      localStorage.setItem(`resume_list_${userId}`, JSON.stringify(list));
      return localResume;
    }
    throw error;
  }
  return data;
}

/**
 * Update an existing resume
 */
export async function updateResume(resumeId, updates) {
  if (!resumeId) return null;
  
  const { data, error } = await supabase
    .from('resumes')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', resumeId)
    .select()
    .single();
    
  if (error) {
    if (error.message.includes('Could not find the table')) {
      const existing = JSON.parse(localStorage.getItem(`resume_data_${resumeId}`) || '{}');
      const updated = { ...existing, ...updates, updated_at: new Date().toISOString() };
      localStorage.setItem(`resume_data_${resumeId}`, JSON.stringify(updated));
      return updated;
    }
    throw error;
  }
  return data;
}

/**
 * Delete a resume
 */
export async function deleteResume(resumeId, userId) {
  if (!resumeId) return;
  
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', resumeId);
    
  if (error) {
    if (error.message.includes('Could not find the table')) {
      localStorage.removeItem(`resume_data_${resumeId}`);
      if (userId) {
        let list = JSON.parse(localStorage.getItem(`resume_list_${userId}`) || '[]');
        list = list.filter(r => r.id !== resumeId);
        localStorage.setItem(`resume_list_${userId}`, JSON.stringify(list));
      }
      return;
    }
    throw error;
  }
}

/**
 * Duplicate a resume
 */
export async function duplicateResume(userId, resumeId) {
  if (!userId || !resumeId) return null;
  
  const original = await getResume(resumeId);
  if (!original) throw new Error("Resume not found");
  
  const { data, error } = await supabase
    .from('resumes')
    .insert({
      user_id: userId,
      title: `${original.title} (Copy)`,
      template_id: original.template_id,
      sections: original.sections,
      source: 'duplicate'
    })
    .select()
    .single();
    
  if (error) {
    if (error.message.includes('Maximum 10 resumes allowed')) {
      throw new Error('LimitReached');
    }
    throw error;
  }
  return data;
}

/**
 * Upload profile photo to storage bucket
 */
export async function uploadProfilePhoto(userId, file) {
  if (!userId || !file) return null;
  
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${Math.random()}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('resume-profile-photos')
    .upload(filePath, file);

  if (uploadError) throw uploadError;
  
  const { data: { publicUrl } } = supabase.storage
    .from('resume-profile-photos')
    .getPublicUrl(filePath);
    
  return publicUrl;
}

/**
 * Save a new version of the resume
 */
export async function saveResumeVersion(resumeId, userId, versionName, sectionsData) {
  if (!resumeId || !userId) return null;
  
  const { data, error } = await supabase
    .from('resume_versions')
    .insert({
      resume_id: resumeId,
      user_id: userId,
      version_name: versionName,
      sections_data: sectionsData
    })
    .select()
    .single();
    
  if (error) {
    console.error('Failed to save version:', error);
    throw error;
  }
  return data;
}

/**
 * List all versions for a resume
 */
export async function listResumeVersions(resumeId) {
  if (!resumeId) return [];
  
  const { data, error } = await supabase
    .from('resume_versions')
    .select('id, version_name, created_at')
    .eq('resume_id', resumeId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
}

/**
 * Get a specific resume version's data
 */
export async function getResumeVersion(versionId) {
  const { data, error } = await supabase
    .from('resume_versions')
    .select('sections_data')
    .eq('id', versionId)
    .single();
    
  if (error) throw error;
  return data.sections_data;
}

/**
 * Get resume by share token for public viewing
 */
export async function getResumeByToken(shareToken) {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('share_token', shareToken)
    .eq('is_public', true)
    .single();
    
  if (error) throw error;
  return data;
}
