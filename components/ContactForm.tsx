'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader2, Check, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.enum(['General Inquiry', 'Product Demo', 'Partnership', 'Engineering Services', 'Purchase Order', 'Other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  defaultValues?: {
    subject?: string;
    message?: string;
  };
}

const inputClass =
  "w-full bg-white border border-black/15 px-4 py-3 font-['JetBrains_Mono'] text-sm text-[#0A0A0A] placeholder:text-[#0A0A0A]/35 outline-none transition focus:border-[#0A0A0A] focus:ring-0";

const labelClass =
  "block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.22em] text-[#0A0A0A]/55 mb-2";

export function ContactForm({ defaultValues }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validSubjects = ['General Inquiry', 'Product Demo', 'Partnership', 'Engineering Services', 'Purchase Order', 'Other'] as const;
  const defaultSubject = validSubjects.find(s => s === defaultValues?.subject) ?? 'General Inquiry';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: defaultSubject,
      message: defaultValues?.message ?? '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 6000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label className={labelClass}>Full Name *</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Your name"
          className={inputClass}
        />
        {errors.name && (
          <p className="mt-1 font-['JetBrains_Mono'] text-[0.6rem] text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email Address *</label>
        <input
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          className={inputClass}
        />
        {errors.email && (
          <p className="mt-1 font-['JetBrains_Mono'] text-[0.6rem] text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className={labelClass}>Phone / WhatsApp</label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="e.g. 09160655652"
          className={inputClass}
        />
      </div>

      {/* Company */}
      <div>
        <label className={labelClass}>Company / Organization</label>
        <input
          {...register('company')}
          type="text"
          placeholder="Your company (optional)"
          className={inputClass}
        />
      </div>

      {/* Subject */}
      <div>
        <label className={labelClass}>Subject *</label>
        <select
          {...register('subject')}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Product Demo">Product Demo</option>
          <option value="Partnership">Partnership</option>
          <option value="Engineering Services">Engineering Services</option>
          <option value="Purchase Order">Purchase Order</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && (
          <p className="mt-1 font-['JetBrains_Mono'] text-[0.6rem] text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          {...register('message')}
          placeholder="Tell us about your project or inquiry..."
          rows={6}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p className="mt-1 font-['JetBrains_Mono'] text-[0.6rem] text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 border border-black/10 bg-[#C8F135]/30 px-4 py-3"
        >
          <Check className="h-4 w-4 shrink-0 text-[#0A0A0A]" />
          <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.18em] text-[#0A0A0A]">
            Message sent Ã¢â‚¬â€ we&apos;ll get back to you soon.
          </p>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 border border-red-200 bg-red-50 px-4 py-3"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.18em] text-red-700">
            {errorMessage || 'Failed to send. Please try again.'}
          </p>
        </motion.div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 border border-black bg-[#0A0A0A] px-6 py-4 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#C8F135] hover:text-[#0A0A0A] hover:border-[#C8F135] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
