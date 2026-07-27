'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCircle2, Mail, User } from 'lucide-react';

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
}

export function NotifyModal({ isOpen, onClose, courseTitle }: NotifyModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!fullName.trim() || fullName.trim().length < 2) {
      setNameError('Full name must be at least 2 characters');
      valid = false;
    } else {
      setNameError('');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!valid) return;

    setIsSubmitting(true);
    // Simulate server response delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleCloseModal = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setNameError('');
    setEmailError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-border z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-surface-secondary text-body hover:text-heading hover:bg-slate-200 flex items-center justify-center transition-all"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                    <Bell className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-amber-600">
                      Early Bird Registration
                    </span>
                    <h3 className="text-xl font-heading font-bold text-heading leading-tight">
                      Get Notified at Launch
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-body leading-relaxed">
                  Register your interest for <strong className="text-heading font-semibold">"{courseTitle}"</strong>. Be the first to receive early-bird tuition discounts, syllabus downloads, and launch dates!
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-heading font-bold text-heading mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-body/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Ali Ahmed"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          nameError ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                        } text-sm focus:outline-none focus:ring-2 transition-all bg-surface-secondary`}
                      />
                    </div>
                    {nameError && (
                      <p className="text-xs text-red-500 mt-1">{nameError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-heading mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-body/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="e.g. ali@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          emailError ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                        } text-sm focus:outline-none focus:ring-2 transition-all bg-surface-secondary`}
                      />
                    </div>
                    {emailError && (
                      <p className="text-xs text-red-500 mt-1">{emailError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary !py-3.5 !text-sm text-center justify-center font-heading font-bold disabled:opacity-50 mt-2"
                  >
                    {isSubmitting ? 'Registering...' : 'Notify Me at Launch'}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Confirmation */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-heading">
                  You're on the VIP List!
                </h3>
                <p className="text-sm text-body leading-relaxed max-w-xs mx-auto">
                  We'll send launch notifications and exclusive early-bird discounts for <strong className="text-heading font-semibold">"{courseTitle}"</strong> straight to your email.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="btn-primary !py-3 !px-6 text-sm mx-auto inline-flex"
                >
                  Done &amp; Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
