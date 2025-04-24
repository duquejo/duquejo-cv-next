import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRightIcon, Share2Icon } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  const staticLink = '/blog/sample-page';

  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5">
      <h1 className="main-title">Blog</h1>
      <section className="pt-5">
        <h2 className="main-subtitle">Today&#39;s headlines: Stay informed</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at eligendi enim nam,
          nulla quo quod reiciendis repellat repellendus voluptates?
        </p>
        <Separator className="my-5" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="p-0">
              <Link href={staticLink}>
                <Image
                  src="/static/img/showcase/personalizador_familia.webp"
                  width="280"
                  height="185"
                  loading="lazy"
                  alt="cosa"
                  className="object-cover shadow w-auto rounded-2xl cursor-pointer"
                />
              </Link>
              <CardTitle className="mt-2">
                <Link href={staticLink}>Lorem ipsum dolor sit amet.</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm px-0 pt-2 pb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, minus.
            </CardContent>
            <CardFooter className="w-full p-0 flex-col align-middle">
              <div className="flex w-full justify-between text-sm">
                <div className="flex-row space-y-2">
                  <small>Published at</small>
                  <time className="block font-semibold">{new Date().toLocaleDateString()}</time>
                </div>
                <div className="flex-row space-y-2">
                  <small>Category</small>
                  <div className="block font-semibold">Technology</div>
                </div>
                <div className="flex-row space-y-2">
                  <small>Author</small>
                  <div className="block font-semibold">José Duque</div>
                </div>
              </div>
              <div className="flex justify-between mt-5 w-full">
                <Button size="sm" variant="secondary" className="cursor-pointer">
                  Share <Share2Icon />
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                  role="link"
                  asChild={true}
                >
                  <Link href={staticLink}>
                    Read more <ArrowUpRightIcon />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </article>
  );
}
