import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Music production'),
  description: 'A beloved hobby which balances everything',
};

export default function MusicPage() {
  return (
    <div>
      <article className="flex flex-col mt-5 lg:mt-0 px-8 pt-5 pb-10">
        <section>
          <h1 className="text-4xl lg:text-6xl mb-5 leading-tight mt-10 text-center font-semibold underline underline-offset-8 decoration-yellow-400">
            Music showcase
          </h1>
        </section>
      </article>
    </div>
  );
}
