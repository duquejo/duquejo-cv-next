import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default async function NotFound() {
  return (
    <article className="flex justify-center items-center flex-1 h-screen">
      <section className="flex flex-col items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold underline underline-offset-8 decoration-yellow-400">
            Not found
          </h1>
          <p className="my-3">Could not find requested resource</p>
          <Button variant="secondary" asChild>
            <Link href="/">Take me back</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
