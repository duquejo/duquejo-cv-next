import { EventLinkedAuthor, EventStaticAuthor } from '@/components/events/event-card-author';
import { BlogPostEvent, PushEvent, WatchEvent } from '@/components/events/event-card-content';
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
import { cn, toLocaleDateString } from '@/lib';
import { Eye, FileText, GitBranch, GitMerge, GitPullRequest, Star } from 'lucide-react';
import type { ReactNode } from 'react';

export const EventCard = ({ created_at, payload, actor, repo, type }: Event) => {
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
      case 'BlogPostEvent':
        return <FileText className={cn(commonCss, 'bg-blue-400')} {...commonProps} />;
      default:
        return <GitMerge className={cn(commonCss, 'bg-purple-400')} {...commonProps} />;
    }
  };

  return (
    <Card
      role="listitem"
      className="lg:max-w-xs group hover:border-primary transition-colors border-dashed cursor-default"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xs justify-between">
          <time className="text-xs font-extrabold">{toLocaleDateString(created_at)}</time>
          {payload.ref && <Badge variant="secondary">{payload.ref}</Badge>}
        </CardTitle>
        <CardDescription>
          {actor.url ? (
            <EventLinkedAuthor
              avatarUrl={actor.avatar_url}
              avatarText={actor.display_login}
              repoName={repo.name}
              url={type === 'WatchEvent' ? repo.url : actor.url}
            />
          ) : (
            <EventStaticAuthor avatarUrl={actor.avatar_url} avatarText={actor.display_login} />
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-xs leading-relaxed text-left wrap-break-word pt-0 pb-2">
        {type === 'WatchEvent' && <WatchEvent repo={repo} payload={payload} />}
        {type === 'PushEvent' && <PushEvent repo={repo} payload={payload} />}
        {type === 'BlogPostEvent' && <BlogPostEvent repo={repo} payload={payload} />}
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
