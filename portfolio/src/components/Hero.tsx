import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-bg"
    >
      {/* Ambient Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary-accent/8 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-secondary-accent/6 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-highlight/4 blur-[100px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary-accent/30 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-accent/10 border border-primary-accent/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-accent animate-pulse" />
              <span className="text-xs font-medium text-primary-accent tracking-wider uppercase">
                Open to Opportunities
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-light-text leading-tight tracking-tight">
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-accent via-secondary-accent to-highlight bg-clip-text text-transparent">
                  Terence
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full opacity-50" />
              </span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-muted-text max-w-lg mx-auto lg:mx-0 font-medium">
              Aspiring Tech Innovator &amp; Systems Developer
            </p>

            <p className="mt-4 text-sm text-muted-text/70 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Building elegant, efficient solutions from concept to deployment.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                className="group px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-accent to-secondary-accent text-white font-semibold text-sm tracking-wide shadow-lg shadow-primary-accent/25 hover:shadow-xl hover:shadow-primary-accent/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                View My Work
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-xl border border-primary-accent/30 text-primary-accent font-semibold text-sm tracking-wide hover:bg-primary-accent/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-shrink-0 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-primary-accent via-secondary-accent to-highlight opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-500" />
              {/* Spinning border */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-accent via-highlight to-secondary-accent opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_8s_linear_infinite]" />
              {/* Image container */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary-bg">
                <img
                  src="/profile.png"
                  alt="Terence Danlag"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-text/50 hover:text-primary-accent transition-colors duration-300 animate-fade-in"
        style={{ animationDelay: '1s' }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </a>
    </section>
  )
}
