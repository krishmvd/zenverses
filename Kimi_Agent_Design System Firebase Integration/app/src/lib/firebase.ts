import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

// IMPORTANT: Replace this with your actual Firebase API key
// You can find it in your Firebase Console > Project Settings > General > Web API Key
const firebaseConfig = {
  apiKey: "AIzaSyDZ5fRz7c8Rr3X9vY2Z1wQ8P7n6m5k4j3h", // <-- REPLACE THIS
  authDomain: "portfolio61.firebaseapp.com",
  projectId: "portfolio61",
  storageBucket: "portfolio61.firebasestorage.app",
  messagingSenderId: "944195827757",
  appId: "1:944195827757:web:d6b5ca5c93e641c30ae0a4",
  measurementId: "G-W9K0WVZ8ZB"
}

// Initialize Firebase
let app: any
let db: any
let storage: any
let analytics: any
let isInitialized = false

try {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  storage = getStorage(app)
  analytics = typeof window !== 'undefined' ? getAnalytics(app) : null
  isInitialized = true
  console.log('Firebase initialized successfully')
} catch (error) {
  console.error('Firebase initialization failed:', error)
}

// Local storage fallback key
const LOCAL_STORAGE_KEY = 'zenverse_projects'

// Helper to get projects from localStorage
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

// Helper to save projects to localStorage
const saveLocalProjects = (projects: any[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

// Get all projects (Firebase + localStorage fallback)
export const getProjects = async () => {
  if (isInitialized && db) {
    try {
      const projectsCollection = collection(db, 'projects')
      const snapshot = await getDocs(projectsCollection)
      const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      // Also save to localStorage as backup
      saveLocalProjects(projects)
      return projects
    } catch (error) {
      console.error('Firebase getProjects failed, using localStorage:', error)
    }
  }
  return getLocalProjects()
}

// Add a new project
export const addProject = async (projectData: any) => {
  const newProject = {
    ...projectData,
    createdAt: new Date().toISOString(),
  }
  
  if (isInitialized && db) {
    try {
      const projectsCollection = collection(db, 'projects')
      const docRef = await addDoc(projectsCollection, newProject)
      console.log('Project added to Firebase:', docRef.id)
      return { id: docRef.id, ...newProject }
    } catch (error) {
      console.error('Firebase addProject failed:', error)
    }
  }
  
  // LocalStorage fallback
  const projects = getLocalProjects()
  const projectWithId = { ...newProject, id: Date.now().toString() }
  projects.push(projectWithId)
  saveLocalProjects(projects)
  console.log('Project added to localStorage:', projectWithId.id)
  return projectWithId
}

// Update a project
export const updateProject = async (id: string, projectData: any) => {
  const updateData = {
    ...projectData,
    updatedAt: new Date().toISOString(),
  }
  
  if (isInitialized && db) {
    try {
      const projectRef = doc(db, 'projects', id)
      await updateDoc(projectRef, updateData)
      console.log('Project updated in Firebase:', id)
      return true
    } catch (error) {
      console.error('Firebase updateProject failed:', error)
    }
  }
  
  // LocalStorage fallback
  const projects = getLocalProjects()
  const index = projects.findIndex((p: any) => p.id === id)
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updateData }
    saveLocalProjects(projects)
    console.log('Project updated in localStorage:', id)
    return true
  }
  return false
}

// Delete a project
export const deleteProject = async (id: string) => {
  if (isInitialized && db) {
    try {
      const projectRef = doc(db, 'projects', id)
      await deleteDoc(projectRef)
      console.log('Project deleted from Firebase:', id)
      return true
    } catch (error) {
      console.error('Firebase deleteProject failed:', error)
    }
  }
  
  // LocalStorage fallback
  const projects = getLocalProjects().filter((p: any) => p.id !== id)
  saveLocalProjects(projects)
  console.log('Project deleted from localStorage:', id)
  return true
}

// Upload image to storage
export const uploadImage = async (file: File, path: string): Promise<string> => {
  if (isInitialized && storage) {
    try {
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      console.log('Image uploaded to Firebase:', url)
      return url
    } catch (error) {
      console.error('Firebase uploadImage failed:', error)
    }
  }
  
  // Fallback: convert to base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Delete image from storage
export const deleteImage = async (path: string) => {
  if (isInitialized && storage) {
    try {
      const storageRef = ref(storage, path)
      await deleteObject(storageRef)
      return true
    } catch (error) {
      console.error('Firebase deleteImage failed:', error)
    }
  }
  return false
}

export { db, storage, analytics, isInitialized }
