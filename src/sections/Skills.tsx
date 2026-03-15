import { 
  Code2, 
  Palette, 
  Zap, 
  GitBranch, 
  Layers, 
  MessageSquare,
  Database
} from 'lucide-react'

const skillsData = [
  {
    category: 'FRONTEND',
    icon: Code2,
    color: 'bg-neo-red',
    skills: ['React.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Context API', 'Function Hooks'],
  },
  {
    category: 'STATE & DATA',
    icon: Layers,
    color: 'bg-neo-yellow',
    skills: ['Redux', 'REST API', 'State Management', 'Async/Await', 'JSON'],
  },
  {
    category: 'UI/UX',
    icon: Palette,
    color: 'bg-neo-violet',
    skills: ['Responsive Design', 'User Interface', 'Website Performance', 'Speed Optimization'],
  },
  {
    category: 'TOOLS',
    icon: GitBranch,
    color: 'bg-neo-red',
    skills: ['GitHub', 'Version Control', 'Code Review', 'Collaboration'],
  },
  {
    category: 'BACKEND',
    icon: Database,
    color: 'bg-neo-yellow',
    skills: ['ASP.NET', 'C#', 'SQL Server', 'Database Design'],
  },
  {
    category: 'SOFT SKILLS',
    icon: MessageSquare,
    color: 'bg-neo-violet',
    skills: ['Communication', 'Teamwork', 'Problem Solving', 'Time Management'],
  },
]

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 bg-neo-cream overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-neo-red border-4 border-neo-black rotate-12" style={{ boxShadow: '6px 6px 0px 0px #000' }} />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-neo-yellow border-4 border-neo-black -rotate-12" style={{ boxShadow: '6px 6px 0px 0px #000' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neo-red border-4 border-neo-black px-4 py-2 mb-6 -rotate-1" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
            <Zap size={18} strokeWidth={3} className="text-white" />
            <span className="font-black text-xs uppercase tracking-widest text-white">What I Do</span>
          </div>
          
          <h2 className="font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter mb-4">
            <span className="text-stroke">MY</span>{' '}
            <span className="text-neo-black">SKILLS</span>
          </h2>
          
          <p className="font-bold text-lg md:text-xl max-w-2xl mx-auto text-neo-black/80">
            A motivated BCA graduate with a strong interest in software development and creating amazing digital experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <div
              key={category.category}
              className={`card-neo bg-white p-6 ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
            >
              {/* Card Header */}
              <div className={`${category.color} border-4 border-neo-black p-4 -mx-6 -mt-6 mb-6 flex items-center gap-3`}>
                <div className="bg-white border-4 border-neo-black p-2">
                  <category.icon size={24} strokeWidth={3} />
                </div>
                <h3 className="font-black text-lg uppercase tracking-wide">{category.category}</h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1.5 font-bold text-sm border-4 border-neo-black bg-neo-cream"
                    style={{ boxShadow: '2px 2px 0px 0px #000' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages Section */}
        <div className="mt-16">
          <div className="bg-neo-black border-4 border-neo-black p-8 relative">
            <div className="absolute -top-4 left-8 bg-neo-yellow border-4 border-neo-black px-4 py-2" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
              <span className="font-black text-sm uppercase tracking-widest">Languages</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              {['English', 'Hindi', 'Gujarati'].map((lang, index) => (
                <div
                  key={lang}
                  className={`px-6 py-3 font-black text-lg uppercase tracking-wide border-4 border-neo-black ${
                    index === 0 ? 'bg-neo-red text-white' : index === 1 ? 'bg-neo-yellow' : 'bg-neo-violet'
                  }`}
                  style={{ boxShadow: '4px 4px 0px 0px #fff' }}
                >
                  {lang}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
