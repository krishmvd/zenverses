import { ExternalLink, Github, FolderOpen, ArrowRight, Loader2 } from 'lucide-react'
import { useProjects, type Project } from '@/hooks/useProjects'

const Projects = () => {
  const { projects, loading } = useProjects()

  // Default projects if no Firebase data
  const defaultProjects: Project[] = [
    {
      id: '1',
      title: 'E-Book Download Website',
      description: 'A modern and user-friendly website for downloading e-books. Features categorized e-books, interactive download buttons, and a responsive layout ensuring compatibility across all devices.',
      order: 0,
    },
    {
      id: '2',
      title: 'Online E-Shopping System',
      description: 'A comprehensive online shopping system developed as a final-year BCA project. Allows users to register, log in, browse products, add items to cart, and place orders with secure authentication.',
      order: 1,
    },
  ]

  const displayProjects = projects.length > 0 ? projects : defaultProjects

  return (
    <section id="projects" className="relative py-24 bg-neo-yellow overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-radial-dots opacity-20" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-neo-red border-4 border-neo-black rounded-full -rotate-12" style={{ boxShadow: '8px 8px 0px 0px #000' }} />
      <div className="absolute bottom-40 left-10 w-16 h-16 bg-white border-4 border-neo-black rotate-12" style={{ boxShadow: '6px 6px 0px 0px #000' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neo-black border-4 border-neo-black px-4 py-2 mb-6 rotate-1" style={{ boxShadow: '4px 4px 0px 0px #fff' }}>
            <FolderOpen size={18} strokeWidth={3} className="text-neo-yellow" />
            <span className="font-black text-xs uppercase tracking-widest text-white">My Work</span>
          </div>
          
          <h2 className="font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter mb-4">
            <span className="text-stroke-thick">FEATURED</span>{' '}
            <span className="text-neo-black">PROJECTS</span>
          </h2>
          
          <p className="font-bold text-lg md:text-xl max-w-2xl mx-auto text-neo-black/80">
            Showcasing my academic projects and practical implementations of modern web technologies.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={48} strokeWidth={3} className="animate-spin text-neo-black" />
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <div
              key={project.id}
              className="card-neo bg-white overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative h-56 bg-neo-cream border-b-4 border-neo-black overflow-hidden">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neo-cream">
                    <FolderOpen size={64} strokeWidth={2} className="text-neo-black/20" />
                  </div>
                )}
                {/* Project Number Badge */}
                <div 
                  className="absolute top-4 left-4 bg-neo-black border-4 border-neo-black px-3 py-1"
                  style={{ boxShadow: '4px 4px 0px 0px #FFD93D' }}
                >
                  <span className="font-black text-sm text-white">#{index + 1}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="font-black text-xl uppercase tracking-tight mb-3 line-clamp-1">
                  {project.title}
                </h3>
                
                <p className="font-medium text-base leading-relaxed text-neo-black/80 mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-neo-red border-4 border-neo-black py-3 font-bold text-sm uppercase tracking-wide text-white hover:bg-neo-red/90 transition-all duration-100 active:translate-x-[2px] active:translate-y-[2px]"
                      style={{ boxShadow: '4px 4px 0px 0px #000' }}
                    >
                      <ExternalLink size={16} strokeWidth={3} />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-white border-4 border-neo-black py-3 font-bold text-sm uppercase tracking-wide hover:bg-neo-cream transition-all duration-100"
                      style={{ boxShadow: '4px 4px 0px 0px #000' }}
                    >
                      <Github size={16} strokeWidth={3} />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white border-4 border-neo-black px-8 py-4 rotate-1" style={{ boxShadow: '8px 8px 0px 0px #000' }}>
            <span className="font-black text-lg uppercase tracking-wide">More Projects Coming Soon</span>
            <ArrowRight size={24} strokeWidth={3} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
