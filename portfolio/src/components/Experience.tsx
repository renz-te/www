import { useInView } from '../hooks/useInView'
import { Briefcase, GraduationCap, Heart } from 'lucide-react'

const experiences = [
  {
    icon: GraduationCap,
    role: 'Lead Systems Developer',
    type: 'Academic Projects',
    org: 'National College of Science and Technology',
    period: '2025 – 2026',
    color: 'from-primary-accent to-secondary-accent',
    description:
      'Leading system architecture and full-stack development for thesis and capstone projects. Designing scalable SaaS platforms with modular features including HRMS, Payroll, POS, and Inventory systems.',
  },
  {
    icon: Heart,
    role: 'Community Service Volunteer',
    type: 'Public Service',
    org: 'Barangay Langkaan II Hall',
    period: '2025',
    color: 'from-highlight to-secondary-accent',
    description:
      'Supported community programs and events, assisting in crowd management, documentation, and coordinating logistics for local government operations.',
  },
  {
    icon: Briefcase,
    role: 'Volunteer Assistant',
    type: 'Education Support',
    org: 'San Francisco Elementary School',
    period: '2024',
    color: 'from-secondary-accent to-primary-accent',
    description:
      'Assisted teaching staff with classroom preparation, student coordination, and educational activities. Developed communication and organizational skills in a fast-paced learning environment.',
  },
]

export default function Experience() {
  const { ref, isInView } = useInView()

  return (
    <section id="experience" className="relative py-28 bg-primary-bg overflow-hidden">
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-primary-accent/4 blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-primary-accent font-semibold text-sm tracking-widest uppercase">
            My Journey
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-light-text tracking-tight">
            Experience
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-accent/40 via-secondary-accent/20 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.role}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  isInView ? 'animate-fade-in-up' : 'opacity-0'
                } ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ animationDelay: `${0.2 + i * 0.2}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-bg border-2 border-primary-accent z-10 mt-8 md:mt-6">
                  <div className="absolute inset-0 rounded-full bg-primary-accent/30 animate-ping" style={{ animationDuration: '3s' }} />
                </div>

                {/* Card */}
                <div className={`flex-1 ml-14 md:ml-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="group p-6 rounded-2xl bg-secondary-bg/80 border border-primary-accent/10 hover:border-primary-accent/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-accent/5">
                    {/* Header Row */}
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`}>
                        <exp.icon size={22} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-light-text text-lg leading-snug">
                          {exp.role}
                        </h3>
                        <p className="text-primary-accent text-sm font-medium mt-0.5">
                          {exp.org}
                        </p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 text-xs font-medium text-highlight bg-highlight/10 rounded-full">
                        {exp.period}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium text-muted-text bg-muted-text/10 rounded-full">
                        {exp.type}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-muted-text text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
