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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await res.json();
      if (result.success) { toast.success('Message sent! We\'ll get back to you within 24 hours.'); reset(); }
      else { toast.error(result.error || 'Failed to send message.'); }
    } catch { toast.error('Something went wrong.'); }
    finally { setIsSubmitting(false); }
  };

  const email = siteSettings?.email || 'hello@webring.studio';

  return (
    <div className="pt-20">
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="grain-overlay" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.span className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)] mb-6 block" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>// Contact</motion.span>
          <motion.h1 className="font-display font-black uppercase tracking-tight text-display-xl mb-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Let&#39;s talk.
          </motion.h1>
          <motion.p className="font-body text-[var(--muted)] text-lg max-w-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            Have a project in mind? Drop us a line and we&#39;ll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              {[
                { icon: <Mail className="w-4 h-4 text-[var(--accent)]" />, title: 'Email', content: <a href={`mailto:${email}`} className="font-body text-[var(--muted)] hover:text-[var(--accent)] transition-colors">{email}</a> },
                ...(siteSettings?.whatsapp ? [{ icon: <MessageSquare className="w-4 h-4 text-[var(--accent)]" />, title: 'WhatsApp', content: <span className="font-body text-[var(--muted)]">{siteSettings.whatsapp}</span> }] : []),
                { icon: <Clock className="w-4 h-4 text-[var(--accent)]" />, title: 'Response Time', content: <span className="font-body text-[var(--muted)]">Within 24 hours</span> },
                { icon: <MapPin className="w-4 h-4 text-[var(--accent)]" />, title: 'Location', content: <span className="font-body text-[var(--muted)]">{siteSettings?.location || 'Bangladesh — Available Worldwide'}</span> },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full rounded-[2rem] bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-display font-black uppercase text-lg mb-1">{item.title}</h3>
                    {item.content}
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                {[
                  { href: siteSettings?.instagramUrl || '#', icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
                  { href: siteSettings?.facebookUrl || '#', icon: <Facebook className="w-4 h-4" />, label: 'Facebook' },
                  { href: siteSettings?.linkedinUrl || '#', icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-full rounded-[2rem] transition-all" aria-label={s.label}>{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { id: 'contact-name', label: 'Name *', reg: 'name' as const, placeholder: 'Your name', type: 'text' },
                    { id: 'contact-email', label: 'Email *', reg: 'email' as const, placeholder: 'you@example.com', type: 'email' },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="font-body text-sm text-[var(--text)] mb-2 block">{f.label}</label>
                      <input id={f.id} type={f.type} {...register(f.reg)} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-full rounded-[2rem] px-4 py-3 font-body text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder={f.placeholder} />
                      {errors[f.reg] && <p className="text-red-500 text-xs mt-1 font-body">{errors[f.reg]?.message}</p>}
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="contact-subject" className="font-body text-sm text-[var(--text)] mb-2 block">Subject *</label>
                  <input id="contact-subject" {...register('subject')} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-full rounded-[2rem] px-4 py-3 font-body text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="What is this about?" />
                  {errors.subject && <p className="text-red-500 text-xs mt-1 font-body">{errors.subject.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-service" className="font-body text-sm text-[var(--text)] mb-2 block">Service *</label>
                  <select id="contact-service" {...register('service')} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-full rounded-[2rem] px-4 py-3 font-body text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors">
                    <option value="">Select a service</option>
                    <option value="AI Product Photography">AI Product Photography</option>
                    <option value="Lifestyle Photography">Lifestyle Photography</option>
                    <option value="E-commerce Visual Package">E-commerce Visual Package</option>
                    <option value="AI Image & Video Content">AI Image & Video Content</option>
                    <option value="Brand Identity & Branding">Brand Identity & Branding</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1 font-body">{errors.service.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-message" className="font-body text-sm text-[var(--text)] mb-2 block">Message *</label>
                  <textarea id="contact-message" {...register('message')} rows={5} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-full rounded-[2rem] px-4 py-3 font-body text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none" placeholder="Tell us about your project..." />
                  {errors.message && <p className="text-red-500 text-xs mt-1 font-body">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} id="contact-submit" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-[var(--accent-text)] font-body text-sm font-extrabold uppercase rounded-full rounded-[2rem] hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all disabled:opacity-50">
                  {isSubmitting ? (<><div className="w-4 h-4 border-2 border-[var(--accent-text)] border-t-transparent rounded-full animate-spin" />Sending...</>) : (<><Send className="w-4 h-4" />Send Message</>)}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
