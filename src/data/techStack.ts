import type { TechCategory } from '@/types';

export const techStack: TechCategory[] = [
  {
    name: 'Languages',
    items: ['Python', 'C++', 'HTML5', 'CSS3', 'TypeScript'],
  },
  {
    name: 'Web / App',
    items: ['Node.js', 'Express.js', 'FastAPI', 'React Native', 'Angular', 'Vercel', 'Vite', 'TailwindCSS'],
  },
  {
    name: 'Data & ML',
    items: ['PyTorch', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Plotly', 'MLflow', 'Anaconda'],
  },
  {
    name: 'Database & Cloud',
    items: ['AWS', 'Firebase', 'PostgreSQL', 'MySQL', 'Docker', 'Apache Kafka'],
  },
  {
    name: 'Tools',
    items: ['Git', 'GitHub'],
  },
];
