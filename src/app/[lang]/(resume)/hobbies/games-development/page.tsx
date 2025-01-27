import { generateMetadata } from '@/lib/utils';

export async function metadata() {
  return generateMetadata('GamesDevelopment');
}

export default function GamesPage() {
  return (
    <article className="px-8 pt-5 pb-10">
      <h1 className="main-title">Games showcase</h1>
    </article>
  );
}
