import type { Event } from '@/interfaces';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, GitBranch, Github, GitMerge, GitPullRequest } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib';

export const EventCard = ({ created_at, payload, actor, repo, type }: Event) => {
  const toLocaleDateString = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const toIcon = (iconString: string): ReactNode => {
    const commonCss = 'inline bg-primary rounded-full transition-colors p-1';
    const commonProps = {
      size: 30,
      'data-testid': 'event-action',
    };
    switch (iconString) {
      case 'PullRequestEvent':
        return <GitPullRequest className={cn(commonCss, 'bg-yellow-400')} {...commonProps} />;
      case 'CreateEvent':
        return <GitBranch className={cn(commonCss, 'bg-teal-400')} {...commonProps} />;
      case 'PushEvent':
        return <GitMerge className={cn(commonCss, 'bg-red-400')} {...commonProps} />;
      case 'WatchEvent':
      case 'PullRequestReviewEvent':
        return <Eye className={cn(commonCss, 'bg-cyan-300')} {...commonProps} />;
      default:
        return <GitMerge className={cn(commonCss, 'bg-purple-400')} {...commonProps} />;
    }
  };

  return (
    <Card role="listitem" className="lg:max-w-xs">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xs justify-between">
          <time className="text-xs font-extrabold">{toLocaleDateString(created_at)}</time>
          {payload.ref && <Badge variant="secondary">{payload.ref}</Badge>}
        </CardTitle>
        <CardDescription>
          <Link
            href={`https://github.com/${repo.name}`}
            className="flex items-center space-x-2"
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            <Image
              src={actor.avatar_url}
              alt={actor.display_login}
              className="max-h-7 rounded-full"
              width="28"
              height="28"
            />
            <span className="font-semibold underline underline-offset-2 decoration-1 truncate text-xs">
              {repo.name}
            </span>
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-xs leading-relaxed text-left break-words">
        {payload.description && <strong className="font-bold">{payload.description}</strong>}
        {payload.commits &&
          payload.commits.length > 0 &&
          payload.commits.map(
            (commit) =>
              !['dependabot[bot]'].includes(commit.author.name) && (
                <div key={commit.sha}>
                  <p className="inline text-muted-foreground">{commit.message}</p>
                  {type === 'PushEvent' && (
                    <Link
                      href={`${commit.url.replace('https://api.github.com/repos', 'https://github.com')}`}
                      className="inline font-semibold"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      title="Link"
                    >
                      <Github className="ml-2 inline bg-primary rounded-full p-1 h-5 w-5 text-background transition-colors hover:bg-primary-foreground hover:text-foreground" />
                    </Link>
                  )}
                </div>
              ),
          )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-background">{toIcon(type)}</span>
        <span className="text-muted-foreground">{type}</span>
        {payload.ref_type && <span className="capitalize">({payload.ref_type})</span>}
      </CardFooter>
    </Card>
  );
};
