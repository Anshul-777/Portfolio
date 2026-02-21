import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    text: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
  },
  {
    text: 'The best way to predict the future is to invent it.',
    author: 'Alan Kay',
  },
  {
    text: 'AI is the new electricity.',
    author: 'Andrew Ng',
  },
];

export function QuoteSection() {
  // Pick a quote based on the day so it rotates daily
  const today = new Date();
  const idx = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % quotes.length;
  const q = quotes[idx];

  return (
    <section className="py-20 md:py-28 border-t border-border px-6 lg:px-8 overflow-hidden">
      <motion.div
        className="max-w-3xl mx-auto text-center space-y-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Quote className="size-10 mx-auto text-primary/40" />
        </motion.div>

        <motion.blockquote
          className="text-2xl md:text-4xl font-extralight tracking-wide leading-relaxed text-foreground vibrant-text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          "{q.text}"
        </motion.blockquote>

        <motion.p
          className="text-base text-muted-foreground font-light tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          — {q.author}
        </motion.p>

        {/* Decorative animated line */}
        <motion.div
          className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          animate={{ scaleX: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
