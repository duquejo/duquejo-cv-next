import type { Event } from '@/interfaces';
import Image from 'next/image';

interface EventStaticAuthorProps {
  avatarUrl: Event['actor']['avatar_url'];
  avatarText: Event['actor']['display_login'];
}

export const EventStaticAuthor = ({ avatarUrl, avatarText }: EventStaticAuthorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={avatarUrl}
        alt={avatarText}
        className="max-h-7 rounded-full"
        width="28"
        height="28"
      />
      <span className="text-xs">{avatarText}</span>
    </div>
  );
};
