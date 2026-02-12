import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Loader2, CheckCircle2 } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { StarRating } from '@/components/StarRating';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(255),
  inquiryType: z.enum(['freelance', 'fulltime', 'collaboration', 'other'], { required_error: 'Please select an inquiry type' }),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', inquiryType: undefined, message: '' },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'f2072dce-0c71-4352-8b4a-bd15013a1360',
          name: data.name,
          email: data.email,
          inquiry_type: data.inquiryType,
          message: data.message,
          to: 'anshulrathod999@gmail.com',
          subject: `New ${data.inquiryType} inquiry from ${data.name}`,
          from_name: 'Portfolio Contact Form',
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        toast({ title: 'Failed to send', description: 'Please try again or email me directly.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Network error', description: 'Please check your connection and try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead title="Contact" description={`Get in touch with ${photographerInfo.name} for ML/AI projects, collaborations, and opportunities.`} />
      
      <div className="min-h-screen">
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div initial={{ opacity: 0.8, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">Get in Touch</h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">Let's discuss your next AI/ML project</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form - Inlined */}
              <motion.div className="space-y-6" initial={{ opacity: 0.8, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide">Send a Message</h2>
                  <p className="text-muted-foreground font-light">Fill out the form below and I'll get back to you within 24-48 hours.</p>
                </div>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div key="success" className="bg-accent border border-border rounded-sm p-8 text-center space-y-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
                        <CheckCircle2 className="size-16 mx-auto text-green-400" />
                      </motion.div>
                      <h3 className="text-2xl font-light tracking-wide">Message Sent!</h3>
                      <p className="text-muted-foreground font-light">Thank you for reaching out. I'll get back to you within 24-48 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-light tracking-wide">Name</FormLabel>
                              <FormControl><Input placeholder="Your full name" className="font-light" {...field} /></FormControl>
                              <FormMessage className="text-xs font-light" />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-light tracking-wide">Email</FormLabel>
                              <FormControl><Input type="email" placeholder="your.email@example.com" className="font-light" {...field} /></FormControl>
                              <FormMessage className="text-xs font-light" />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="inquiryType" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-light tracking-wide">Inquiry Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="font-light"><SelectValue placeholder="Select inquiry type" /></SelectTrigger></FormControl>
                                <SelectContent className="bg-popover z-50">
                                  <SelectItem value="freelance" className="font-light">Freelance Project</SelectItem>
                                  <SelectItem value="fulltime" className="font-light">Full-time Opportunity</SelectItem>
                                  <SelectItem value="collaboration" className="font-light">Collaboration</SelectItem>
                                  <SelectItem value="other" className="font-light">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs font-light" />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-light tracking-wide">Message</FormLabel>
                              <FormControl><Textarea placeholder="Tell me about your project or opportunity..." className="min-h-32 font-light resize-none" {...field} /></FormControl>
                              <FormMessage className="text-xs font-light" />
                            </FormItem>
                          )} />
                          <Button type="submit" className="w-full py-6 text-base font-light tracking-wide" disabled={isSubmitting}>
                            {isSubmitting ? <><Loader2 className="mr-2 size-5 animate-spin" /> Sending...</> : 'Send Message'}
                          </Button>
                        </form>
                      </Form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Contact Info + Rating */}
              <motion.div className="space-y-8" initial={{ opacity: 0.8, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide">Contact Information</h2>
                  <p className="text-muted-foreground font-light">Prefer to reach out directly? Here's how you can contact me.</p>
                </div>
                <Separator />
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-sm bg-accent"><Mail className="size-5 text-muted-foreground" /></div>
                    <div className="space-y-1">
                      <p className="text-sm font-light tracking-wide text-muted-foreground">Email</p>
                      <a href={`mailto:${photographerInfo.email}`} className="text-base md:text-lg font-light hover:text-muted-foreground transition-colors">{photographerInfo.email}</a>
                    </div>
                  </div>
                  {photographerInfo.socialLinks.linkedin && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-sm bg-accent"><Linkedin className="size-5 text-muted-foreground" /></div>
                      <div className="space-y-1">
                        <p className="text-sm font-light tracking-wide text-muted-foreground">LinkedIn</p>
                        <a href={photographerInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-light hover:text-muted-foreground transition-colors">linkedin.com/in/anshul-rathod</a>
                      </div>
                    </div>
                  )}
                  {photographerInfo.socialLinks.github && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-sm bg-accent"><Github className="size-5 text-muted-foreground" /></div>
                      <div className="space-y-1">
                        <p className="text-sm font-light tracking-wide text-muted-foreground">GitHub</p>
                        <a href={photographerInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-light hover:text-muted-foreground transition-colors">github.com/Anshul-777</a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-sm bg-accent"><MapPin className="size-5 text-muted-foreground" /></div>
                    <div className="space-y-1">
                      <p className="text-sm font-light tracking-wide text-muted-foreground">Location</p>
                      <p className="text-base md:text-lg font-light">{photographerInfo.location}</p>
                    </div>
                  </div>
                </div>

                {/* Star Rating Feedback */}
                <Separator />
                <ScrollReveal>
                  <div className="space-y-4">
                    <h3 className="text-xl font-light tracking-wide text-center">Rate My Portfolio</h3>
                    <p className="text-sm text-muted-foreground font-light text-center">Your feedback helps me improve!</p>
                    <StarRating context="Portfolio" />
                  </div>
                </ScrollReveal>
              </motion.div>
            </div>
          </div>
        </section>
        <div className="h-16" />
      </div>
    </>
  );
}
