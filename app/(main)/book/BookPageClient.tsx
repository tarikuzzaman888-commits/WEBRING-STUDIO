'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { toast } from 'sonner';
import { Check, ArrowRight, ArrowLeft, Calendar, Clock, User, Sparkles, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { formatDate } from '@/lib/utils';
import type { Service, AvailableDates, TeamMember } from '@/lib/types';
import PhoneInput from '@/components/shared/PhoneInput';
import EmailInput from '@/components/shared/EmailInput';

const fallbackServices = [
  'AI Product Photography',
  'Lifestyle Photography (AI)',
  'E-commerce Visual Package',
  'AI Image & Video Content',
  'Brand Identity & Branding',
];

const productCategories = [
  'Jewelry', 'Furniture', 'Supplements', 'Clothing',
  'Dropshipping', 'Food & Beverage', 'Cosmetics', 'Electronics', 'Other',
];

const budgetRanges = [
  'Under $200', '$200 - $500', '$500 - $1,000',
  '$1,000 - $3,000', '$3,000+', 'Not sure yet',
];

const referralSources = [
  'Google Search', 'Instagram', 'Facebook', 'LinkedIn',
  'Referral from a friend', 'Behance/Dribbble', 'Other',
];

const fallbackTimeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

interface BookPageClientProps {
  services: Service[] | null;
  availableDates: AvailableDates | null;
  team: TeamMember[] | null;
}

export default function BookPageClient({ services, availableDates, team }: BookPageClientProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [productCategory, setProductCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [company, setCompany] = useState('');
  const [referral, setReferral] = useState('');

  const serviceNames = services && services.length > 0
    ? services.map(s => s.title)
    : fallbackServices;

  const timeSlots = availableDates?.timeSlots && availableDates.timeSlots.length > 0
    ? availableDates.timeSlots
    : fallbackTimeSlots;

  const availableDatesList = availableDates?.dates?.map(d => new Date(d)) || [];

  const toggleService = (name: string) => {
    setSelectedServices(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedServices.length > 0;
      case 2: return productCategory && budget;
      case 3: return selectedDate && selectedTime;
      case 4: return clientName.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          email,
          whatsapp,
          company,
          services: selectedServices,
          productCategory,
          budget,
          notes,
          selectedDate: selectedDate?.toISOString().split('T')[0],
          selectedTime,
          referral,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setIsSuccess(true);
        // Save email for next time
        localStorage.setItem('webring_saved_email', email);
        toast.success('Booking confirmed! Check your email for details.');
      } else {
        toast.error(result.error || 'Failed to submit booking.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load saved email on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('webring_saved_email');
      if (savedEmail) {
        setEmail(savedEmail);
      }
    }
  });

  if (isSuccess) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center max-w-md px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-accent" />
          </div>
          <h1 className="font-display text-display-md mb-4">You&#39;re booked!</h1>
          <p className="font-body text-muted text-lg mb-2">
            We&#39;ve sent a confirmation to <span className="text-accent">{email}</span>.
          </p>
          <p className="font-body text-muted mb-8">
            {selectedDate && formatDate(selectedDate.toISOString())} at {selectedTime}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-[#0A0A0A] font-body text-sm font-medium rounded-full"
          >
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Panel */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h1 className="font-display text-display-md mb-4">
                Book a Free<br />
                <span className="text-gradient">Strategy Call</span>
              </h1>
              <p className="font-body text-muted mb-8">
                30-minute consultation to discuss your brand vision and create a visual strategy.
              </p>

              {/* What to expect */}
              <div className="space-y-4 mb-8">
                <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-accent">What to expect</h3>
                {[
                  'Understand your brand & goals',
                  'Review your current visuals',
                  'Recommend the best package',
                  'Set timeline & deliverables',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="font-body text-sm text-muted">{item}</span>
                  </div>
                ))}
              </div>

              {/* Team Avatars */}
              {team && team.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-muted mb-3">Your Team</h3>
                  <div className="flex -space-x-3">
                    {team.slice(0, 3).map((member) => (
                      <div
                        key={member._id}
                        className="relative w-10 h-10 rounded-full border-2 border-background bg-surface overflow-hidden"
                        title={member.name}
                      >
                        {member.photo?.asset ? (
                          <Image
                            src={urlFor(member.photo).width(80).height(80).url()}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-4 h-4 text-muted" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Indicator */}
              <div className="mt-10 flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      s <= step ? 'bg-accent' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
              <p className="font-mono text-xs text-muted mt-2">Step {step} of 5</p>
            </div>
          </div>

          {/* Right — Form Steps */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl mb-2">Select Services</h2>
                  <p className="font-body text-muted mb-8">Choose one or more services you&#39;re interested in.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {serviceNames.map((name) => (
                      <button
                        key={name}
                        onClick={() => toggleService(name)}
                        className={`text-left p-6 rounded-xl border transition-all duration-300 ${
                          selectedServices.includes(name)
                            ? 'border-accent bg-accent/5 shadow-lg shadow-accent/10'
                            : 'border-border hover:border-accent/40'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-display text-lg text-foreground">{name}</span>
                          {selectedServices.includes(name) && (
                            <Check className="w-5 h-5 text-accent flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Project Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl mb-2">Project Details</h2>
                  <p className="font-body text-muted mb-8">Tell us more about your project.</p>
                  <div className="space-y-6">
                    <div>
                      <label className="font-body text-sm text-foreground mb-2 block">
                        Product Category *
                      </label>
                      <select
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="w-full bg-surface border border-border rounded-[2rem] px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                      >
                        <option value="">Select category</option>
                        {productCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-body text-sm text-foreground mb-2 block">
                        Budget Range *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {budgetRanges.map((range) => (
                          <button
                            key={range}
                            onClick={() => setBudget(range)}
                            className={`px-4 py-3 rounded-[2rem] border text-sm font-body transition-all ${
                              budget === range
                                ? 'border-accent bg-accent/5 text-accent'
                                : 'border-border text-muted hover:border-accent/40'
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-body text-sm text-foreground mb-2 block">
                        Additional Notes
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        className="w-full bg-surface border border-border rounded-[2rem] px-4 py-3 font-body text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                        placeholder="Any specific requirements, reference links, or details..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl mb-2">Pick a Date & Time</h2>
                  <p className="font-body text-muted mb-8">Select your preferred date and time for the call.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span className="font-mono text-xs tracking-wider uppercase text-muted">Select Date</span>
                      </div>
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={[
                          { dayOfWeek: [0, 6] },
                          { before: new Date() },
                        ]}
                        modifiers={
                          availableDatesList.length > 0
                            ? { available: availableDatesList }
                            : undefined
                        }
                        className="font-body"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="font-mono text-xs tracking-wider uppercase text-muted">Select Time (GMT+6)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`px-4 py-3 rounded-[2rem] border text-sm font-body transition-all ${
                              selectedTime === slot
                                ? 'border-accent bg-accent/5 text-accent'
                                : 'border-border text-muted hover:border-accent/40'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Personal Info */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl mb-2">Your Information</h2>
                  <p className="font-body text-muted mb-8">How can we reach you?</p>
                  <div className="space-y-6 max-w-lg">
                    <div>
                      <label className="font-body text-sm text-foreground mb-2 block">Full Name *</label>
                      <input
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-surface border border-border rounded-[2rem] px-4 py-3 font-body text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-foreground mb-2 block">Email *</label>
                      <EmailInput
                        id="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-foreground mb-2 block">WhatsApp (optional)</label>
                      <PhoneInput
                        id="whatsapp"
                        value={whatsapp}
                        onChange={setWhatsapp}
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-foreground mb-2 block">Company (optional)</label>
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-surface border border-border rounded-[2rem] px-4 py-3 font-body text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-foreground mb-2 block">How did you find us?</label>
                      <select
                        value={referral}
                        onChange={(e) => setReferral(e.target.value)}
                        className="w-full bg-surface border border-border rounded-[2rem] px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                      >
                        <option value="">Select source</option>
                        {referralSources.map((src) => (
                          <option key={src} value={src}>{src}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Confirmation */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl mb-2">Confirm Your Booking</h2>
                  <p className="font-body text-muted mb-8">Review your details before submitting.</p>

                  <div className="space-y-6 bg-surface border border-border rounded-xl p-6 md:p-8">
                    <div>
                      <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-2">Services</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedServices.map((s) => (
                          <span key={s} className="font-body text-sm bg-accent/10 text-accent px-3 py-1 rounded-full">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-1">Category</h3>
                        <p className="font-body text-sm text-foreground">{productCategory}</p>
                      </div>
                      <div>
                        <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-1">Budget</h3>
                        <p className="font-body text-sm text-foreground">{budget}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-1">Date</h3>
                        <p className="font-body text-sm text-foreground">
                          {selectedDate ? formatDate(selectedDate.toISOString()) : 'Not selected'}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-1">Time</h3>
                        <p className="font-body text-sm text-foreground">{selectedTime} GMT+6</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-1">Name</h3>
                        <p className="font-body text-sm text-foreground">{clientName}</p>
                      </div>
                      <div>
                        <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-1">Email</h3>
                        <p className="font-body text-sm text-foreground">{email}</p>
                      </div>
                    </div>

                    {(whatsapp || company) && (
                      <div className="grid grid-cols-2 gap-4">
                        {whatsapp && (
                          <div>
                            <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-1">WhatsApp</h3>
                            <p className="font-body text-sm text-foreground">{whatsapp}</p>
                          </div>
                        )}
                        {company && (
                          <div>
                            <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-1">Company</h3>
                            <p className="font-body text-sm text-foreground">{company}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {notes && (
                      <div>
                        <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-1">Notes</h3>
                        <p className="font-body text-sm text-foreground">{notes}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-body text-sm rounded-full hover:border-accent transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  onClick={() => canProceed() && setStep(step + 1)}
                  disabled={!canProceed()}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-[#0A0A0A] font-body text-sm font-medium rounded-full hover:shadow-lg hover:shadow-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-[#0A0A0A] font-body text-sm font-medium rounded-full hover:shadow-lg hover:shadow-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Confirm Booking
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
