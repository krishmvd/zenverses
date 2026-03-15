import { ArrowDown, Star, Code2, Zap } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neo-cream">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-halftone opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 md:right-20 animate-spin-slow">
        <Star size={60} strokeWidth={3} className="text-neo-red fill-neo-red" />
      </div>
      <div className="absolute bottom-40 left-10 md:left-20 animate-bounce-subtle">
        <Code2 size={50} strokeWidth={3} className="text-neo-violet" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 rotate-12">
        <div className="w-12 h-12 bg-neo-red border-4 border-neo-black rounded-full" style={{ boxShadow: '4px 4px 0px 0px #000' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            {/* Zenverse Logo Badge */}
            <div className="inline-flex items-center gap-2 bg-neo-black border-4 border-neo-black px-4 py-2 -rotate-1" style={{ boxShadow: '4px 4px 0px 0px #FF6B6B' }}>
              <Zap size={18} strokeWidth={3} className="text-neo-yellow fill-neo-yellow" />
              <span className="font-black text-xs uppercase tracking-widest text-white">ZENVERSE</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-none tracking-tighter">
                <span className="block text-stroke-thick">W3B DEV</span>
                <span className="block text-neo-black">KRISH</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="relative">
              <div className="bg-white border-4 border-neo-black p-6 rotate-1" style={{ boxShadow: '8px 8px 0px 0px #000' }}>
                <p className="font-bold text-xl md:text-2xl uppercase tracking-wide">
                  Full Stack Developer
                </p>
                <p className="font-medium text-lg mt-2 text-neo-black/80">
                  React • JavaScript • Modern Web
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="btn-neo"
              >
                View Projects
                <ArrowDown size={18} className="ml-2" strokeWidth={3} />
              </a>
              <a
                href="#contact"
                className="btn-neo-secondary"
              >
                Get In Touch
              </a>
            </div>

            {/* Location Badge */}
            <div className="flex items-center gap-4 pt-4">
              <div className="badge-neo-violet -rotate-2">
                Ahmedabad, Gujarat
              </div>
              <div className="badge-neo-red rotate-1">
                Open to Work
              </div>
            </div>
          </div>

          {/* Right Column - Visual Chaos */}
          <div className="relative hidden lg:block">
            {/* Stacked Cards Effect */}
            <div className="relative w-full h-[500px]">
              {/* Background Card */}
              <div 
                className="absolute top-8 left-8 w-80 h-96 bg-neo-violet border-4 border-neo-black rotate-3"
                style={{ boxShadow: '12px 12px 0px 0px #000' }}
              />
              
              {/* Middle Card */}
              <div 
                className="absolute top-4 left-4 w-80 h-96 bg-neo-yellow border-4 border-neo-black -rotate-2"
                style={{ boxShadow: '12px 12px 0px 0px #000' }}
              />
              
              {/* Front Card */}
              <div 
                className="absolute top-0 left-0 w-80 h-96 bg-white border-4 border-neo-black rotate-1 flex flex-col items-center justify-center p-8"
                style={{ boxShadow: '12px 12px 0px 0px #000' }}
              >
                <div className="w-32 h-32 bg-neo-black border-4 border-neo-black rounded-full flex items-center justify-center mb-6">
                  <Zap size={48} strokeWidth={3} className="text-neo-yellow fill-neo-yellow" />
                </div>
                <p className="font-black text-2xl uppercase tracking-tight text-center">
                  Building Digital
                </p>
                <p className="font-black text-2xl uppercase tracking-tight text-center text-neo-red">
                  Experiences
                </p>
                <div className="mt-6 flex gap-2">
                  <div className="w-3 h-3 bg-neo-black rounded-full" />
                  <div className="w-3 h-3 bg-neo-red rounded-full" />
                  <div className="w-3 h-3 bg-neo-yellow rounded-full" />
                </div>
              </div>

              {/* Floating Badge */}
              <div 
                className="absolute -top-4 -right-4 bg-neo-red border-4 border-neo-black px-4 py-2 rotate-12"
                style={{ boxShadow: '4px 4px 0px 0px #000' }}
              >
                <span className="font-black text-sm uppercase tracking-widest">2025</span>
              </div>

              {/* Tech Stack Pills */}
              <div className="absolute -bottom-4 left-10 flex gap-2 -rotate-3">
                <span className="bg-white border-4 border-neo-black px-3 py-1 font-bold text-xs uppercase" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                  React
                </span>
                <span className="bg-neo-yellow border-4 border-neo-black px-3 py-1 font-bold text-xs uppercase" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                  JS
                </span>
                <span className="bg-neo-violet border-4 border-neo-black px-3 py-1 font-bold text-xs uppercase" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                  CSS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-neo-black py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-black text-lg uppercase tracking-widest text-white flex items-center gap-8">
              <Star size={16} className="fill-neo-yellow text-neo-yellow" />
              Full Stack Developer
              <Star size={16} className="fill-neo-red text-neo-red" />
              React Specialist
              <Star size={16} className="fill-neo-violet text-neo-violet" />
              UI/UX Enthusiast
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
