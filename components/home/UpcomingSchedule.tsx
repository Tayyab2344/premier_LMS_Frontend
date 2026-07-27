'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, UserCheck, Video, CheckCircle2, AlertCircle, X } from 'lucide-react';

const sessions = [
  { id: 's1', title: 'Income Tax Return Filing & Wealth Reconciliation', date: 'Thursday, July 30, 2026', time: '04:00 PM PKT (2 Hours)', instructor: 'Advocate Raja Gulfam', seats: 12, cpe: 'Tax Masterclass', topics: ['FBR IRIS Portal', 'Wealth Reconciliation', 'ATL Rules'] },
  { id: 's2', title: 'SECP Company Registration & Form A/29 Filing', date: 'Tuesday, August 4, 2026', time: '04:00 PM PKT (3 Hours)', instructor: 'Advocate Raja Gulfam', seats: 7, cpe: 'SECP Masterclass', topics: ['eServices Portal', 'Memorandum & Articles', 'Form 29'] },
  { id: 's3', title: 'Sales Tax Annexure C & Provincial Tax Compliance', date: 'Friday, August 7, 2026', time: '04:00 PM PKT (2.5 Hours)', instructor: 'Advocate Raja Gulfam', seats: 19, cpe: 'Sales Tax Masterclass', topics: ['Annexure C', 'Input Tax Adjustment', 'PRA & SRB'] },
];

export function UpcomingSchedule() {
  const [modal, setModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [time, setTime] = useState({ d: 2, h: 14, m: 36, s: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(p => {
        if (p.s > 0) return { ...p, s: p.s - 1 };
        if (p.m > 0) return { ...p, m: p.m - 1, s: 59 };
        if (p.h > 0) return { ...p, h: p.h - 1, m: 59, s: 59 };
        return p;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const reserve = (title: string) => { setSelectedTitle(title); setSuccess(false); setModal(true); };
  const confirm = (e: React.FormEvent) => { e.preventDefault(); if (email) setSuccess(true); };

  return (
    <section className="py-20 bg-white border-t border-border" id="live-classes">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold mb-3">
              <Video className="w-3.5 h-3.5" />
              Upcoming Live Masterclasses
            </span>
            <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>Live Interactive Masterclasses</h2>
            <p className="text-body font-body text-base mt-1.5">Join live interactive Q&amp;A sessions led directly by Raja Gulfam.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-secondary border border-border text-xs font-number font-bold text-heading">
            <span>Next Live Class In:</span>
            <span className="text-primary">{time.d}d {time.h}h {time.m}m {time.s}s</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sessions.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-border p-6 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary font-bold">{s.cpe}</span>
                  <span className="text-red-600 font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {s.seats} Seats Left</span>
                </div>
                <h3 className="text-base font-bold text-heading leading-snug">{s.title}</h3>
                <div className="space-y-2 text-xs text-body border-t border-b border-border py-3">
                  <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-primary" /> {s.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-emerald-600" /> {s.time}</div>
                  <div className="flex items-center gap-2"><UserCheck className="w-3.5 h-3.5 text-amber-600" /> {s.instructor}</div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {s.topics.map((t, i) => <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-surface-secondary text-body font-medium">#{t}</span>)}
                </div>
              </div>
              <button onClick={() => reserve(s.title)} className="w-full mt-6 btn-primary !py-2.5 text-xs text-center justify-center font-heading font-bold">
                Reserve Seat
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {modal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-card border border-border relative">
                <button onClick={() => setModal(false)} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-surface-secondary text-body">
                  <X className="w-5 h-5" />
                </button>
                {success ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-heading">Seat Reserved!</h3>
                    <p className="text-xs text-body">We sent the Student Mobile App access link and live class invitation to <strong>{email}</strong>.</p>
                    <button onClick={() => setModal(false)} className="btn-primary text-xs !py-2.5 w-full justify-center">Done</button>
                  </div>
                ) : (
                  <form onSubmit={confirm} className="space-y-4">
                    <h3 className="text-lg font-bold text-heading">Reserve Masterclass Seat</h3>
                    <p className="text-xs text-body">You are reserving a seat for <strong>{selectedTitle}</strong>.</p>
                    <div>
                      <label className="text-xs font-bold text-heading block mb-1">Your Email Address</label>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full px-3.5 py-2.5 rounded-xl border border-border text-xs text-heading focus:outline-none focus:border-primary" />
                    </div>
                    <button type="submit" className="w-full btn-primary !py-2.5 text-xs text-center justify-center font-heading font-bold">Confirm Seat</button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
