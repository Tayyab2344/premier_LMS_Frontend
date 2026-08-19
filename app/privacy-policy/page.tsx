import { Metadata } from 'next';
import { PrivacyPolicyView } from '@/components/premier-lms/PrivacyPolicyView';

export const metadata: Metadata = {
  title: 'Global Privacy Policy & Data Protection | Premier Academy',
  description: 'Learn about Premier Academy data protection standards, GDPR & CCPA compliance, video watermark security, and your international privacy rights.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}
