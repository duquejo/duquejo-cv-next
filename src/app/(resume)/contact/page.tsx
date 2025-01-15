import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Contact'),
  description: 'Get in touch with me for any inquiries or support. I am here to help you',
};

export default function ContactPage() {
  return (
    <article className="mt-5 lg:mt-0 px-8 pt-5 pb-10">
      <h1 className="main-title">Contact</h1>
    </article>
  );
}
