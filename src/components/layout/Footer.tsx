import { Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { photographerInfo } from '@/data/photographer';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/portfolio' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <p className="text-base font-light tracking-widest text-foreground uppercase">
              {photographerInfo.name}
            </p>
            <p className="text-sm text-muted-foreground font-light max-w-xs leading-relaxed">
              {photographerInfo.tagline}
            </p>
            <div className="flex items-center gap-4 pt-1">
              {photographerInfo.socialLinks.linkedin && (
                <a
                  href={photographerInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="size-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-light tracking-widest uppercase text-muted-foreground">Navigation</p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="text-xs font-light tracking-widest uppercase text-muted-foreground">Contact</p>
            <div className="space-y-2">
              <a
                href={`mailto:${photographerInfo.email}`}
                className="block text-sm font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                {photographerInfo.email}
              </a>
              <p className="text-sm font-light text-muted-foreground tracking-wide">{photographerInfo.location}</p>
              <p className="text-xs text-emerald-400 font-light">{photographerInfo.status}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground font-light tracking-wide text-center">
            © 2026 {photographerInfo.name}. Built with React & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
