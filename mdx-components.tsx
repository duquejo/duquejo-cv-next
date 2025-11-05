import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/general/code-block';
import Image from 'next/image';
import Link from 'next/link';

const components: MDXComponents = {
  // Headings
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold mb-6 mt-10 tracking-tight scroll-m-20" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-semibold mb-4 mt-8 tracking-tight scroll-m-20" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-2xl font-semibold mb-3 mt-6 tracking-tight scroll-m-20" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-xl font-semibold mb-2 mt-4 tracking-tight scroll-m-20" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="text-lg font-semibold mb-2 mt-4 tracking-tight scroll-m-20" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="text-base font-semibold mb-2 mt-4 tracking-tight scroll-m-20" {...props}>
      {children}
    </h6>
  ),

  // Paragraphs and text
  p: ({ children, ...props }) => (
    <p className="mb-4 text-base leading-relaxed text-justify" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 [&>li]:mt-2 text-base" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 [&>li]:mt-2 text-base" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  br: ({ props }) => <br {...props} />,

  // Blockquote
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-primary pl-6 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code - inline code
  code: ({ children, ...props }) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      {...props}
    >
      {children}
    </code>
  ),

  a: ({ children, href, ...props }) => (
    <Link href={href} target="_blank" className="underline underline-offset-2">
      {children}
    </Link>
  ),

  // Images
  Image: ({ src, alt, width, height, full = true, caption = '', ...props }: any) => (
    <figure className="my-5">
      <Image
        src={src}
        alt={alt || ''}
        className={`mx-auto rounded-lg ${full ? 'md:w-full h-full w-auto' : 'h-auto'}`}
        title={alt || ''}
        unoptimized
        width={width || 500}
        height={height || 300}
        {...props}
      />
      {caption && <figcaption className="text-center text-xs mt-2 mb-5">{caption}</figcaption>}
    </figure>
  ),

  pre: ({ children, ...props }) => {
    const childProps = (children as any)?.props;
    const code = childProps?.children || '';
    const className = childProps?.className || '';
    const language = className.replace('language-', '') || 'text';

    return (
      <div
        className="my-8 rounded-lg bg-sidebar/50 border border-border overflow-hidden"
        {...props}
      >
        <div className="bg-sidebar/80 px-4 py-2 border-b border-border flex justify-end">
          <span className="text-xs font-mono text-muted-foreground">{language}</span>
        </div>
        <CodeBlock code={String(code).trim()} />
      </div>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
