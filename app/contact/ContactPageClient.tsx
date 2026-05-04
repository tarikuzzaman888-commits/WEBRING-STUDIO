'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Mail, MessageSquare, Clock, MapPin, Instagram, Facebook, Linkedin, Send } from 'lucide-react';
import type { SiteSettings } from '@/lib/types';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject is required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactPageClientProps {
  siteSettings: SiteSettings | null;
}

export default function ContactPageClient({ siteSettings }: ContactPageClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Message sent! We\'ll get back to you within 24 hours.');
        reset();
      } else {
        toast.error(result.error || 'Failed to send message. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const email = siteSettings?.email || 'hello@webring.studio';

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="grain-overlay" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.span
            className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-6 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Contact
          </motion.span>
          <motion.h1
            className="font-display text-display-xl mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Let&#39;s talk.
          </motion.h1>
          <motion.p
            className="font-body text-muted text-lg max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Have a project in mind? Drop us a line and we&#39;ll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Split Layout */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-1">Email</h3>
                  <a href={`mailto:${email}`} className="font-body text-muted hover:text-accent transition-colors">
                    {email}
                  </a>
                </div>
              </div>

              {siteSettings?.whatsapp && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-1">WhatsApp</h3>
                    <p className="font-body text-muted">{siteSettings.whatsapp}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-1">Response Time</h3>
                  <p className="font-body text-muted">Within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-1">Location</h3>
                  <p className="font-body text-muted">
                    {siteSettings?.location || 'Bangladesh — Available Worldwide'}
                  </p>
                </div>
              </div>

              {/* Socials */}
              <div className="flex gap-3 pt-4">
                {(siteSettings?.instagramUrl || true) && (
                  <a
                    href={siteSettings?.instagramUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {(siteSettings?.facebookUrl || true) && (
                  <a
                    href={siteSettings?.facebookUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {(siteSettings?.linkedinUrl || true) && (
                  <a
                    href={siteSettings?.linkedinUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="font-body text-sm text-foreground mb-2 block">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      {...register('name')}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 font-body">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="font-body text-sm text-foreground mb-2 block">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      {...register('email')}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 font-body">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="font-body text-sm text-foreground mb-2 block">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    {...register('subject')}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                    placeholder="What is this about?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1 font-body">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-service" className="font-body text-sm text-foreground mb-2 block">
                    Service *
                  </label>
                  <select
                    id="contact-service"
                    {...register('service')}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="AI Product Photography">AI Product Photography</option>
                    <option value="Lifestyle Photography">Lifestyle Photography</option>
                    <option value="E-commerce Visual Package">E-commerce Visual Package</option>
                    <option value="AI Image & Video Content">AI Image & Video Content</option>
                    <option value="Brand Identity & Branding">Brand Identity & Branding</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-xs mt-1 font-body">{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="font-body text-sm text-foreground mb-2 block">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    {...register('message')}
                    rows={5}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 font-body">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="contact-submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-[#0A0A0A] font-body text-sm font-medium rounded-full hover:shadow-lg hover:shadow-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
