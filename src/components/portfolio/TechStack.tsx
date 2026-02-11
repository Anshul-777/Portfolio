import { motion } from 'framer-motion';
import type { TechCategory } from '@/types';

interface TechStackProps {
  categories: TechCategory[];
}

export function TechStack({ categories }: TechStackProps) {
  return (
    <div className="space-y-8">
      {categories.map((category, catIndex) => (
        <motion.div
          key={category.name}
          className="space-y-3"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: catIndex * 0.08 }}
        >
          <h3 className="text-sm font-light tracking-widest uppercase text-muted-foreground">
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.items.map((item) => (
              <span
                key={item}
                className="px-4 py-2 text-sm font-light tracking-wide border border-border rounded-sm bg-accent/50 text-foreground hover:bg-accent transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
