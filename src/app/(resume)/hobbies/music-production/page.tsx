import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Music production'),
  description: 'A beloved hobby which balances everything',
};

export default function MusicPage() {
  return (
    <article className="mt-5 lg:mt-0 px-8 pt-5 pb-10">
      <h1 className="main-title">Music showcase</h1>
    </article>
  );
}
