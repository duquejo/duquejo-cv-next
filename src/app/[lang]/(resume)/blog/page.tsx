import { generateMetadata } from '@/lib/utils';

export async function metadata() {
  return generateMetadata('Blog');
}

export default function BlogPage() {
  return (
    <article className="px-8 pt-5 pb-10">
      <h1 className="main-title">Blog</h1>
    </article>
  );
}
