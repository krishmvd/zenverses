import { useState, useEffect, useCallback } from 'react'
import { getProjects, addProject, updateProject, deleteProject, uploadImage } from '@/lib/supabase'

export interface Project {
  id?: string
  title: string
  description: string
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  order: number
  created_at?: string
  updated_at?: string
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      // Sort by order
      const sorted = Array.isArray(data) ? data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) : []
      setProjects(sorted as Project[])
      setError(null)
    } catch (err) {
      setError('Failed to fetch projects')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const addNewProject = useCallback(async (project: Omit<Project, 'id'>, imageFile?: File | null) => {
    try {
      let imageUrl = ''
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'images')
      }

      const projectData = {
        ...project,
        imageUrl,
      }

      const result = await addProject(projectData)
      await fetchProjects()
      return !!result
    } catch (err) {
      console.error('Error adding project:', err)
      return false
    }
  }, [fetchProjects])

  const updateExistingProject = useCallback(async (id: string, project: Partial<Project>, imageFile?: File | null) => {
    try {
      const updateData: any = { ...project }
      
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile, 'images')
        updateData.imageUrl = imageUrl
      }

      await updateProject(id, updateData)
      await fetchProjects()
      return true
    } catch (err) {
      console.error('Error updating project:', err)
      return false
    }
  }, [fetchProjects])

  const removeProject = useCallback(async (id: string) => {
    try {
      await deleteProject(id)
      await fetchProjects()
      return true
    } catch (err) {
      console.error('Error deleting project:', err)
      return false
    }
  }, [fetchProjects])

  return {
    projects,
    loading,
    error,
    fetchProjects,
    addNewProject,
    updateExistingProject,
    removeProject,
  }
}
