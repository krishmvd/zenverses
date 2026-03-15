import { GraduationCap } from 'lucide-react'

const Education = () => {
  return (
    <section id="education" className="relative py-24 bg-neo-cream overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-halftone opacity-20" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-neo-violet border-4 border-neo-black -rotate-12" style={{ boxShadow: '6px 6px 0px 0px #000' }} />
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-neo-red border-4 border-neo-black rotate-12 rounded-full" style={{ boxShadow: '6px 6px 0px 0px #000' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neo-violet border-4 border-neo-black px-4 py-2 mb-6 rotate-1" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
            <GraduationCap size={18} strokeWidth={3} />
            <span className="font-black text-xs uppercase tracking-widest">Academic Background</span>
          </div>
          
          <h2 className="font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter mb-4">
            <span className="text-stroke">MY</span>{' '}
            <span className="text-neo-black">EDUCATION</span>
          </h2>
        </div>

        {/* Coming Soon Card */}
        <div className="max-w-2xl mx-auto">
          <div className="card-neo bg-white p-12 text-center">
            <div className="w-24 h-24 bg-neo-yellow border-4 border-neo-black rounded-full flex items-center justify-center mx-auto mb-6" style={{ boxShadow: '8px 8px 0px 0px #000' }}>
              <GraduationCap size={48} strokeWidth={3} />
            </div>
            <h3 className="font-black text-3xl uppercase tracking-tight mb-4">
              Coming Soon
            </h3>
            <p className="font-bold text-lg text-neo-black/70">
              Education details will be updated here.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
