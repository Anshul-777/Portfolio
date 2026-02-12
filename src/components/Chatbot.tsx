import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { projects } from '@/data/projects';
import { photographerInfo } from '@/data/photographer';
import { techStack } from '@/data/techStack';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GEMINI_API_KEY = 'AIzaSyDrEY0e3nWr3kqwj2MiNkY4Tz5LVtxyg4s';

function buildSystemPrompt(projectSlug?: string) {
  const projectsInfo = projects.map(p => 
    `- ${p.title} (${p.category}, ${p.year}): ${p.description} Technologies: ${p.technologies?.join(', ')}. ${p.detailedDescription ? `Overview: ${p.detailedDescription.overview} Core Concept: ${p.detailedDescription.coreConcept} Technical Approach: ${p.detailedDescription.technicalApproach}` : ''}`
  ).join('\n');

  const techInfo = techStack.map(c => `${c.name}: ${c.items.join(', ')}`).join('\n');

  const currentProject = projectSlug ? projects.find(p => p.slug === projectSlug) : null;
  const projectContext = currentProject ? `\n\nThe user is currently viewing the project "${currentProject.title}". Prioritize answering questions about this project, but you can also answer about other projects and Anshul's skills.` : '';

  return `You are Anshul Rathod's portfolio assistant. You help visitors learn about Anshul's projects, skills, and experience. Be professional, friendly, and concise.

About Anshul:
- Name: ${photographerInfo.name}
- Role: ${photographerInfo.tagline}
- Email: ${photographerInfo.email}
- Status: ${photographerInfo.status}
- Bio: ${photographerInfo.biography}

Tech Stack:
${techInfo}

Projects:
${projectsInfo}
${projectContext}

Guidelines:
- Answer questions about Anshul's projects, skills, tech stack, and experience accurately.
- If asked about something you don't know about Anshul, say so politely.
- Keep responses concise but informative. Use markdown formatting when helpful.
- For contact inquiries, direct them to the contact page or email.
- Do not make up information that isn't provided above.
- Be enthusiastic about the work but stay grounded and factual.`;
}

function getSuggestedQuestions(projectSlug?: string): string[] {
  if (projectSlug) {
    const project = projects.find(p => p.slug === projectSlug);
    if (project) {
      const questionMap: Record<string, string[]> = {
        'aegispay-fraud-detection': [
          'How does the risk scoring work?',
          'What ML models are used for fraud detection?',
          'How does it handle real-time transactions?',
        ],
        'neuro-vx-cognitive-health': [
          'What cognitive metrics does it measure?',
          'How does the predictive scoring work?',
          'What micro-assessments are included?',
        ],
        'churn-prediction': [
          'How is churn probability calculated?',
          'What behavioral signals does it track?',
          'How does it help with retention strategy?',
        ],
        'visionguard-cctv': [
          'What object detection model is used?',
          'How does it handle real-time processing?',
          'What types of anomalies can it detect?',
        ],
      };
      return questionMap[projectSlug] || ['Tell me about this project'];
    }
  }
  return [
    "What projects has Anshul built?",
    "What's Anshul's tech stack?",
    "Is Anshul available for work?",
  ];
}

interface ChatbotProps {
  projectSlug?: string;
  autoOpen?: boolean;
  onClose?: () => void;
}

export function Chatbot({ projectSlug, autoOpen = false, onClose }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! 👋 I'm Anshul's portfolio assistant. How can I help you today? Feel free to ask about any projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (autoOpen) setIsOpen(true);
  }, [autoOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: buildSystemPrompt(projectSlug) }] },
            contents: [...messages, userMsg].map(m => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }]
            })),
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
          }),
        }
      );

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const suggestedQuestions = getSuggestedQuestions(projectSlug);

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            aria-label="Open chatbot"
          >
            <Bot className="size-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-accent/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
                  <Bot className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Portfolio Assistant</p>
                  <p className="text-xs text-muted-foreground">Ask me anything</p>
                </div>
              </div>
              <button onClick={handleClose} className="p-1 rounded-sm hover:bg-accent transition-colors">
                <X className="size-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-foreground text-background rounded-br-md'
                      : 'bg-accent text-foreground rounded-bl-md'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm prose-invert max-w-none [&>p]:m-0 [&>ul]:m-0 [&>ol]:m-0">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-accent px-4 py-3 rounded-2xl rounded-bl-md">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-accent transition-colors text-muted-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-accent/50 border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-opacity"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
