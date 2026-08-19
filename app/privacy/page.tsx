import { Metadata } from 'next';
import { PrivacyPolicyView } from '@/components/premier-lms/PrivacyPolicyView';

export const metadata: Metadata = {
  title: 'Global Privacy Policy & Data Protection | Premier Academy',
  description: 'Learn about Premier Academy data protection standards, GDPR & CCPA compliance, video watermark security, and your international privacy rights.',
  keywords: ['Privacy Policy', 'GDPR', 'CCPA', 'Data Protection', 'Premier Academy', 'Raja Gulfam', 'LMS Privacy'],
  openGraph: {
    title: 'Global Privacy Policy & Data Protection | Premier Academy',
    description: 'International data protection policies, GDPR/CCPA rights, and dynamic video security for Premier Academy learners.',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicyView />;
}
