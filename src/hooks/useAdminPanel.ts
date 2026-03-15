import { useState, useEffect, useCallback } from 'react'

const ADMIN_PASSWORD = 'chhatrapat610'

export const useAdminPanel = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Handle keyboard shortcut (Shift + Ctrl + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.ctrlKey && e.key === 'A') {
        e.preventDefault()
        if (isAuthenticated) {
          setIsAdminOpen(true)
        } else {
          setShowPasswordModal(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAuthenticated])

  const handlePasswordSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setShowPasswordModal(false)
      setIsAdminOpen(true)
      setError('')
      setPassword('')
    } else {
      setError('Incorrect password!')
    }
  }, [password])

  const closeAdmin = useCallback(() => {
    setIsAdminOpen(false)
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setIsAdminOpen(false)
  }, [])

  const closePasswordModal = useCallback(() => {
    setShowPasswordModal(false)
    setPassword('')
    setError('')
  }, [])

  return {
    isAdminOpen,
    isAuthenticated,
    showPasswordModal,
    password,
    error,
    setPassword,
    handlePasswordSubmit,
    closeAdmin,
    logout,
    closePasswordModal,
  }
}
