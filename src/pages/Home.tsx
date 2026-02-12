import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { techStack } from '@/data/techStack';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Briefcase, Github, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import heroBg from '@/assets/hero-bg.jpg';
import type { TechCategory } from '@/types';

// Typing animation for headline
function TypedHeadline({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const { toast } = useToast();

  const handleResumeDownload = () => {
    toast({ title: '📄 Resume Download Started', description: 'Thank you for your interest in my work!' });
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Anshul_Rathod_Resume.pdf';
    link.click();
  };

  return (
    <>
      <SEOHead />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden bg-background">
          <div className="absolute inset-0">
            <img src={heroBg} alt="Abstract data visualization" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          </div>

          <div className="relative h-full flex flex-col items-center justify-center px-6">
            <motion.div
              className="text-center space-y-6 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-light tracking-wide text-green-400">{photographerInfo.status}</span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-wide text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {photographerInfo.name}
              </motion.h1>
              
              <motion.p
                className="text-lg md:text-xl font-light tracking-wide text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <TypedHeadline text={photographerInfo.tagline} />
              </motion.p>

              <motion.p
                className="text-base md:text-lg font-light leading-relaxed text-muted-foreground/80 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {photographerInfo.heroIntroduction}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Link to="/portfolio" className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background rounded-sm font-light tracking-wide hover:bg-foreground/90 transition-colors">
                  <Briefcase className="size-4" /> View Projects
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-sm font-light tracking-wide text-foreground hover:bg-accent transition-colors">
                  Contact Me
                </Link>
                <a href="https://github.com/Anshul-777" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-sm font-light tracking-wide text-foreground hover:bg-accent transition-colors">
                  <Github className="size-4" /> GitHub
                </a>
                <button onClick={handleResumeDownload} className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-sm font-light tracking-wide text-foreground hover:bg-accent transition-colors">
                  <Download className="size-4" /> Resume
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-light tracking-wide">About Me</h2>
                <div className="space-y-4 text-lg font-light leading-relaxed text-muted-foreground text-left">
                  {photographerInfo.biography.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <Link to="/about" className="inline-flex items-center gap-2 text-base font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors group">
                  <span>Learn More</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Tech Stack Section - Inlined */}
        <section className="py-24 md:py-32 border-t border-border px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 space-y-4">
                <h2 className="text-4xl md:text-5xl font-light tracking-wide">Tech Stack</h2>
                <p className="text-lg text-muted-foreground font-light tracking-wide">Technologies I work with</p>
              </div>
              {/* Inlined TechStack */}
              <div className="space-y-8">
                {techStack.map((category: TechCategory, catIndex: number) => (
                  <motion.div
                    key={category.name}
                    className="space-y-3"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: catIndex * 0.08 }}
                  >
                    <h3 className="text-sm font-light tracking-widest uppercase text-muted-foreground">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span key={item} className="px-4 py-2 text-sm font-light tracking-wide border border-border rounded-sm bg-accent/50 text-foreground hover:bg-accent transition-colors">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 md:py-32 border-t border-border">
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-4xl md:text-5xl font-light tracking-wide">Featured Projects</h2>
                <span className="px-3 py-1 text-sm font-light border border-border rounded-full bg-accent/50">{featuredProjects.length}</span>
              </div>
              <p className="text-lg text-muted-foreground font-light tracking-wide">Selected work in ML, Data Science & AI</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 px-6 lg:px-8 max-w-7xl mx-auto">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                {/* Inlined ProjectCard */}
                <InlinedProjectCard project={project} index={index} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16 px-6">
              <Link to="/portfolio" className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors">
                <span>View All Projects</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}

// Inlined ProjectCard
function InlinedProjectCard({ project, index = 0 }: { project: any; index?: number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
      <Link to={`/project/${project.slug}`} className="group block relative overflow-hidden rounded-sm">
        <div className={cn('relative overflow-hidden bg-muted aspect-[3/2]')}>
          {!isLoaded && <div className="absolute inset-0 bg-muted" />}
          <motion.img
            src={project.coverImage}
            alt={project.title}
            className={cn('absolute inset-0 w-full h-full object-cover transition-all duration-700', isLoaded ? 'opacity-100' : 'opacity-0', 'group-hover:scale-110')}
            loading={index < 6 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
              <h3 className="text-white text-xl md:text-2xl font-light tracking-wide">{project.title}</h3>
              <div className="flex items-center gap-3 text-sm text-white/80 font-light tracking-wide">
                <span className="capitalize">{project.category}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}
