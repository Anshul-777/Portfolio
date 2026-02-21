import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates, type Certificate } from '@/data/certificates';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Award, ExternalLink, ChevronDown, Calendar, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryLabel: Record<Certificate['category'], string> = {
  badge: 'Badge',
  certificate: 'Certificate',
  hackathon: 'Hackathon',
};

const categoryColor: Record<Certificate['category'], string> = {
  badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  certificate: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  hackathon: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

export default function Certificates() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      <SEOHead title="Certificates — Anshul Rathod" description="Professional certifications, badges, and hackathon awards." />

      <div className="min-h-screen pt-28 pb-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-accent/40 text-sm font-light text-muted-foreground">
                <Award className="size-4" /> {certificates.length} Credentials
              </div>
              <h1 className="text-4xl md:text-6xl font-extralight tracking-wide vibrant-text-gradient">
                Certificates & Badges
              </h1>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                Professional certifications, cloud badges, and hackathon recognitions that validate my expertise.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {certificates.map((cert, i) => (
              <ScrollReveal key={cert.id} delay={i * 0.08}>
                <CertificateCard
                  cert={cert}
                  isExpanded={expanded === cert.id}
                  onToggle={() => setExpanded(expanded === cert.id ? null : cert.id)}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Credly verification callout */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center space-y-4 p-8 rounded-xl border border-border bg-accent/20 gradient-border">
              <p className="text-lg font-light text-foreground">Verify my credentials</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://www.credly.com/users/anshul-rathod.37fcdcf5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-accent/40 text-sm font-light text-foreground hover:bg-accent transition-all hover:scale-105"
                >
                  <img src="https://cdn.simpleicons.org/credly" alt="Credly" className="size-5" />
                  View Credly Profile <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}

function CertificateCard({ cert, isExpanded, onToggle }: { cert: Certificate; isExpanded: boolean; onToggle: () => void }) {
  return (
    <motion.div
      layout
      className={cn(
        'rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden transition-shadow duration-300 gradient-border',
        isExpanded && 'shadow-lg'
      )}
    >
      {/* Header — always visible */}
      <button onClick={onToggle} className="w-full text-left p-5 md:p-6 flex items-start gap-5 group">
        {/* Thumbnail */}
        <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted border border-border">
          <img src={cert.badgeImage || cert.image} alt={cert.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn('text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border font-light', categoryColor[cert.category])}>
              {categoryLabel[cert.category]}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-light tracking-wide text-foreground leading-snug">{cert.title}</h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-light">
            <span className="inline-flex items-center gap-1"><Building2 className="size-3" />{cert.issuer}</span>
            <span className="inline-flex items-center gap-1"><Calendar className="size-3" />{cert.date}</span>
          </div>
        </div>

        <ChevronDown className={cn('size-5 text-muted-foreground shrink-0 mt-1 transition-transform duration-300', isExpanded && 'rotate-180')} />
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 space-y-5 border-t border-border pt-5">
              {/* Certificate image */}
              <div className="rounded-lg overflow-hidden border border-border bg-muted max-w-2xl mx-auto">
                <img src={cert.image} alt={cert.title} className="w-full h-auto object-contain" loading="lazy" />
              </div>

              {/* Description */}
              <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-3xl">{cert.description}</p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {cert.highlights.map((h) => (
                  <span key={h} className="text-xs font-light px-3 py-1 rounded-full border border-border bg-accent/30 text-foreground vibrant-tag">
                    {h}
                  </span>
                ))}
              </div>

              {/* Verification links */}
              <div className="flex flex-wrap gap-3 pt-1">
                {cert.verifyUrl && (
                  <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-light text-primary hover:underline">
                    <ExternalLink className="size-3" /> Verify Certificate
                  </a>
                )}
                {cert.credlyProfile && (
                  <a href={cert.credlyProfile} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-light text-primary hover:underline">
                    <ExternalLink className="size-3" /> View on Credly
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
