import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Games development'),
  description: 'Some of them are part of the practice that greatly enriches my career',
};

export default function GamesPage() {
  return (
    <div>
      <article className="flex flex-col mt-5 lg:mt-0 px-8 pt-5 pb-10">
        <section>
          <h1 className="text-4xl lg:text-6xl mb-5 leading-tight mt-10 text-center font-semibold underline underline-offset-8 decoration-yellow-400">
            Games showcase
          </h1>
        </section>
      </article>
    </div>
  );
}
