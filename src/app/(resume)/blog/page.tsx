import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Blog'),
  description: 'Discover the latest news, tips and interesting tech & lifestyle articles',
};

export default function BlogPage() {
  return (
    <div>
      <article className="flex flex-col mt-5 lg:mt-0 px-8 pt-5 pb-10">
        <section>
          <h1 className="text-4xl lg:text-6xl mb-5 leading-tight mt-10 text-center font-semibold underline underline-offset-8 decoration-yellow-400">
            Blog
          </h1>
        </section>
      </article>
    </div>
  );
}
