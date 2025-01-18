import { Metadata } from 'next';
import { METADATA } from '@/lib/constants';

export const metadata: Metadata = METADATA['music-production'];

export default function MusicPage() {
  return (
    <article className="mt-5 lg:mt-0 px-8 pt-5 pb-10">
      <h1 className="main-title">Music showcase</h1>
    </article>
  );
}
