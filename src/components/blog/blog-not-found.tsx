interface BlogNotFoundProps {
  title: string;
  content: string;
  no_articles: string;
}

export const BlogNotFound = ({ title, content, no_articles }: BlogNotFoundProps) => {
  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5">
      <h1 className="main-title">{title}</h1>
      <p className="md:max-w-4xl max-w-full m-auto mb-5">{content}</p>

      {/* No articles */}
      <p className="mt-5 text-muted-foreground">{no_articles}</p>
    </article>
  );
};
