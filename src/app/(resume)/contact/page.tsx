import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Contact'),
  description: 'Get in touch with me for any inquiries or support. I am here to help you',
};

export default function ContactPage() {
  return (
    <div>
      <article className="flex flex-col mt-5 lg:mt-0 px-8 pt-5 pb-10">
        <section>
          <h1 className="text-4xl lg:text-6xl mb-5 leading-tight mt-10 text-center font-semibold underline underline-offset-8 decoration-yellow-400">
            Contact
          </h1>
        </section>
      </article>
    </div>
  );
}
