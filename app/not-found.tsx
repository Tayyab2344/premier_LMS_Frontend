import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-108px)] pt-[108px] bg-premier-cream flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-premier-green text-premier-gold flex items-center justify-center mx-auto shadow-md border border-premier-green-dark">
          <FileQuestion className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-premier-gold px-3 py-1 rounded-full bg-premier-green/10 border border-premier-green/20 inline-block">
            Error 404
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-heading">
            Page Not Found
          </h1>
          <p className="text-sm text-body leading-relaxed max-w-sm mx-auto">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-premier-green text-white font-heading font-bold text-sm hover:bg-premier-green-dark transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
