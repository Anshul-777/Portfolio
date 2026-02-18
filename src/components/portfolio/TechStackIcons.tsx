import { motion } from 'framer-motion';
import { useState } from 'react';
import { techIcons } from '@/data/techIcons';
import type { TechCategory } from '@/types';

interface TechStackIconsProps {
  categories: TechCategory[];
}

function TechIcon({ name }: { name: string }) {
  const src = techIcons[name];
  const [err, setErr] = useState(false);
  // Special handling for dark icon on light bg (Express/GitHub etc.)
  const needsBgRound = ['Express.js', 'Vercel', 'Apache Kafka', 'Matplotlib', 'Plotly', 'MLflow', 'Scikit-learn'].includes(name);

  return (
    <motion.div
      className="group flex flex-col items-center gap-2 cursor-default"
      whileHover={{ scale: 1.12, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className={`
          w-14 h-14 rounded-xl flex items-center justify-center border border-border
          bg-accent/60 hover:bg-accent transition-colors shadow-sm
          group-hover:shadow-md group-hover:border-primary/40
          ${needsBgRound ? 'dark:bg-white/10 vibrant:bg-white/10' : ''}
        `}
      >
        {src && !err ? (
          <img
            src={src}
            alt={name}
            className="w-8 h-8 object-contain"
            onError={() => setErr(true)}
            loading="lazy"
          />
        ) : (
          <span className="text-xs font-bold text-foreground/60 text-center leading-tight px-1">
            {name.slice(0, 3).toUpperCase()}
          </span>
        )}
      </div>
      <span className="text-[11px] font-light tracking-wide text-muted-foreground text-center w-16 truncate group-hover:text-foreground transition-colors">
        {name}
      </span>
    </motion.div>
  );
}

export function TechStackIcons({ categories }: TechStackIconsProps) {
  return (
    <div className="space-y-10">
      {categories.map((category, catIndex) => (
        <motion.div
          key={category.name}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: catIndex * 0.1 }}
        >
          <div className="flex items-center gap-3">
            <h3 className="text-xs font-light tracking-widest uppercase text-muted-foreground">
              {category.name}
            </h3>
            <div className="flex-1 h-px bg-border/60" />
          </div>
          <div className="flex flex-wrap gap-4">
            {category.items.map((item) => (
              <TechIcon key={item} name={item} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
