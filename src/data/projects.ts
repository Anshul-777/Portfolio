import type { Project } from '@/types';
import projectFraud from '@/assets/project-fraud.jpg';
import projectNeuro from '@/assets/project-neuro.jpg';
import projectChurn from '@/assets/project-churn.jpg';
import projectCctv from '@/assets/project-cctv.jpg';

export const projects: Project[] = [
  {
    id: '1',
    title: 'AegisPay – Fraud Detection Prototype',
    category: 'machine-learning',
    year: '2024',
    slug: 'aegispay-fraud-detection',
    coverImage: projectFraud,
    description: 'A simulated digital payment environment demonstrating real-time fraud detection through behavioral analytics and dynamic risk scoring.',
    technologies: ['Python', 'Scikit-learn', 'PyTorch', 'FastAPI', 'PostgreSQL', 'Docker'],
    images: [],
    detailedDescription: {
      overview: 'AegisPay is a simulated digital payment environment designed to demonstrate how fraud detection systems operate in real time. Rather than building a production payment gateway, the project creates a controlled sandbox where users can observe how financial risk intelligence works under the hood.',
      coreConcept: 'Each user is assigned ₹1,00,000 in virtual currency upon registration and can transfer funds to other AegisPay users. The platform intentionally allows users to perform suspicious activities — rapid transactions, unusually high-value transfers, activity from new devices, or multiple transfers in short time intervals. The objective is educational and analytical: instead of silently blocking fraud, the system calculates and displays a dynamic Risk Score for every transaction based on behavioral deviation.',
      technicalApproach: 'The backend processes transaction features and runs a scoring model that evaluates the probability of fraud. Risk is computed using behavioral signals such as transaction velocity, unusual spending patterns, device inconsistency, and account history. This approach demonstrates how real-world fraud detection combines behavioral analytics and probabilistic risk scoring, rather than relying on simple rule-based blocking.',
      prototype: 'The working prototype allows users to visually observe how risk increases when they behave abnormally. It simulates financial risk intelligence in a controlled environment, making complex fraud detection concepts tangible and understandable.',
      learningOutcomes: 'This project demonstrates how fraud scoring works in practice, how risk-based transaction monitoring operates, why behavioral patterns matter more than static rules, and how anomaly detection directly influences decision-making in financial systems.'
    }
  },
  {
    id: '2',
    title: 'Neuro-VX – Cognitive Risk Intelligence',
    category: 'data-science',
    year: '2024',
    slug: 'neuro-vx-cognitive-health',
    coverImage: projectNeuro,
    description: 'A prototype system demonstrating predictive cognitive health analysis using behavioral and response-based micro-assessments.',
    technologies: ['Python', 'OpenCV', 'PyTorch', 'MediaPipe', 'NumPy', 'Flask'],
    images: [],
    detailedDescription: {
      overview: 'Neuro-VX is a prototype system that demonstrates predictive cognitive health analysis using behavioral and response-based tests. The project explores how raw human interaction data can be transformed into measurable psychological indicators, offering a window into cognitive performance trends.',
      coreConcept: 'The concept behind Neuro-VX is that cognitive decline and burnout develop gradually and can be detected through measurable behavioral shifts. Instead of diagnosing medical conditions, the system models risk trends using statistical normalization and predictive scoring. The focus is on early risk anticipation rather than medical claims.',
      technicalApproach: 'The demo includes structured micro-assessments such as reaction time tests, attention tracking tasks, emotional response indicators, and simple physiological inputs. Based on user responses, the system calculates cognitive performance indicators including focus stability, stress index, fatigue probability, and neural response efficiency. The backend processes test metrics, standardizes values, and runs a predictive model that produces structured cognitive insights.',
      prototype: 'The prototype allows users to complete assessments and instantly see a cognitive profile generated from their responses. It demonstrates how behavioral signals can become predictive health intelligence without requiring invasive medical procedures.',
      learningOutcomes: 'This project illustrates how behavioral data can be systematically collected, normalized, and transformed into actionable cognitive insights. It highlights the potential of predictive analytics in health monitoring and the importance of non-invasive assessment methodologies.'
    }
  },
  {
    id: '3',
    title: 'Customer Retention Intelligence',
    category: 'data-science',
    year: '2024',
    slug: 'churn-prediction',
    coverImage: projectChurn,
    description: 'A behavioral analytics prototype demonstrating how businesses predict customer churn before it happens through engagement pattern analysis.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'MLflow', 'Plotly'],
    images: [],
    detailedDescription: {
      overview: 'This project is a behavioral analytics prototype that demonstrates how businesses predict customer churn before it happens. Built around a simulated subscription-based platform, it models the full lifecycle of user engagement and disengagement patterns.',
      coreConcept: 'The core insight driving this project is that churn is not sudden — it is the final stage of measurable disengagement. Users exhibit declining activity patterns across multiple signals: login frequency, transaction activity, support interactions, and engagement metrics. The system analyzes these behavioral patterns over time and generates a Churn Probability Score indicating the likelihood of a customer leaving the service.',
      technicalApproach: 'The backend aggregates historical behavioral signals and feeds them into a predictive classification model. The output includes both a churn probability score and a retention priority score, enabling businesses to allocate retention resources effectively. The system involves exploratory data analysis, behavioral feature extraction, model comparison, threshold optimization, and explainability-focused evaluation.',
      prototype: 'The demo allows observers to simulate user behavior changes and see how churn probability increases when engagement declines or complaints increase. This makes the abstract concept of predictive retention tangible and actionable.',
      learningOutcomes: 'This prototype demonstrates predictive retention strategy and risk-based customer analytics. It shows how combining behavioral signals with machine learning can transform reactive customer management into proactive retention intelligence.'
    }
  },
  {
    id: '4',
    title: 'Intelligent CCTV Monitoring',
    category: 'computer-vision',
    year: '2023',
    slug: 'visionguard-cctv',
    coverImage: projectCctv,
    description: 'A computer vision prototype for automated visual intelligence using CCTV footage with real-time object detection and motion tracking.',
    technologies: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'TensorRT', 'Docker'],
    images: [],
    detailedDescription: {
      overview: 'This project is a computer vision prototype designed to demonstrate automated visual intelligence using CCTV footage. It moves beyond passive recording to actively interpret visual scenes and convert them into structured, actionable intelligence.',
      coreConcept: 'The core concept is automated situational awareness. Traditional CCTV systems record footage for later review, requiring constant human monitoring. This system processes live or recorded video streams and performs object detection, motion tracking, and event flagging in real time — identifying people, vehicles, and unusual movement patterns automatically.',
      technicalApproach: 'The backend uses deep learning-based object detection models to process video frames and generate detection outputs. Tracking logic maintains object consistency across frames, ensuring reliable identification even as subjects move through the scene. The system is optimized for real-time performance using TensorRT acceleration.',
      prototype: 'The prototype allows users to upload or stream video and observe how the system detects objects, tracks movement, and highlights suspicious activity patterns. It provides a clear demonstration of how raw surveillance data can be transformed into structured security intelligence.',
      learningOutcomes: 'This project demonstrates how surveillance data can be transformed into actionable insights without constant human monitoring. It showcases the practical application of deep learning in security systems and the engineering challenges of real-time video processing.'
    }
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
