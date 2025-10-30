import { PushEvent, WatchEvent } from '@/components/events/event-card-content';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Event } from '@/interfaces';
import { cn } from '@/lib';
import { Eye, GitBranch, Github, GitMerge, GitPullRequest, Star } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export const EventCard = ({ created_at, payload, actor, repo, type }: Event) => {
  const toLocaleDateString = (dateString: string) => new Date(dateString).toLocaleString();

  const toIcon = (iconString: string): ReactNode => {
    const commonCss = 'inline bg-primary rounded-full transition-colors p-1';
    const commonProps = {
      size: 25,
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
        return <Star className={cn(commonCss, 'bg-amber-300')} {...commonProps} />;
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
          {payload.ref && (
            <Badge variant="secondary">{payload.ref.replace('refs/heads/', '')}</Badge>
          )}
        </CardTitle>
        <CardDescription>
          <Link
            href={`https://github.com/${repo.name}`}
            className="flex items-center space-x-2"
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            <Avatar className="max-h-7 rounded-full w-7 h-7">
              <AvatarImage
                src={repo.name === 'duquejo/duquejo-cv-next' ? actor.avatar_url : ''}
                alt={actor.display_login}
              />
              <AvatarFallback>
                <Github />
              </AvatarFallback>
            </Avatar>
            <span className="text-xs underline-offset-2 hover:underline">{repo.name}</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-xs leading-relaxed text-left wrap-break-word pt-0 pb-2">
        {payload.description && <strong className="font-bold">{payload.description}</strong>}
        {type === 'WatchEvent' && <WatchEvent repo={repo} />}
        {type === 'PushEvent' && <PushEvent repo={repo} payload={payload} />}
      </CardContent>
      <CardFooter className="flex justify-end gap-x-2">
        <div className="leading-tight">
          <span className="text-muted-foreground block text-sm">{type}</span>
          {payload.ref_type && <span className="capitalize text-xs">{payload.ref_type}</span>}
        </div>
        <span className="text-background">{toIcon(type)}</span>
      </CardFooter>
    </Card>
  );
};
