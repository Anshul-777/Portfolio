// Map tech names to their CDN icon URLs (devicon / simple-icons via jsDelivr)
// Using https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ for consistency

const d = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const si = 'https://cdn.simpleicons.org';

export const techIcons: Record<string, string> = {
  // Languages
  Python: `${d}/python/python-original.svg`,
  'C++': `${d}/cplusplus/cplusplus-original.svg`,
  HTML5: `${d}/html5/html5-original.svg`,
  CSS3: `${d}/css3/css3-original.svg`,
  TypeScript: `${d}/typescript/typescript-original.svg`,

  // Web / App
  'Node.js': `${d}/nodejs/nodejs-original.svg`,
  'Express.js': `${d}/express/express-original.svg`,
  FastAPI: `${d}/fastapi/fastapi-original.svg`,
  'React Native': `${d}/react/react-original.svg`,
  Angular: `${d}/angular/angular-original.svg`,
  Vercel: `${si}/vercel/ffffff`,
  Vite: `${d}/vitejs/vitejs-original.svg`,
  TailwindCSS: `${d}/tailwindcss/tailwindcss-original.svg`,

  // Data & ML
  PyTorch: `${d}/pytorch/pytorch-original.svg`,
  NumPy: `${d}/numpy/numpy-original.svg`,
  Pandas: `${d}/pandas/pandas-original.svg`,
  'Scikit-learn': `${si}/scikitlearn`,
  Matplotlib: `${si}/matplotlib`,
  Plotly: `${si}/plotly`,
  MLflow: `${si}/mlflow`,
  Anaconda: `${d}/anaconda/anaconda-original.svg`,

  // Database & Cloud
  AWS: `${d}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  Firebase: `${d}/firebase/firebase-original.svg`,
  PostgreSQL: `${d}/postgresql/postgresql-original.svg`,
  MySQL: `${d}/mysql/mysql-original.svg`,
  Docker: `${d}/docker/docker-original.svg`,
  'Apache Kafka': `${si}/apachekafka`,

  // Tools
  Git: `${d}/git/git-original.svg`,
  GitHub: `${d}/github/github-original.svg`,
};
