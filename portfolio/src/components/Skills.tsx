import { useInView } from '../hooks/useInView'

interface SkillCategory {
  title: string
  color: string
  borderColor: string
  glowColor: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Core Competencies',
    color: 'text-primary-accent',
    borderColor: 'border-primary-accent/20 hover:border-primary-accent/40',
    glowColor: 'from-primary-accent/10 to-transparent',
    skills: ['Task Prioritization', 'Inventory Control', 'Quality Assurance', 'Workflow Optimization'],
  },
  {
    title: 'Operational & Service',
    color: 'text-secondary-accent',
    borderColor: 'border-secondary-accent/20 hover:border-secondary-accent/40',
    glowColor: 'from-secondary-accent/10 to-transparent',
    skills: [
      'Queue & Crowd Control',
      'High-Volume Operations',
      'Physical Stamina',
      'Professional Communication',
    ],
  },
  {
    title: 'Technical',
    color: 'text-highlight',
    borderColor: 'border-highlight/20 hover:border-highlight/40',
    glowColor: 'from-highlight/10 to-transparent',
    skills: ['Full-Stack Development', 'System Architecture', 'Java', 'Python'],
  },
]

export default function Skills() {
  const { ref, isInView } = useInView()

  return (
    <section id="skills" className="relative py-28 bg-secondary-bg overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full bg-highlight/4 blur-[120px] -translate-x-1/2" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-primary-accent font-semibold text-sm tracking-widest uppercase">
            What I Bring
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-light-text tracking-tight">
            Skills &amp; Expertise
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full" />
        </div>

        {/* Skill Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              className={`group relative rounded-2xl bg-primary-bg/60 border ${cat.borderColor} p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-accent/5 ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.2 + i * 0.15}s` }}
            >
              {/* Top glow */}
              <div className={`absolute top-0 left-0 right-0 h-32 rounded-t-2xl bg-gradient-to-b ${cat.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <h3 className={`text-lg font-bold ${cat.color} mb-6`}>
                  {cat.title}
                </h3>

                <div className="space-y-3">
                  {cat.skills.map((skill, j) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 group/skill"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                        i === 0 ? 'from-primary-accent to-secondary-accent' :
                        i === 1 ? 'from-secondary-accent to-highlight' :
                        'from-highlight to-primary-accent'
                      } opacity-60 group-hover/skill:opacity-100 transition-opacity`} />
                      <span className="text-light-text/80 text-sm font-medium group-hover/skill:text-light-text transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Decorative bottom bar */}
                <div className={`mt-6 h-0.5 rounded-full bg-gradient-to-r ${
                  i === 0 ? 'from-primary-accent/30 to-transparent' :
                  i === 1 ? 'from-secondary-accent/30 to-transparent' :
                  'from-highlight/30 to-transparent'
                } w-0 group-hover:w-full transition-all duration-700`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
