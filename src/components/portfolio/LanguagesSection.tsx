import { motion } from 'framer-motion';

interface Language {
  name: string;
  nativeName: string;
  level: 'native' | 'fluent' | 'intermediate' | 'learning';
  proficiency: number; // 0-100
  flag: string;
  description: string;
}

const languages: Language[] = [
  {
    name: 'English',
    nativeName: 'English',
    level: 'fluent',
    proficiency: 90,
    flag: '🇬🇧',
    description: 'Professional working proficiency',
  },
  {
    name: 'Hindi',
    nativeName: 'हिन्दी',
    level: 'native',
    proficiency: 100,
    flag: '🇮🇳',
    description: 'Native language',
  },
  {
    name: 'Marathi',
    nativeName: 'मराठी',
    level: 'native',
    proficiency: 95,
    flag: '🇮🇳',
    description: 'Native regional language',
  },
  {
    name: 'Spanish',
    nativeName: 'Español',
    level: 'learning',
    proficiency: 22,
    flag: '🇪🇸',
    description: 'Currently learning — beginner level',
  },
];

const levelColors: Record<Language['level'], string> = {
  native: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  fluent: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  learning: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const levelBarColors: Record<Language['level'], string> = {
  native: 'from-emerald-500 to-teal-400',
  fluent: 'from-blue-500 to-cyan-400',
  intermediate: 'from-amber-500 to-yellow-400',
  learning: 'from-purple-500 to-pink-400',
};

export function LanguagesSection() {
  return (
    <section className="py-24 md:py-32 border-t border-border px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-wide vibrant-text-gradient">Languages</h2>
          <p className="text-lg text-muted-foreground font-light tracking-wide">Languages I speak & communicate in</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              className="group relative rounded-xl border border-border bg-accent/30 hover:bg-accent/50 p-6 space-y-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 gradient-border"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Flag + Level badge */}
              <div className="flex items-start justify-between">
                <span className="text-4xl">{lang.flag}</span>
                <span className={`text-[10px] font-light tracking-widest uppercase px-2.5 py-1 rounded-full border ${levelColors[lang.level]}`}>
                  {lang.level}
                </span>
              </div>

              {/* Names */}
              <div>
                <h3 className="text-xl font-light tracking-wide text-foreground">{lang.name}</h3>
                <p className="text-sm font-light text-muted-foreground mt-0.5">{lang.nativeName}</p>
              </div>

              {/* Description */}
              <p className="text-xs font-light text-muted-foreground leading-relaxed">{lang.description}</p>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-muted-foreground font-light">
                  <span>Proficiency</span>
                  <span>{lang.proficiency}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${levelBarColors[lang.level]}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
