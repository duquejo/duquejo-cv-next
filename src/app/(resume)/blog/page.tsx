import { Metadata } from 'next';
import { METADATA } from '@/lib/constants';

export const metadata: Metadata = METADATA['blog'];

export default function BlogPage() {
  return (
    <article className="mt-5 lg:mt-0 px-8 pt-5 pb-10">
      <h1 className="main-title">Blog</h1>
    </article>
  );
}
