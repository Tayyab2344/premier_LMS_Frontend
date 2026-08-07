'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ModalOptions {
  title: string;
  message: string;
  type: 'alert' | 'confirm';
  resolve?: (value: boolean) => void;
}

interface ModalContextType {
  showAlert: (title: string, message: string) => Promise<void>;
  showConfirm: (title: string, message: string) => Promise<boolean>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalOptions | null>(null);

  const showAlert = (title: string, message: string): Promise<void> => {
    return new Promise((resolve) => {
      setModal({
        title,
        message,
        type: 'alert',
        resolve: () => {
          setModal(null);
          resolve();
        },
      });
    });
  };

  const showConfirm = (title: string, message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setModal({
        title,
        message,
        type: 'confirm',
        resolve: (value: boolean) => {
          setModal(null);
          resolve(value);
        },
      });
    });
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal) {
        if (modal.type === 'confirm') {
          modal.resolve?.(false);
        } else {
          modal.resolve?.(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modal]);

  // Determine modal theme variant (danger, success, confirm, info)
  const titleLower = modal?.title.toLowerCase() || '';
  const messageLower = modal?.message.toLowerCase() || '';

  const isDanger =
    titleLower.includes('error') ||
    titleLower.includes('delete') ||
    titleLower.includes('remove') ||
    titleLower.includes('reject') ||
    titleLower.includes('fail') ||
    titleLower.includes('cancel');

  const isSuccess =
    !isDanger &&
    (titleLower.includes('success') ||
      titleLower.includes('created') ||
      titleLower.includes('updated') ||
      titleLower.includes('added') ||
      titleLower.includes('saved') ||
      titleLower.includes('uploaded') ||
      titleLower.includes('approved') ||
      titleLower.includes('complete') ||
      messageLower.includes('successfully'));

  const isConfirm = modal?.type === 'confirm';

  return (
    <ModalContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      {modal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 select-none animate-fade-in">
          {/* Modal Container Card */}
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/60 text-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden p-6 sm:p-7 space-y-6 animate-scale-up">
            {/* Top Accent Gradient Bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                isDanger
                  ? 'from-rose-600 via-red-500 to-amber-600'
                  : isSuccess
                  ? 'from-emerald-500 via-teal-400 to-brand-green'
                  : isConfirm
                  ? 'from-amber-400 via-amber-500 to-yellow-600'
                  : 'from-amber-400 via-emerald-500 to-amber-600'
              }`}
            />

            {/* Header Badge & Title & Icon */}
            <div className="flex items-start gap-4 pt-1">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner ${
                  isDanger
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-rose-500/20'
                    : isSuccess
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-emerald-500/20'
                    : isConfirm
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-amber-500/20'
                    : 'bg-sky-500/10 border-sky-500/30 text-sky-400 shadow-sky-500/20'
                }`}
              >
                {isDanger ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ) : isSuccess ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : isConfirm ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              <div className="space-y-1.5 flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isDanger
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : isSuccess
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isConfirm
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    }`}
                  >
                    {isConfirm ? 'Confirm Action' : isDanger ? 'System Alert' : isSuccess ? 'Success' : 'Admin Portal'}
                  </span>
                </div>
                <h3 className="text-base font-heading font-extrabold text-white tracking-tight">
                  {modal.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans font-medium">
                  {modal.message}
                </p>
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/80">
              {modal.type === 'confirm' && (
                <button
                  onClick={() => modal.resolve?.(false)}
                  className="px-5 py-2.5 text-xs font-bold rounded-xl text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => modal.resolve?.(true)}
                className={`px-6 py-2.5 text-xs font-heading font-extrabold rounded-xl transition-all duration-200 cursor-pointer shadow-md active:scale-[0.98] ${
                  isDanger
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-rose-900/50 border border-rose-500/40'
                    : isSuccess
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/50 border border-emerald-500/40'
                    : isConfirm
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-900/40 border border-amber-300/60'
                    : 'bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-amber-900/40 border border-amber-300/60'
                }`}
              >
                {modal.type === 'confirm' ? 'Confirm Action' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
