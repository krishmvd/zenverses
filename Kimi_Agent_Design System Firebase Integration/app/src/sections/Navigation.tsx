import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'CONTACT', href: '#contact' },
  ]

  return (
    <>
      {/* Fixed Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="bg-neo-cream border-b-4 border-neo-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a
                href="#"
                className="flex items-center gap-2 bg-neo-black border-4 border-neo-black px-3 py-1 font-black text-sm uppercase tracking-wider"
                style={{ boxShadow: '4px 4px 0px 0px #FFD93D' }}
              >
                <Zap size={16} strokeWidth={3} className="text-neo-yellow fill-neo-yellow" />
                <span className="text-white">ZV</span>
              </a>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 font-bold text-sm uppercase tracking-wide hover:bg-neo-yellow hover:border-neo-black hover:border-4 transition-all duration-100"
                    style={{ boxShadow: 'none' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '4px 4px 0px 0px #000'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 bg-neo-yellow border-4 border-neo-black"
                style={{ boxShadow: '4px 4px 0px 0px #000' }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-neo-cream border-b-4 border-neo-black">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 font-bold text-sm uppercase tracking-wide bg-white border-4 border-neo-black hover:bg-neo-yellow transition-all duration-100"
                  style={{ boxShadow: '4px 4px 0px 0px #000' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Static Logo (visible when not scrolled) */}
      <div
        className={`fixed top-4 left-4 z-40 transition-all duration-300 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <a
          href="#"
          className="flex items-center gap-2 bg-neo-black border-4 border-neo-black px-4 py-2 font-black text-lg uppercase tracking-wider"
          style={{ boxShadow: '4px 4px 0px 0px #FFD93D' }}
        >
          <Zap size={20} strokeWidth={3} className="text-neo-yellow fill-neo-yellow" />
          <span className="text-white">ZV</span>
        </a>
      </div>
    </>
  )
}

export default Navigation
