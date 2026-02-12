import { motion } from 'framer-motion';
import { Linkedin, Github, Download } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { techStack } from '@/data/techStack';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useToast } from '@/hooks/use-toast';
import aboutBg from '@/assets/about-bg.jpg';
import type { TechCategory } from '@/types';

export default function About() {
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
      <SEOHead title="About" description={`Learn about ${photographerInfo.name} — ${photographerInfo.tagline}`} />
      
      <div className="min-h-screen">
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div initial={{ opacity: 0.8, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">About</h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">ML Engineer & Data Scientist</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              <ScrollReveal>
                <div className="space-y-6">
                  {/* Full image display with object-contain */}
                  <div className="relative w-full overflow-hidden rounded-sm bg-muted">
                    <img src={aboutBg} alt="Motivational quote" className="w-full h-auto object-contain" />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {photographerInfo.socialLinks.linkedin && (
                      <a href={photographerInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 border border-border rounded-sm hover:bg-accent transition-colors" aria-label="LinkedIn">
                        <Linkedin className="size-5" />
                      </a>
                    )}
                    {photographerInfo.socialLinks.github && (
                      <a href={photographerInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 border border-border rounded-sm hover:bg-accent transition-colors" aria-label="GitHub">
                        <Github className="size-5" />
                      </a>
                    )}
                    <button onClick={handleResumeDownload} className="inline-flex items-center gap-2 p-3 border border-border rounded-sm hover:bg-accent transition-colors font-light text-sm tracking-wide">
                      <Download className="size-5" /> Download Resume
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h2 className="text-4xl md:text-5xl font-light tracking-wide">{photographerInfo.name}</h2>
                    <p className="text-xl text-muted-foreground font-light tracking-wide">{photographerInfo.tagline}</p>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    {photographerInfo.biography.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">{paragraph}</p>
                    ))}
                  </div>
                  <div className="pt-4 space-y-2">
                    <div className="text-sm font-light tracking-wide">
                      <span className="text-muted-foreground">Email: </span>
                      <a href={`mailto:${photographerInfo.email}`} className="text-foreground hover:text-muted-foreground transition-colors">{photographerInfo.email}</a>
                    </div>
                    <div className="text-sm font-light tracking-wide">
                      <span className="text-muted-foreground">Status: </span>
                      <span className="text-green-400">{photographerInfo.status}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Tech Stack - Inlined */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-t border-border">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-12">Technologies</h2>
              <div className="space-y-8">
                {techStack.map((category: TechCategory, catIndex: number) => (
                  <motion.div key={category.name} className="space-y-3" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.4, delay: catIndex * 0.08 }}>
                    <h3 className="text-sm font-light tracking-widest uppercase text-muted-foreground">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span key={item} className="px-4 py-2 text-sm font-light tracking-wide border border-border rounded-sm bg-accent/50 text-foreground hover:bg-accent transition-colors">{item}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
