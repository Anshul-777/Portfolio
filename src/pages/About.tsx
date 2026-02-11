import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { techStack } from '@/data/techStack';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { TechStack } from '@/components/portfolio/TechStack';

export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${photographerInfo.name} — ${photographerInfo.tagline}`}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                About
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                ML Engineer & Data Scientist
              </p>
            </motion.div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Profile Image */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0.8, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-muted">
                  {/* Photo by ThisisEngineering on Unsplash */}
                  <img
                    src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80&fit=crop"
                    alt="Abstract code visualization"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {photographerInfo.socialLinks.linkedin && (
                    <a
                      href={photographerInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-5" />
                    </a>
                  )}
                  {photographerInfo.socialLinks.github && (
                    <a
                      href={photographerInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="size-5" />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Bio Text */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0.8, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="space-y-3">
                  <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                    {photographerInfo.name}
                  </h2>
                  <p className="text-xl text-muted-foreground font-light tracking-wide">
                    {photographerInfo.tagline}
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  {photographerInfo.biography.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base md:text-lg font-light leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-4 space-y-2">
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">Email: </span>
                    <a
                      href={`mailto:${photographerInfo.email}`}
                      className="text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {photographerInfo.email}
                    </a>
                  </div>
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">Status: </span>
                    <span className="text-green-400">{photographerInfo.status}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech Stack in About */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-12">
              Technologies
            </h2>
            <TechStack categories={techStack} />
          </div>
        </section>
      </div>
    </>
  );
}
