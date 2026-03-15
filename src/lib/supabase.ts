import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tbcehmunpyiadqkqpqds.supabase.co'
const supabaseKey = 'sb_publishable_LAkAaPgciw5VIUbqhdynzA_lWTSlLvs'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Projects table operations
export const getProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true })
    
    if (error) {
      console.error('Supabase getProjects error:', error)
      // Fallback to localStorage
      return getLocalProjects()
    }
    
    // Save to localStorage as backup
    if (data) {
      saveLocalProjects(data)
    }
    return data || []
  } catch (error) {
    console.error('getProjects error:', error)
    return getLocalProjects()
  }
}

export const addProject = async (projectData: any) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([{ ...projectData, created_at: new Date().toISOString() }])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase addProject error:', error)
      // Fallback to localStorage
      return addLocalProject(projectData)
    }
    
    console.log('Project added to Supabase:', data)
    return data
  } catch (error) {
    console.error('addProject error:', error)
    return addLocalProject(projectData)
  }
}

export const updateProject = async (id: string, projectData: any) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...projectData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase updateProject error:', error)
      return updateLocalProject(id, projectData)
    }
    
    console.log('Project updated in Supabase:', data)
    return data
  } catch (error) {
    console.error('updateProject error:', error)
    return updateLocalProject(id, projectData)
  }
}

export const deleteProject = async (id: string) => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Supabase deleteProject error:', error)
      return deleteLocalProject(id)
    }
    
    console.log('Project deleted from Supabase:', id)
    return true
  } catch (error) {
    console.error('deleteProject error:', error)
    return deleteLocalProject(id)
  }
}

// Upload image to Supabase Storage
export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${path}/${fileName}`
    
    const { error: uploadError } = await supabase
      .storage
      .from('projects')
      .upload(filePath, file)
    
    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      // Fallback to base64
      return fileToBase64(file)
    }
    
    const { data: { publicUrl } } = supabase
      .storage
      .from('projects')
      .getPublicUrl(filePath)
    
    console.log('Image uploaded to Supabase:', publicUrl)
    return publicUrl
  } catch (error) {
    console.error('uploadImage error:', error)
    return fileToBase64(file)
  }
}

// Delete image from Supabase Storage
export const deleteImage = async (path: string) => {
  try {
    const { error } = await supabase
      .storage
      .from('projects')
      .remove([path])
    
    if (error) {
      console.error('Supabase delete image error:', error)
    }
    return true
  } catch (error) {
    console.error('deleteImage error:', error)
    return false
  }
}

// Local Storage Fallback Functions
const LOCAL_STORAGE_KEY = 'zenverse_projects'

const getLocalProjects = (): any[] => {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY)
    const projects = data ? JSON.parse(data) : []
    return Array.isArray(projects) ? projects : []
  } catch {
    return []
  }
}

const saveLocalProjects = (projects: any[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

const addLocalProject = (projectData: any) => {
  const projects = getLocalProjects()
  const newProject = { 
    ...projectData, 
    id: Date.now().toString(),
    created_at: new Date().toISOString()
  }
  projects.push(newProject)
  saveLocalProjects(projects)
  console.log('Project added to localStorage:', newProject.id)
  return newProject
}

const updateLocalProject = (id: string, projectData: any) => {
  const projects = getLocalProjects()
  const index = projects.findIndex((p: any) => p.id === id)
  if (index !== -1) {
    projects[index] = { 
      ...projects[index], 
      ...projectData,
      updated_at: new Date().toISOString()
    }
    saveLocalProjects(projects)
    console.log('Project updated in localStorage:', id)
    return projects[index]
  }
  return null
}

const deleteLocalProject = (id: string) => {
  const projects = getLocalProjects().filter((p: any) => p.id !== id)
  saveLocalProjects(projects)
  console.log('Project deleted from localStorage:', id)
  return true
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
