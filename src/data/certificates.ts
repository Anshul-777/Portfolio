import ibmBadge from '@/assets/certificates/ibm-ai-badge.jpg';
import ibmCert from '@/assets/certificates/ibm-ai-certificate.jpg';
import googleAdkAgents from '@/assets/certificates/google-adk-agents.jpg';
import googleAdkFirst from '@/assets/certificates/google-adk-first-agent.jpg';
import nxtwaveGenai from '@/assets/certificates/nxtwave-genai.jpg';
import sihHackathon from '@/assets/certificates/sih-hackathon.jpg';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  date: string;
  image: string;
  badgeImage?: string;
  category: 'badge' | 'certificate' | 'hackathon';
  verifyUrl?: string;
  credlyProfile?: string;
  highlights: string[];
  description: string;
}

export const certificates: Certificate[] = [
  {
    id: 'ibm-ai-fundamentals',
    title: 'AI Fundamentals: Foundations for Understanding AI',
    issuer: 'IBM SkillsBuild',
    date: '21 February 2026',
    image: ibmCert,
    badgeImage: ibmBadge,
    category: 'badge',
    verifyUrl: 'https://www.credly.com/go/F1cWvV8x',
    credlyProfile: 'https://www.credly.com/users/anshul-rathod.37fcdcf5',
    highlights: [
      'Machine Learning & Deep Learning',
      'Neural Networks & Generative AI',
      'NLP & Computer Vision',
      'AI Ethics & Responsible AI',
    ],
    description:
      'Comprehensive program covering the technical and practical foundations of artificial intelligence — from Machine Learning algorithms and Neural Networks to Generative AI mechanics and AI Ethics. Covers NLP, Computer Vision, and responsible AI development practices.',
  },
  {
    id: 'google-adk-agents',
    title: 'Build Agents with Agent Development Kit (ADK)',
    issuer: 'Google Cloud',
    date: '2026',
    image: googleAdkAgents,
    category: 'badge',
    credlyProfile: 'https://www.credly.com/users/anshul-rathod.37fcdcf5',
    highlights: [
      'Designing intelligent AI agents',
      'Scalable agent architectures',
      'Google Cloud ecosystem integration',
      'Autonomous workflow orchestration',
    ],
    description:
      'Hands-on completion badge from Google Cloud for designing, building, and deploying intelligent agents using the Agent Development Kit. Covers scalable agent architectures and integration with Google Cloud services for next-gen automation.',
  },
  {
    id: 'google-adk-first-agent',
    title: 'Build Your First Agent with ADK',
    issuer: 'Google Cloud',
    date: '2026',
    image: googleAdkFirst,
    category: 'badge',
    credlyProfile: 'https://www.credly.com/users/anshul-rathod.37fcdcf5',
    highlights: [
      'Agent Development Kit fundamentals',
      'Goal-oriented AI agents',
      'Cloud-powered automation',
      'Practical agent deployment',
    ],
    description:
      'Foundational completion badge for building a first autonomous agent with Google Cloud\'s ADK. Covers agent design principles, goal-oriented planning, and deployment on Google Cloud infrastructure.',
  },
  {
    id: 'nxtwave-genai',
    title: 'AI for Students: Build Your Own Generative AI Model',
    issuer: 'NxtWave',
    date: '11 October 2024',
    image: nxtwaveGenai,
    category: 'certificate',
    highlights: [
      'Generative model architecture',
      'LLM internals & fine-tuning',
      'Hands-on model building',
      'Strategic AI problem-solving',
    ],
    description:
      'Workshop led by Abhinav Devaguptapu covering generative model architecture, LLM internals, and practical implementation of custom AI solutions. Focuses on moving beyond theory to build intelligent, adaptive systems from scratch.',
  },
  {
    id: 'sih-2025',
    title: 'Smart India Internal Hackathon 2025',
    issuer: 'G H Raisoni University & IIC',
    date: '25 September 2025',
    image: sihHackathon,
    category: 'hackathon',
    highlights: [
      'Blockchain-based Blue Carbon Registry',
      'Digital MRV framework',
      'Immutable carbon-credit ledger',
      'Climate data modelling',
    ],
    description:
      'Participation certificate for developing a Blockchain-based Blue Carbon Registry and MRV System at the national-level Smart India Hackathon. The solution brought transparency to coastal carbon markets through decentralized registries, automated MRV, and immutable environmental auditing.',
  },
];
