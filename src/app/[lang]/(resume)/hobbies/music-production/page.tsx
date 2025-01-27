import { generateMetadata } from '@/lib/utils';

export async function metadata() {
  return generateMetadata('MusicProduction');
}

export default function MusicPage() {
  return (
    <article className="px-8 pt-5 pb-10">
      <h1 className="main-title">Music showcase</h1>
    </article>
  );
}
