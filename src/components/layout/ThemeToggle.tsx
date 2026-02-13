import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const themes = ['light', 'dark', 'vibrant'] as const;
const themeIcons = { light: Sun, dark: Moon, vibrant: Sparkles };
const themeLabels = { light: 'Light', dark: 'Dark', vibrant: 'Vibrant' };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-9" disabled>
        <Sun className="size-5" />
      </Button>
    );
  }

  const currentIndex = themes.indexOf(theme as any);
  const nextIndex = (currentIndex + 1) % themes.length;
  const nextTheme = themes[nextIndex >= 0 ? nextIndex : 1];
  const Icon = themeIcons[theme as keyof typeof themeIcons] || Sun;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9 transition-colors hover:bg-accent"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${themeLabels[nextTheme]} mode`}
    >
      <Icon className="size-5" />
    </Button>
  );
}
