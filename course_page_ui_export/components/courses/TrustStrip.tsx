'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BookOpenCheck, Landmark, Award } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: BookOpenCheck,
    title: 'Practical Learning',
    description: 'Hands-on execution on real tax portals',
  },
  {
    icon: Landmark,
    title: 'FBR-focused Training',
    description: 'Updated for Income Tax & Sales Tax laws',
  },
  {
    icon: ShieldCheck,
    title: 'Real-world Examples',
    description: 'Actual client cases & audit defense',
  },
  {
    icon: Award,
    title: 'Verifiable Certificate',
    description: 'Accredited tax practitioner diploma',
  },
];

export function TrustStrip() {
  return (
    <section className="py-8 bg-slate-900 text-white border-b border-slate-800">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-between">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-premier-green/20 text-premier-green border border-premier-green/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-premier-green group-hover:text-slate-950 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans hidden sm:block">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
