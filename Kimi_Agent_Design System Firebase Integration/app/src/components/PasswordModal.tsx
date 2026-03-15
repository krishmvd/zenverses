import { Lock, X, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface PasswordModalProps {
  isOpen: boolean
  password: string
  error: string
  onPasswordChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
}

const PasswordModal = ({ isOpen, password, error, onPasswordChange, onSubmit, onClose }: PasswordModalProps) => {
  const [showPassword, setShowPassword] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-neo-black/90 p-4">
      <div className="bg-white border-4 border-neo-black w-full max-w-md p-8 relative" style={{ boxShadow: '12px 12px 0px 0px #FF6B6B' }}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-neo-cream transition-colors"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-neo-red border-4 border-neo-black mb-4" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
            <Lock size={32} strokeWidth={3} className="text-white" />
          </div>
          <h2 className="font-black text-2xl uppercase tracking-tight">Admin Access</h2>
          <p className="font-medium text-neo-black/60 mt-2">Enter password to access admin panel</p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => onPasswordChange(e.target.value)}
              className="input-neo w-full pr-12"
              placeholder="Enter password"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:text-neo-red transition-colors"
            >
              {showPassword ? <EyeOff size={20} strokeWidth={3} /> : <Eye size={20} strokeWidth={3} />}
            </button>
          </div>

          {error && (
            <div className="bg-neo-red border-4 border-neo-black p-3 text-center">
              <p className="font-bold text-sm text-white">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full btn-neo justify-center"
          >
            <Lock size={18} className="mr-2" strokeWidth={3} />
            Access Admin
          </button>
        </form>

        {/* Hint */}
        <p className="text-center font-medium text-xs text-neo-black/40 mt-6">
          Press Shift + Ctrl + A anytime to open admin panel
        </p>
      </div>
    </div>
  )
}

export default PasswordModal
