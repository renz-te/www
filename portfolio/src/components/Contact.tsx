import { useInView } from '../hooks/useInView'
import { Phone, Mail, MapPin, Send } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    values: ['0933 100 1712', '0994 213 3053'],
    href: 'tel:+639331001712',
  },
  {
    icon: Mail,
    label: 'Email',
    values: ['danlagterence01@gmail.com'],
    href: 'mailto:danlagterence01@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    values: ['Camachile Subdivision, Pasong Camachile I', 'City of General Trias, Cavite, 4107'],
    href: '#',
  },
]

export default function Contact() {
  const { ref, isInView } = useInView()

  return (
    <section id="contact" className="relative py-28 bg-secondary-bg overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary-accent/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-highlight/5 blur-[100px]" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-primary-accent font-semibold text-sm tracking-widest uppercase">
            Let's Connect
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-light-text tracking-tight">
            Get In Touch
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full" />
          <p className="mt-6 text-muted-text max-w-md mx-auto leading-relaxed">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about tech.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {contactInfo.map((info, i) => (
            <a
              key={info.label}
              href={info.href}
              className={`group block p-6 rounded-2xl bg-primary-bg/60 border border-primary-accent/10 hover:border-primary-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-accent/5 text-center ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 flex items-center justify-center group-hover:from-primary-accent/30 group-hover:to-secondary-accent/30 transition-all duration-300 mb-4">
                <info.icon size={24} className="text-primary-accent" />
              </div>
              <h3 className="text-light-text font-bold text-sm mb-2">{info.label}</h3>
              {info.values.map((v) => (
                <p key={v} className="text-muted-text text-xs leading-relaxed">
                  {v}
                </p>
              ))}
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div
          className={`max-w-2xl mx-auto ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.5s' }}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="p-8 rounded-2xl bg-primary-bg/60 border border-primary-accent/10"
          >
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-muted-text mb-2 tracking-wide uppercase">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-secondary-bg/60 border border-primary-accent/10 text-light-text text-sm placeholder:text-muted-text/50 focus:outline-none focus:border-primary-accent/40 focus:ring-2 focus:ring-primary-accent/10 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-muted-text mb-2 tracking-wide uppercase">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-secondary-bg/60 border border-primary-accent/10 text-light-text text-sm placeholder:text-muted-text/50 focus:outline-none focus:border-primary-accent/40 focus:ring-2 focus:ring-primary-accent/10 transition-all duration-300"
                />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="contact-subject" className="block text-xs font-semibold text-muted-text mb-2 tracking-wide uppercase">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                placeholder="What's this about?"
                className="w-full px-4 py-3 rounded-xl bg-secondary-bg/60 border border-primary-accent/10 text-light-text text-sm placeholder:text-muted-text/50 focus:outline-none focus:border-primary-accent/40 focus:ring-2 focus:ring-primary-accent/10 transition-all duration-300"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="contact-message" className="block text-xs font-semibold text-muted-text mb-2 tracking-wide uppercase">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Tell me about your project or idea..."
                className="w-full px-4 py-3 rounded-xl bg-secondary-bg/60 border border-primary-accent/10 text-light-text text-sm placeholder:text-muted-text/50 focus:outline-none focus:border-primary-accent/40 focus:ring-2 focus:ring-primary-accent/10 transition-all duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              id="contact-submit"
              className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-accent to-secondary-accent text-white font-semibold text-sm tracking-wide shadow-lg shadow-primary-accent/25 hover:shadow-xl hover:shadow-primary-accent/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Send Message
              <Send size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
