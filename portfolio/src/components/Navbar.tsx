import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active nav link based on scroll position
  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -70% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-primary-bg/90 backdrop-blur-xl shadow-2xl shadow-primary-accent/10 border-b border-primary-accent/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-tight group"
          >
            <span className="text-primary-accent group-hover:text-secondary-accent transition-colors duration-300">T</span>
            <span className="text-light-text group-hover:text-white transition-colors duration-300">D</span>
            <span className="inline-block w-2 h-2 rounded-full bg-highlight ml-0.5 group-hover:animate-pulse-glow transition-all duration-300" />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-primary-accent'
                    : 'text-muted-text hover:text-light-text'
                }`}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary-accent rounded-full" />
                )}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 px-5 py-2 text-sm font-semibold rounded-lg bg-primary-accent text-white hover:bg-secondary-accent transition-all duration-300 hover:shadow-lg hover:shadow-primary-accent/25"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-light-text hover:text-primary-accent transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 bg-primary-bg/95 backdrop-blur-xl border-t border-primary-accent/10 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeSection === link.href.replace('#', '')
                  ? 'text-primary-accent bg-primary-accent/10'
                  : 'text-muted-text hover:text-light-text hover:bg-secondary-bg/50'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
