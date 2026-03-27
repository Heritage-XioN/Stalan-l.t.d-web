'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Calendar } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A1628]">
      {/* Page Hero */}
      <section className="relative min-h-[30vh] flex items-center justify-center pt-32 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-300">
            Have a project in mind or want to learn more about our products? We&apos;d love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-2">Contact Information</h2>
              <p className="text-gray-400">Find out how to reach us or learn more about our company.</p>
            </div>

            {/* Info Cards */}
            <div className="space-y-6 mb-12">
              {/* LinkedIn */}
              <div className="flex items-start gap-4 p-6 rounded-lg bg-white/5 backdrop-blur border border-white/10 hover:border-[#00C2FF]/50 transition-colors">
                <div className="flex-shrink-0">
                  <Linkedin className="w-6 h-6 text-[#00C2FF]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">LinkedIn</h3>
                  <a
                    href="https://www.linkedin.com/company/stalan-ltd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#00C2FF] transition-colors"
                  >
                    linkedin.com/company/stalan-ltd
                  </a>
                </div>
              </div>

              {/* Founded */}
              <div className="flex items-start gap-4 p-6 rounded-lg bg-white/5 backdrop-blur border border-white/10 hover:border-[#00C2FF]/50 transition-colors">
                <div className="flex-shrink-0">
                  <Calendar className="w-6 h-6 text-[#00C2FF]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Founded</h3>
                  <p className="text-gray-400">November 2, 2024</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-6 rounded-lg bg-white/5 backdrop-blur border border-white/10 hover:border-[#00C2FF]/50 transition-colors">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#00C2FF]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Location</h3>
                  <p className="text-gray-400">Nigeria</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-6 rounded-lg bg-white/5 backdrop-blur border border-white/10 hover:border-[#00C2FF]/50 transition-colors">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#00C2FF]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:contact@stalan.ltd"
                    className="text-gray-400 hover:text-[#00C2FF] transition-colors"
                  >
                    contact@stalan.ltd
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Row */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-white font-semibold mb-4">Connect with us</p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/stalan-ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-white/10 hover:bg-[#00C2FF]/20 border border-white/10 hover:border-[#00C2FF]/50 transition-all flex items-center justify-center text-[#00C2FF]"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
