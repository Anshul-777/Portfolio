import { useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface StarRatingProps {
  context?: string; // e.g. project name or "Portfolio"
}

const ratingMessages: Record<number, { title: string; description: string }> = {
  1: { title: 'Thank you for your feedback', description: "I'm sorry to hear that. Your feedback helps me grow and improve." },
  2: { title: 'Thanks for your honesty', description: "I appreciate your candid feedback. I'll work on doing better." },
  3: { title: 'Thank you!', description: "Thanks for your feedback. I'm always working to improve." },
  4: { title: 'Glad you liked it!', description: 'Thank you! Glad you had a good experience.' },
  5: { title: 'Amazing! 🎉', description: 'Thank you so much! Your support means the world to me.' },
};

export function StarRating({ context = 'Portfolio' }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'f2072dce-0c71-4352-8b4a-bd15013a1360',
          subject: `⭐ ${rating}-Star Rating for ${context}`,
          from_name: 'Portfolio Rating System',
          to: 'anshulrathod999@gmail.com',
          rating: `${rating}/5`,
          context,
          feedback: feedback || 'No additional feedback',
        }),
      });
    } catch {
      // Still show success to user
    }

    const msg = ratingMessages[rating];
    toast({ title: msg.title, description: msg.description });
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-4"
      >
        <p className="text-muted-foreground font-light">Thank you for your feedback! ✨</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              className={`size-7 transition-colors ${
                star <= (hovered || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground/40'
              }`}
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {rating > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts (optional)..."
              className="w-full bg-accent/50 border border-border rounded-sm px-4 py-3 text-sm font-light resize-none min-h-[80px] focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-2.5 bg-foreground text-background rounded-sm font-light tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Submit Rating'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
