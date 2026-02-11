import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Cyber Financial Crime Prevention',
    category: 'machine-learning',
    year: '2024',
    slug: 'cyber-financial-crime-prevention',
    // Photo by Markus Spiske on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1080&q=80&fit=crop',
    description: 'A large-scale predictive system designed for early detection and prevention of cyber financial crimes. The project focuses on transaction behavior analysis, temporal patterns, risk profiling, and real-time inference. It includes advanced feature engineering, class imbalance handling, model optimization, and backend integration.',
    technologies: ['Python', 'Scikit-learn', 'PyTorch', 'FastAPI', 'PostgreSQL', 'Docker'],
    images: [
      {
        id: '1-1',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080&q=80&fit=crop',
        alt: 'Data visualization dashboard',
        aspectRatio: 'landscape'
      },
      {
        id: '1-2',
        src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1080&q=80&fit=crop',
        alt: 'Analytics interface',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '2',
    title: 'Customer Churn Prediction Platform',
    category: 'data-science',
    year: '2024',
    slug: 'customer-churn-prediction',
    // Photo by Luke Chesser on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080&q=80&fit=crop',
    description: 'An end-to-end churn prediction system built to identify high-risk users before disengagement. The project involves exploratory data analysis, behavioral feature extraction, model comparison, threshold optimization, and explainability-focused evaluation to align predictions with business decisions.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'MLflow', 'Plotly'],
    images: [
      {
        id: '2-1',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1080&q=80&fit=crop',
        alt: 'Data analysis workflow',
        aspectRatio: 'landscape'
      },
      {
        id: '2-2',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080&q=80&fit=crop',
        alt: 'Churn analytics dashboard',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '3',
    title: 'Generative & Agentic AI Systems',
    category: 'generative-ai',
    year: '2024',
    slug: 'generative-agentic-ai',
    // Photo by Google DeepMind on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1080&q=80&fit=crop',
    description: 'Projects involving generative AI and agent-based workflows, including intelligent automation, reasoning pipelines, and LLM-powered decision agents. Focuses on reliability, controllability, and practical deployment.',
    technologies: ['Python', 'PyTorch', 'LangChain', 'OpenAI API', 'FastAPI', 'Docker'],
    images: [
      {
        id: '3-1',
        src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1080&q=80&fit=crop',
        alt: 'AI neural network visualization',
        aspectRatio: 'landscape'
      },
      {
        id: '3-2',
        src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1080&q=80&fit=crop',
        alt: 'Generative AI systems',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '4',
    title: 'Neuro-Vitals (Health Monitoring)',
    category: 'computer-vision',
    year: '2023',
    slug: 'neuro-vitals',
    // Photo by National Cancer Institute on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1080&q=80&fit=crop',
    description: 'A non-invasive health profiling system utilizing computer vision. It analyzes video feeds to extract physiological data and monitor patient vitals without physical contact.',
    technologies: ['Python', 'OpenCV', 'PyTorch', 'MediaPipe', 'NumPy', 'Flask'],
    images: [
      {
        id: '4-1',
        src: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1080&q=80&fit=crop',
        alt: 'Health monitoring interface',
        aspectRatio: 'landscape'
      },
      {
        id: '4-2',
        src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1080&q=80&fit=crop',
        alt: 'Medical data visualization',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '5',
    title: 'VisionGuard CCTV (Computer Vision)',
    category: 'computer-vision',
    year: '2023',
    slug: 'visionguard-cctv',
    // Photo by Scott Webb on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1080&q=80&fit=crop',
    description: 'An automated computer vision system for CCTV feeds designed to detect specific objects and anomalies in real-time for security monitoring.',
    technologies: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'TensorRT', 'Docker'],
    images: [
      {
        id: '5-1',
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1080&q=80&fit=crop',
        alt: 'Security monitoring system',
        aspectRatio: 'landscape'
      },
      {
        id: '5-2',
        src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1080&q=80&fit=crop',
        alt: 'Computer vision detection',
        aspectRatio: 'landscape'
      }
    ]
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};
