import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Contact'),
  description: 'Get in touch with me for any inquiries or support. I am here to help you',
};

export default function ContactPage() {
  return <div>ContactPage</div>;
}
