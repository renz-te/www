import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { ExternalLink, Layers, ShoppingCart, Landmark, Car, BookOpen } from 'lucide-react'

type FilterType = 'All' | 'Web Platforms' | 'Java/Python' | 'In Progress'

interface Project {
  title: string
  badge: string
  badgeColor: string
  description: string
  modules?: string[]
  icon: typeof Layers
  filters: FilterType[]
  gradient: string
  image?: string
}

const projects: Project[] = [
  {
    title: 'FIKA Slow Hours',
    badge: 'Sole Developer / Baby Thesis',
    badgeColor: 'bg-primary-accent/15 text-primary-accent border-primary-accent/25',
    description:
      'A comprehensive SaaS café management platform designed to streamline everyday operations — from human resources and payroll to point-of-sale and inventory tracking.',
    modules: ['HRMS', 'Shift Board', 'Payroll', 'POS', 'Inventory', 'Kiosk Mode'],
    icon: Layers,
    filters: ['All', 'Web Platforms', 'In Progress'],
    gradient: 'from-primary-accent to-secondary-accent',
    image: '/fika-dashboard.png',
  },
  {
    title: 'OptiMeal',
    badge: 'Active Development',
    badgeColor: 'bg-highlight/15 text-highlight border-highlight/25',
    description:
      'An e-commerce platform mitigating food waste via time-decay pricing. Products are dynamically discounted as they approach expiration, encouraging sustainable consumption.',
    icon: ShoppingCart,
    filters: ['All', 'Web Platforms', 'In Progress'],
    gradient: 'from-highlight to-secondary-accent',
    image: '/optimeal-dashboard.png',
  },
  {
    title: 'Loaning Application Platform',
    badge: 'Lead Project',
    badgeColor: 'bg-secondary-accent/15 text-secondary-accent border-secondary-accent/25',
    description:
      'A web platform for streamlined loan processing — handling applications, approvals, payment tracking, and user management with a clean, intuitive interface.',
    icon: Landmark,
    filters: ['All', 'Web Platforms'],
    gradient: 'from-secondary-accent to-primary-accent',
    image: '/loaning-dashboard.png',
  },
  {
    title: 'ParkFlow',
    badge: 'Sole Programmer & Architect',
    badgeColor: 'bg-primary-accent/15 text-primary-accent border-primary-accent/25',
    description:
      'A Java-based parking management system featuring real-time slot tracking, automated ticketing, and revenue reporting for efficient lot operations.',
    icon: Car,
    filters: ['All', 'Java/Python'],
    gradient: 'from-primary-accent to-highlight',
    image: '/parkflow-preview.png',
  },
  {
    title: 'E-Manga & Comic Catalog',
    badge: 'Co-author',
    badgeColor: 'bg-highlight/15 text-highlight border-highlight/25',
    description:
      'A digital library system developed in Python for organizing, categorizing, and indexing e-manga and comic collections.',
    icon: BookOpen,
    filters: ['All', 'Java/Python'],
    gradient: 'from-highlight to-primary-accent',
    image: '/e-manga-catalog.png',
  },
]

const filterOptions: FilterType[] = ['All', 'Web Platforms', 'Java/Python', 'In Progress']

export default function Projects() {
  const { ref, isInView } = useInView()
  const [active, setActive] = useState<FilterType>('All')

  const filtered = projects.filter((p) => p.filters.includes(active))

  return (
    <section id="projects" className="relative py-28 bg-primary-bg overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary-accent/4 blur-[140px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-primary-accent font-semibold text-sm tracking-widest uppercase">
            Featured Work
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-light-text tracking-tight">
            Projects
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-12 ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.15s' }}
        >
          {filterOptions.map((filter) => (
            <button
              key={filter}
              id={`filter-${filter.toLowerCase().replace(/[\/\s]/g, '-')}`}
              onClick={() => setActive(filter)}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                active === filter
                  ? 'bg-primary-accent text-white shadow-lg shadow-primary-accent/25'
                  : 'text-muted-text bg-secondary-bg/50 border border-primary-accent/10 hover:text-light-text hover:border-primary-accent/25'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className={`group relative rounded-2xl bg-secondary-bg/80 border border-primary-accent/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-primary-accent/25 hover:shadow-2xl hover:shadow-primary-accent/10 ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.25 + i * 0.1}s` }}
            >
              {/* Project Image */}
              {project.image && (
                <div className="relative h-44 overflow-hidden bg-primary-bg/40">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // Hide the image container if the asset isn't available yet
                      (e.currentTarget.parentElement as HTMLElement).style.display = 'none'
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-secondary-bg/90 to-transparent opacity-60`} />
                </div>
              )}

              {/* Top Gradient Bar (shown when no image) */}
              {!project.image && (
                <div className={`h-1 bg-gradient-to-r ${project.gradient} w-0 group-hover:w-full transition-all duration-700`} />
              )}

              <div className="p-7">
                {/* Icon + Title */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300`}>
                      <project.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-light-text text-base group-hover:text-primary-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-muted-text/40 group-hover:text-primary-accent transition-all duration-300 mt-1 shrink-0"
                  />
                </div>

                {/* Badge */}
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${project.badgeColor} mb-4`}>
                  {project.badge}
                </span>

                {/* Description */}
                <p className="text-muted-text text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Modules */}
                {project.modules && (
                  <div className="flex flex-wrap gap-2">
                    {project.modules.map((mod) => (
                      <span
                        key={mod}
                        className="px-2.5 py-1 text-[11px] font-medium text-light-text/70 bg-primary-bg/60 rounded-md border border-primary-accent/10"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
