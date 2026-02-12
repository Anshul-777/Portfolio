import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag, Github, MessageCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { StarRating } from '@/components/StarRating';
import { Chatbot } from '@/components/Chatbot';
import { getProjectBySlug } from '@/data/projects';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [chatbotOpen, setChatbotOpen] = useState(false);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const detail = project.detailedDescription;

  return (
    <>
      <SEOHead title={project.title} description={project.description} image={project.coverImage} type="article" />
      
      <div className="min-h-screen">
        <motion.div className="relative w-full h-[50vh] overflow-hidden bg-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        </motion.div>

        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <motion.div className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">{project.title}</h1>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-light">
                <div className="flex items-center gap-2"><Calendar className="size-4" /><span>{project.year}</span></div>
                <div className="flex items-center gap-2 capitalize"><Tag className="size-4" /><span>{project.category.replace('-', ' ')}</span></div>
              </div>
            </div>
            <Separator />
            <p className="text-lg md:text-xl font-light leading-relaxed text-foreground">{project.description}</p>
            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-light tracking-widest uppercase text-muted-foreground">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm font-light border border-border rounded-sm bg-accent/50 text-foreground">{tech}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {detail && (
          <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-16 space-y-12">
            {[
              { title: 'Project Overview', content: detail.overview, delay: 0 },
              { title: 'Core Concept', content: detail.coreConcept, delay: 0.1 },
              { title: 'Technical Approach', content: detail.technicalApproach, delay: 0.15 },
              { title: 'Prototype Demonstration', content: detail.prototype, delay: 0.2 },
              { title: 'Learning Outcomes & Impact', content: detail.learningOutcomes, delay: 0.25 },
            ].map((section) => (
              <ScrollReveal key={section.title} delay={section.delay}>
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-light tracking-wide text-foreground">{section.title}</h2>
                  <Separator />
                  <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">{section.content}</p>
                </div>
              </ScrollReveal>
            ))}

            {/* GitHub + Ask Chatbot */}
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a href="https://github.com/Anshul-777" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-sm font-light tracking-wide text-foreground hover:bg-accent transition-colors">
                  <Github className="size-5" /> View on GitHub
                </a>
                <button onClick={() => setChatbotOpen(true)} className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background rounded-sm font-light tracking-wide hover:bg-foreground/90 transition-colors">
                  <MessageCircle className="size-5" /> Ask Chatbot About This Project
                </button>
              </div>
            </ScrollReveal>

            {/* Project Rating */}
            <ScrollReveal delay={0.35}>
              <div className="max-w-md mx-auto space-y-4 pt-8">
                <h3 className="text-xl font-light tracking-wide text-center">Rate This Project</h3>
                <p className="text-sm text-muted-foreground font-light text-center">How would you rate this project?</p>
                <StarRating context={project.title} />
              </div>
            </ScrollReveal>
          </section>
        )}

        <div className="h-16" />
      </div>

      {/* Project-specific chatbot */}
      {chatbotOpen && (
        <Chatbot projectSlug={slug} autoOpen={true} onClose={() => setChatbotOpen(false)} />
      )}
    </>
  );
}
