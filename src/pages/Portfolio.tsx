import { projects } from '@/data/projects';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { motion } from 'framer-motion';

export default function Portfolio() {
  return (
    <>
      <SEOHead 
        title="Projects"
        description="Browse my ML, Data Science, and AI projects — from predictive systems to computer vision."
      />
      
      <div className="min-h-screen">
        <section className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                Projects
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
                Machine Learning, Data Science & AI systems built end-to-end
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <ProjectCard
                  project={project}
                  aspectRatio="landscape"
                  showCategory={true}
                  index={index}
                />
              </ScrollReveal>
            ))}
          </div>
        </section>

        <div className="h-24" />
      </div>
    </>
  );
}
