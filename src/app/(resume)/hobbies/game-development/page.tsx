import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Games development'),
  description: 'Some of them are part of the practice that greatly enriches my career',
};

export default function GamesPage() {
  return (
    <article className="mt-5 lg:mt-0 px-8 pt-5 pb-10">
      <h1 className="main-title">Games showcase</h1>
    </article>
  );
}
