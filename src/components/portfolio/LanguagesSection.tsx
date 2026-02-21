import { motion } from 'framer-motion';

interface Language {
  name: string;
  nativeName: string;
  level: 'native' | 'fluent' | 'learning';
  flag: string;
}

const languages: Language[] = [
  { name: 'Hindi', nativeName: 'हिन्दी', level: 'native', flag: '🇮🇳' },
  { name: 'English', nativeName: 'English', level: 'fluent', flag: '🇬🇧' },
  { name: 'Marathi', nativeName: 'मराठी', level: 'native', flag: '🇮🇳' },
  { name: 'Spanish', nativeName: 'Español', level: 'learning', flag: '🇪🇸' },
];

const levelStyle: Record<Language['level'], string> = {
  native: 'text-emerald-400',
  fluent: 'text-blue-400',
  learning: 'text-purple-400',
};

export function LanguagesSection() {
  return (
    <section className="py-14 md:py-20 border-t border-border px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="text-center text-xs tracking-widest uppercase text-muted-foreground mb-6 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Languages I Speak
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              className="flex items-center gap-2 text-sm font-light text-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              <span className={`text-[10px] tracking-wider uppercase ${levelStyle[lang.level]}`}>
                {lang.level === 'learning' ? '(learning)' : ''}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
