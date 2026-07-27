'use client';

import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="min-h-screen flex">
      {/* LEFT — Visual / Branding Side */}
      <div
        className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center"
        style={{
          background:
            'linear-gradient(135deg, #0d3b2e 0%, #1a5e4a 30%, #0f2d24 70%, #0a1f17 100%)',
        }}
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent-gold/10 blur-3xl animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div
            className="absolute bottom-32 right-16 w-80 h-80 rounded-full bg-brand-green/15 blur-3xl animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg px-12 text-center">
          <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-accent-gold text-4xl font-black tracking-tighter">
              P
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Premier LMS <span className="block text-accent-gold">Student Admission</span>
          </h2>

          <p className="text-white/70 text-base leading-relaxed mb-10">
            Accounts are provisioned automatically upon official admission approval. Fill out your admission form to get started.
          </p>

          {/* Steps */}
          <div className="space-y-4 text-left">
            {[
              {
                step: '01',
                title: 'Fill Admission Form',
                desc: 'Submit your personal, academic, and payment details.',
              },
              {
                step: '02',
                title: 'Admin Verification',
                desc: 'Our admissions department reviews and approves your submission.',
              },
              {
                step: '03',
                title: 'Receive Credentials & Log In',
                desc: 'An automated email delivers your password for sign in.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-gold/20 flex items-center justify-center shrink-0">
                  <span className="text-accent-gold text-sm font-bold">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">{item.title}</h4>
                  <p className="text-white/60 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — Info & Redirect Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 bg-white relative overflow-hidden">
        <div className="w-full max-w-md relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-green to-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-green/20">
            <span className="text-accent-gold text-2xl font-extrabold tracking-tight">
              P
            </span>
          </div>

          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Student Account Provisioning
          </h1>
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            Direct account creation is managed via our official admission process. To become a registered student, please submit your admission form.
          </p>

          <div className="bg-bg-light border border-border-light rounded-2xl p-6 my-8 text-left space-y-3">
            <div className="flex items-center gap-3 text-brand-green font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
              How to get your login credentials:
            </div>
            <ol className="list-decimal list-inside text-xs text-text-secondary space-y-2 leading-relaxed">
              <li>Click <strong>Apply for Admission</strong> below.</li>
              <li>Fill in your details and select your course cohort.</li>
              <li>Once approved by our admin, your password will be emailed to you instantly.</li>
            </ol>
          </div>

          <div className="space-y-3">
            <Link
              href="/admission"
              className="w-full btn-signup py-3.5 text-base font-bold rounded-xl shadow-lg shadow-brand-green/20 hover:shadow-xl hover:shadow-brand-green/30 transition-all duration-300 block text-center no-underline"
            >
              Apply for Admission
            </Link>

            <Link
              href="/auth/login"
              className="w-full py-3.5 text-sm font-semibold text-text-secondary hover:text-brand-green border border-border-light hover:border-brand-green/40 rounded-xl transition-all duration-200 block text-center no-underline"
            >
              Already Approved? Sign In to Portal
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
