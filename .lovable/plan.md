

# Portfolio Enhancement Plan - Anshul Rathod

## Overview
A comprehensive update adding real email delivery, star ratings, chatbot, resume download, better images, animations, and consolidated code structure.

---

## 1. Fix Contact Form (Real Email Delivery)
The contact form already uses Web3Forms API with access key `f2072dce-0c71-4352-8b4a-bd15013a1360`. It should send directly without opening email. The current fallback opens a mailto link on failure -- we will remove that fallback behavior and instead show an error toast. Messages will be sent directly to `anshulrathod999@gmail.com` via Web3Forms without any browser email client involvement.

## 2. Five-Star Rating & Feedback System
- Add a star rating widget to the Contact page (site-wide feedback)
- Users click 1-5 stars, optionally type a feedback message
- On submit, show a polite toast notification that varies by rating:
  - 5 stars: "Thank you so much! Your support means the world."
  - 4 stars: "Thank you! Glad you had a good experience."
  - 3 stars: "Thanks for your feedback. I'm always working to improve."
  - 2 stars: "I appreciate your honesty. I'll work on doing better."
  - 1 star: "I'm sorry to hear that. Your feedback helps me grow."
- Feedback is sent to the same email via Web3Forms

## 3. Fix About Page Background Image
- Change the About page image container from `aspect-[3/4]` to a full-width, auto-height layout using `object-contain` so the image with text is fully visible without cropping.

## 4. Project Cover Images (Unsplash)
Replace current project cover images with better-matching Unsplash photos:
- **AegisPay (Fraud Detection):** Shield/cybersecurity themed image
- **Neuro-VX (Cognitive Health):** Brain/neural network visualization
- **Customer Retention:** Business analytics/dashboard image
- **CCTV Monitoring:** Security camera/surveillance image

## 5. Resume Download Button
- Add a "Download Resume" button in the Hero section and About page
- Use a placeholder PDF path (`/resume.pdf`) -- user will upload their actual resume
- Show a toast notification on click: "Resume download started. Thank you for your interest!"

## 6. Per-Project Star Rating
- Add a 5-star rating widget at the bottom of each ProjectDetail page
- Same polite notification system as the site-wide feedback
- Optional message field
- Sent via Web3Forms with the project name included

## 7. "Ask Chatbot" Button on Project Pages
- Add an "Ask about this project" button at the bottom of each ProjectDetail page
- Clicking opens the chatbot window pre-loaded with context about that specific project
- Show 3-4 suggested questions relevant to the project

## 8. AI Chatbot (Gemini API)
- Floating round chatbot icon fixed to bottom-right corner on all pages
- Clean chat window with smooth open/close animation
- Uses the provided Gemini API key: `AIzaSyDrEY0e3nWr3kqwj2MiNkY4Tz5LVtxyg4s`
- Calls the Gemini API directly from client (as requested)
- System prompt engineered to:
  - Greet with a friendly "Hello! I'm Anshul's portfolio assistant. How can I help you today?"
  - Answer questions about Anshul's projects, skills, tech stack, and experience
  - Provide context-aware answers when opened from a specific project page
  - Handle common inquiries (availability, contact info, project details)
  - Stay professional and on-topic
- Features: message history within session, typing indicator, suggested questions

## 9. Page Transitions
- Already have `AnimatePresence` and `PageTransition` component in place
- Ensure all route changes have smooth fade/slide transitions (already configured)

## 10. Consolidate Components Into Pages
Inline the following small components directly into their parent pages to reduce file count:
- `TechStack.tsx` content inlined into Home.tsx and About.tsx
- `ProjectCard.tsx` content inlined into Home.tsx and Portfolio.tsx
- `ContactForm.tsx` content inlined into Contact.tsx
- `ScrollReveal.tsx` kept as shared utility (used everywhere)
- `SEOHead.tsx` kept as shared utility
- Layout components (Header, Footer) kept separate as they wrap all pages

## 11. Additional Features
- **Scroll-to-top** button that appears when scrolling down
- **Typing animation** on the hero headline for visual interest
- **Project count badge** in the Portfolio page header

---

## Technical Details

### New Files
- None created separately -- chatbot, ratings, and resume button will be built directly into existing page files and App.tsx (for the global chatbot)

### Modified Files
| File | Changes |
|------|---------|
| `src/App.tsx` | Add global Chatbot component |
| `src/pages/Home.tsx` | Inline TechStack and ProjectCard, add resume button, scroll-to-top |
| `src/pages/About.tsx` | Fix image sizing, inline TechStack, add resume button |
| `src/pages/Contact.tsx` | Inline ContactForm, add star rating feedback section |
| `src/pages/Portfolio.tsx` | Inline ProjectCard |
| `src/pages/ProjectDetail.tsx` | Add per-project rating, "Ask Chatbot" button |
| `src/data/projects.ts` | Update cover image URLs |
| `src/components/forms/ContactForm.tsx` | Remove mailto fallback, add error toast |

### API Integration
- **Web3Forms**: Continues using existing access key for contact and feedback emails
- **Gemini API**: Direct client-side calls to `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent` with the provided API key

### Security Note
The Gemini API key will be stored in the client-side code as requested. For production use, it would be better to route this through a backend/edge function, but the current setup will work for portfolio purposes.

