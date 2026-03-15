import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, ArrowUpRight, Zap } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 bg-neo-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-halftone" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-neo-red border-4 border-neo-black rotate-12" style={{ boxShadow: '8px 8px 0px 0px #fff' }} />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-neo-yellow border-4 border-neo-black -rotate-12 rounded-full" style={{ boxShadow: '6px 6px 0px 0px #fff' }} />
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-neo-violet border-4 border-neo-black rotate-45" style={{ boxShadow: '4px 4px 0px 0px #fff' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neo-yellow border-4 border-neo-black px-4 py-2 mb-6 -rotate-1" style={{ boxShadow: '4px 4px 0px 0px #fff' }}>
            <Send size={18} strokeWidth={3} />
            <span className="font-black text-xs uppercase tracking-widest">Get In Touch</span>
          </div>
          
          <h2 className="font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter mb-4">
            <span className="text-stroke-thick" style={{ WebkitTextStroke: '2px #fff', color: 'transparent' }}>LET'S</span>{' '}
            <span className="text-white">CONNECT</span>
          </h2>
          
          <p className="font-bold text-lg md:text-xl max-w-2xl mx-auto text-white/80">
            Open to opportunities and collaborations. Let's build something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white border-4 border-neo-black p-8 -rotate-1" style={{ boxShadow: '8px 8px 0px 0px #FFD93D' }}>
              <h3 className="font-black text-2xl uppercase tracking-tight mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <a 
                  href="mailto:mevadarish@gmail.com"
                  className="flex items-center gap-4 p-4 bg-neo-cream border-4 border-neo-black hover:bg-neo-yellow transition-all duration-100 group"
                  style={{ boxShadow: '4px 4px 0px 0px #000' }}
                >
                  <div className="bg-neo-red border-4 border-neo-black p-2 group-hover:rotate-12 transition-transform">
                    <Mail size={24} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest text-neo-black/60">Email</p>
                    <p className="font-bold text-lg">mevadarish@gmail.com</p>
                  </div>
                  <ArrowUpRight size={20} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                </a>
                
                <a 
                  href="tel:+919427830379"
                  className="flex items-center gap-4 p-4 bg-neo-cream border-4 border-neo-black hover:bg-neo-yellow transition-all duration-100 group"
                  style={{ boxShadow: '4px 4px 0px 0px #000' }}
                >
                  <div className="bg-neo-violet border-4 border-neo-black p-2 group-hover:rotate-12 transition-transform">
                    <Phone size={24} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest text-neo-black/60">Phone</p>
                    <p className="font-bold text-lg">+91-9427830379</p>
                  </div>
                  <ArrowUpRight size={20} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                </a>
                
                <div className="flex items-center gap-4 p-4 bg-neo-cream border-4 border-neo-black" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                  <div className="bg-neo-yellow border-4 border-neo-black p-2">
                    <MapPin size={24} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest text-neo-black/60">Location</p>
                    <p className="font-bold text-lg">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Github, label: 'GitHub', color: 'bg-neo-red' },
                { icon: Linkedin, label: 'LinkedIn', color: 'bg-neo-yellow' },
                { icon: Twitter, label: 'Twitter', color: 'bg-neo-violet' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className={`flex items-center gap-2 ${social.color} border-4 border-neo-black px-4 py-3 hover:-translate-y-1 transition-transform duration-100`}
                  style={{ boxShadow: '4px 4px 0px 0px #fff' }}
                >
                  <social.icon size={20} strokeWidth={3} />
                  <span className="font-black text-sm uppercase tracking-wide">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border-4 border-neo-black p-8 rotate-1" style={{ boxShadow: '8px 8px 0px 0px #FF6B6B' }}>
            <h3 className="font-black text-2xl uppercase tracking-tight mb-6">
              Send a Message
            </h3>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-black text-sm uppercase tracking-widest mb-2 block">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="input-neo w-full"
                  />
                </div>
                <div>
                  <label className="font-black text-sm uppercase tracking-widest mb-2 block">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="input-neo w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="font-black text-sm uppercase tracking-widest mb-2 block">Subject</label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="input-neo w-full"
                />
              </div>
              
              <div>
                <label className="font-black text-sm uppercase tracking-widest mb-2 block">Message</label>
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  className="input-neo w-full resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full btn-neo justify-center"
              >
                <Send size={18} className="mr-2" strokeWidth={3} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t-4 border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-neo-black border-4 border-neo-black px-3 py-1 flex items-center gap-2" style={{ boxShadow: '4px 4px 0px 0px #FFD93D' }}>
                <Zap size={16} strokeWidth={3} className="text-neo-yellow fill-neo-yellow" />
                <span className="font-black text-lg uppercase tracking-wider text-white">ZV</span>
              </div>
              <p className="font-bold text-white/80">
                © 2025 W3B DEV KRISH. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#skills" className="font-bold text-sm uppercase tracking-wide text-white/80 hover:text-neo-yellow transition-colors">
                Skills
              </a>
              <a href="#projects" className="font-bold text-sm uppercase tracking-wide text-white/80 hover:text-neo-yellow transition-colors">
                Projects
              </a>
              <a href="#education" className="font-bold text-sm uppercase tracking-wide text-white/80 hover:text-neo-yellow transition-colors">
                Education
              </a>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="font-medium text-white/60 text-sm">
              Built with React, TypeScript, Tailwind CSS & Firebase
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Contact
