import { Heart } from 'lucide-react'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative bg-primary-bg border-t border-primary-accent/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="text-xl font-bold tracking-tight group">
            <span className="text-primary-accent group-hover:text-secondary-accent transition-colors duration-300">
              T
            </span>
            <span className="text-light-text group-hover:text-white transition-colors duration-300">
              D
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-highlight ml-0.5" />
          </a>

          {/* Nav */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-text hover:text-primary-accent transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-8 border-t border-primary-accent/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-text/60 flex items-center gap-1">
            © {new Date().getFullYear()} Terence Danlag. Built with{' '}
            <Heart size={12} className="text-primary-accent inline" /> and React.
          </p>
          <a
            href="#"
            className="text-xs text-muted-text/40 hover:text-primary-accent transition-colors duration-300"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
