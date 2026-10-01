import { useInView } from '../hooks/useInView'
import { User, Code, Target } from 'lucide-react'

const highlights = [
  { icon: User, label: 'Team Leader', description: 'Coordinating tasks & managing workflows' },
  { icon: Code, label: 'Full-Stack Dev', description: 'End-to-end application development' },
  { icon: Target, label: 'Problem Solver', description: 'Analytical & detail-oriented approach' },
]

export default function About() {
  const { ref, isInView } = useInView()

  return (
    <section id="about" className="relative py-28 bg-secondary-bg overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary-accent/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-highlight/5 blur-[100px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-primary-accent font-semibold text-sm tracking-widest uppercase">
            Get to Know Me
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-light-text tracking-tight">
            About Me
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Bio */}
          <div
            className={`lg:col-span-3 ${isInView ? 'animate-fade-in-left' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative p-8 rounded-2xl bg-primary-bg/60 border border-primary-accent/10 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary-accent/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-secondary-accent/30 rounded-br-2xl" />

              <p className="text-light-text/90 leading-relaxed text-base lg:text-lg">
                Detail-oriented <span className="text-primary-accent font-semibold">BSIT student</span> with a
                foundation in full-stack development, workflow management, and community operations.
                Proven track record in coordinating team tasks, managing inventory, and maintaining
                high quality standards under tight deadlines.
              </p>
              <p className="mt-4 text-muted-text leading-relaxed text-base lg:text-lg">
                Possesses strong <span className="text-highlight font-semibold">analytical problem-solving</span> skills,
                physical stamina, and adaptability for fast-paced operational environments.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['BSIT Student', 'Full-Stack Developer', 'Systems Architect', 'Team Leader'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 text-xs font-medium text-primary-accent bg-primary-accent/10 border border-primary-accent/20 rounded-full"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Highlight Cards */}
          <div
            className={`lg:col-span-2 space-y-4 ${isInView ? 'animate-fade-in-right' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            {highlights.map((item, i) => (
              <div
                key={item.label}
                className="group p-5 rounded-xl bg-primary-bg/60 border border-primary-accent/10 hover:border-primary-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-accent/5 cursor-default"
                style={{ animationDelay: `${0.5 + i * 0.15}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 flex items-center justify-center group-hover:from-primary-accent/30 group-hover:to-secondary-accent/30 transition-all duration-300">
                    <item.icon size={22} className="text-primary-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-light-text text-sm">{item.label}</h3>
                    <p className="text-muted-text text-xs mt-0.5">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
