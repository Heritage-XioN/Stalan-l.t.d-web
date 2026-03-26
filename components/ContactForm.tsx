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
  company: z.string().optional(),
  subject: z.enum(['General Inquiry', 'Product Demo', 'Partnership', 'Engineering Services', 'Other']),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
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
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Full Name *</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1A4FBF] focus:ring-2 focus:ring-[#1A4FBF]/20 outline-none transition"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Email Address *</label>
        <input
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1A4FBF] focus:ring-2 focus:ring-[#1A4FBF]/20 outline-none transition"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Company / Organization</label>
        <input
          {...register('company')}
          type="text"
          placeholder="Your company (optional)"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1A4FBF] focus:ring-2 focus:ring-[#1A4FBF]/20 outline-none transition"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Subject *</label>
        <select
          {...register('subject')}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1A4FBF] focus:ring-2 focus:ring-[#1A4FBF]/20 outline-none transition bg-white"
        >
          <option value="">Select a subject</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Product Demo">Product Demo</option>
          <option value="Partnership">Partnership</option>
          <option value="Engineering Services">Engineering Services</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Message *</label>
        <textarea
          {...register('message')}
          placeholder="Tell us about your project or inquiry..."
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1A4FBF] focus:ring-2 focus:ring-[#1A4FBF]/20 outline-none transition resize-none"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <Check className="w-5 h-5 text-green-600" />
          <p className="text-green-800">Your message has been sent! We&apos;ll get back to you soon.</p>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-800">{errorMessage || 'Failed to send message. Please try again.'}</p>
        </motion.div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-[#00C2FF] text-[#0A1628] font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-[#00C2FF]/30"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
