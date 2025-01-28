import { generateMetadata } from '@/lib';

export async function metadata() {
  return generateMetadata('Contact');
}

export default function ContactPage() {
  return (
    <article className="px-8 pt-5 pb-10">
      <h1 className="main-title">Contact</h1>
    </article>
  );
}
