import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Event } from '@/interfaces';
import { Github } from 'lucide-react';
import Link from 'next/link';

interface EventLinkedAuthorProps {
  url: string;
  avatarUrl: Event['actor']['avatar_url'];
  avatarText: Event['actor']['display_login'];
  repoName: Event['repo']['name'];
}

export const EventLinkedAuthor = ({
  url,
  avatarUrl,
  avatarText,
  repoName,
}: EventLinkedAuthorProps) => {
  const repoSource = repoName === 'duquejo/duquejo-cv-next' ? avatarUrl : '';

  return (
    <Link
      href={url}
      className="flex items-center space-x-2"
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      <Avatar className="max-h-7 rounded-full w-7 h-7">
        <AvatarImage src={repoSource} alt={avatarText} />
        <AvatarFallback>
          <Github />
        </AvatarFallback>
      </Avatar>
      <span className="text-xs underline-offset-2 hover:underline">{repoName}</span>
    </Link>
  );
};
