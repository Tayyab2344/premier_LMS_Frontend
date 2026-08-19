import { Metadata } from 'next';
import { TermsOfServiceView } from '@/components/premier-lms/TermsOfServiceView';

export const metadata: Metadata = {
  title: 'Terms & Conditions of Service | Premier Academy',
  description: 'Review the legal terms, Raja Gulfam intellectual property licensing, enrollment refund policy, and academic integrity rules governing Premier Academy.',
  keywords: ['Terms of Service', 'Terms and Conditions', 'Premier Academy Terms', 'Raja Gulfam Licensing', 'LMS Terms'],
  openGraph: {
    title: 'Terms & Conditions of Service | Premier Academy',
    description: 'Enforceable legal terms and conditions governing course enrollments, intellectual property, and academic integrity at Premier Academy.',
    type: 'website',
  },
};

export default function TermsPage() {
  return <TermsOfServiceView />;
}
