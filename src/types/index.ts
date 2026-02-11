/**
 * Core TypeScript interfaces for ML Engineer Portfolio
 */

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  coverImage: string;
  images: ProjectImage[];
  description: string;
  technologies?: string[];
  slug: string;
  client?: string;
  camera?: string;
  location?: string;
}

export interface EngineerInfo {
  name: string;
  tagline: string;
  headline: string;
  heroIntroduction: string;
  biography: string;
  status: string;
  location: string;
  email: string;
  availability: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
  };
}

export type PhotographerInfo = EngineerInfo;

export interface ContactSubmission {
  name: string;
  email: string;
  inquiryType: 'freelance' | 'fulltime' | 'collaboration' | 'other';
  message: string;
  timestamp: Date;
}

export interface TechCategory {
  name: string;
  items: string[];
}
