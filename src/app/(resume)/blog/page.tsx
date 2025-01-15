import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Blog'),
  description: 'Discover the latest news, tips and interesting tech & lifestyle articles',
};

export default function BlogPage() {
  return (
    <article className="mt-5 lg:mt-0 px-8 pt-5 pb-10">
      <h1 className="main-title">Blog</h1>
    </article>
  );
}
