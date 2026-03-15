import { useState, useRef } from 'react'
import { X, Plus, Trash2, Edit2, Upload, Save, LogOut, Image as ImageIcon, ExternalLink, Github } from 'lucide-react'
import { useProjects, type Project } from '@/hooks/useProjects'

interface AdminPanelProps {
  onClose: () => void
  onLogout: () => void
}

const AdminPanel = ({ onClose, onLogout }: AdminPanelProps) => {
  const { projects, loading, addNewProject, updateExistingProject, removeProject } = useProjects()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [order, setOrder] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setLiveUrl('')
    setGithubUrl('')
    setOrder(0)
    setImagePreview(null)
    setSelectedFile(null)
    setEditingId(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in title and description')
      return
    }

    setIsSubmitting(true)

    try {
      const projectData = {
        title: title.trim(),
        description: description.trim(),
        liveUrl: liveUrl.trim(),
        githubUrl: githubUrl.trim(),
        order: order || 0,
      }

      let success = false
      if (editingId) {
        success = await updateExistingProject(editingId, projectData, selectedFile)
      } else {
        success = await addNewProject(projectData, selectedFile)
      }

      if (success) {
        resetForm()
        setShowForm(false)
        alert(editingId ? 'Project updated!' : 'Project added!')
      } else {
        alert('Failed to save. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving project. Check console.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (project: Project) => {
    setTitle(project.title)
    setDescription(project.description)
    setLiveUrl(project.liveUrl || '')
    setGithubUrl(project.githubUrl || '')
    setOrder(project.order || 0)
    setImagePreview(project.imageUrl || null)
    setEditingId(project.id || null)
    setShowForm(true)
    setSelectedFile(null)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this project?')) {
      const success = await removeProject(id)
      if (success) {
        alert('Project deleted!')
      } else {
        alert('Failed to delete.')
      }
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-neo-black overflow-auto">
      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-neo-red border-4 border-neo-black px-4 py-2" style={{ boxShadow: '4px 4px 0px 0px #fff' }}>
              <span className="font-black text-lg uppercase text-white">ADMIN</span>
            </div>
            <h2 className="font-black text-2xl uppercase text-white">Projects</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { resetForm(); setShowForm(!showForm); }}
              className="flex items-center gap-2 bg-neo-yellow border-4 border-neo-black px-4 py-2 font-bold text-sm uppercase"
              style={{ boxShadow: '4px 4px 0px 0px #fff' }}
            >
              <Plus size={18} strokeWidth={3} />
              {showForm ? 'Cancel' : 'Add New'}
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-neo-violet border-4 border-neo-black px-4 py-2 font-bold text-sm uppercase"
              style={{ boxShadow: '4px 4px 0px 0px #fff' }}
            >
              <LogOut size={18} strokeWidth={3} />
              Logout
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-white border-4 border-neo-black px-4 py-2 font-bold text-sm uppercase"
              style={{ boxShadow: '4px 4px 0px 0px #fff' }}
            >
              <X size={18} strokeWidth={3} />
              Close
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white border-4 border-neo-black p-6" style={{ boxShadow: '8px 8px 0px 0px #FF6B6B' }}>
              <h3 className="font-black text-xl uppercase mb-6">
                {editingId ? 'Edit Project' : 'New Project'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="font-black text-xs uppercase mb-1 block">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="input-neo w-full"
                    placeholder="Project name"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="font-black text-xs uppercase mb-1 block">Description *</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="input-neo w-full resize-none"
                    rows={3}
                    placeholder="What is this project about?"
                    required
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="font-black text-xs uppercase mb-1 block">Image</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 bg-neo-cream border-4 border-neo-black px-4 py-2 font-bold text-xs uppercase"
                      style={{ boxShadow: '4px 4px 0px 0px #000' }}
                    >
                      <Upload size={16} strokeWidth={3} />
                      Choose Image
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover border-4 border-neo-black" />
                    ) : (
                      <div className="w-20 h-20 bg-neo-cream border-4 border-neo-black flex items-center justify-center">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-black text-xs uppercase mb-1 block flex items-center gap-1">
                      <ExternalLink size={12} /> Live URL
                    </label>
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={e => setLiveUrl(e.target.value)}
                      className="input-neo w-full"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="font-black text-xs uppercase mb-1 block flex items-center gap-1">
                      <Github size={12} /> GitHub
                    </label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={e => setGithubUrl(e.target.value)}
                      className="input-neo w-full"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                {/* Order */}
                <div>
                  <label className="font-black text-xs uppercase mb-1 block">Order</label>
                  <input
                    type="number"
                    value={order}
                    onChange={e => setOrder(parseInt(e.target.value) || 0)}
                    className="input-neo w-32"
                    min="0"
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-neo-red border-4 border-neo-black px-6 py-3 font-bold text-sm uppercase text-white disabled:opacity-50"
                    style={{ boxShadow: '4px 4px 0px 0px #000' }}
                  >
                    {isSubmitting ? 'Saving...' : <><Save size={16} /> {editingId ? 'Update' : 'Save'}</>}
                  </button>
                  <button
                    type="button"
                    onClick={() => { resetForm(); setShowForm(false); }}
                    className="flex items-center gap-2 bg-white border-4 border-neo-black px-6 py-3 font-bold text-sm uppercase"
                    style={{ boxShadow: '4px 4px 0px 0px #000' }}
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="max-w-6xl mx-auto">
          <h3 className="font-black text-lg uppercase text-white mb-4">
            Your Projects ({projects.length})
          </h3>
          
          {loading ? (
            <div className="text-white text-center py-12">Loading...</div>
          ) : projects.length === 0 ? (
            <div className="bg-white border-4 border-neo-black p-8 text-center" style={{ boxShadow: '8px 8px 0px 0px #FF6B6B' }}>
              <p className="font-bold">No projects yet. Click "Add New" to create one!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={project.id} className="bg-white border-4 border-neo-black p-4" style={{ boxShadow: '6px 6px 0px 0px #fff' }}>
                  <div className="bg-neo-black p-2 -mx-4 -mt-4 mb-4 flex justify-between">
                    <span className="font-black text-sm text-white">#{index + 1}</span>
                    <span className="font-bold text-xs text-neo-yellow">Order: {project.order || 0}</span>
                  </div>
                  
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover border-4 border-neo-black mb-4" />
                  ) : (
                    <div className="w-full h-40 bg-neo-cream border-4 border-neo-black mb-4 flex items-center justify-center">
                      <ImageIcon size={48} className="text-neo-black/20" />
                    </div>
                  )}
                  
                  <h4 className="font-black text-lg uppercase truncate mb-1">{project.title}</h4>
                  <p className="text-sm text-neo-black/70 mb-3 line-clamp-2">{project.description}</p>
                  
                  <div className="flex gap-2 mb-3">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-neo-yellow border-2 border-neo-black text-xs font-bold">
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-neo-cream border-2 border-neo-black text-xs font-bold">
                        Code
                      </a>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 bg-neo-yellow border-4 border-neo-black py-2 font-bold text-xs uppercase"
                      style={{ boxShadow: '2px 2px 0px 0px #000' }}
                    >
                      <Edit2 size={14} className="inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => project.id && handleDelete(project.id)}
                      className="flex-1 bg-neo-red border-4 border-neo-black py-2 font-bold text-xs uppercase text-white"
                      style={{ boxShadow: '2px 2px 0px 0px #000' }}
                    >
                      <Trash2 size={14} className="inline mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
