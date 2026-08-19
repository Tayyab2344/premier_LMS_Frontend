import { Metadata } from 'next';
import { TermsOfServiceView } from '@/components/premier-lms/TermsOfServiceView';

export const metadata: Metadata = {
  title: 'Terms & Conditions of Service | Premier Academy',
  description: 'Review the legal terms, Raja Gulfam intellectual property licensing, enrollment refund policy, and academic integrity rules governing Premier Academy.',
};

export default function TermsOfServicePage() {
  return <TermsOfServiceView />;
}
