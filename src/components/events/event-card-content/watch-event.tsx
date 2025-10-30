import { Event } from '@/interfaces';
import Link from 'next/link';

interface WatchEventProps {
  repo: Event['repo'];
}

const DEFAULT_SENTENCES = [
  'I just followed a great repo',
  'I started following this awesome project',
  'I found and followed a fantastic repository',
  'I followed an interesting repo',
  'I began watching this repository',
  'I followed this repository',
];

export const WatchEvent = ({ repo }: WatchEventProps) => {
  const getRandomSentence = () => {
    // eslint-disable-next-line react-hooks/purity
    const randomIndex = Math.floor(Math.random() * DEFAULT_SENTENCES.length);
    return DEFAULT_SENTENCES[randomIndex];
  };

  return (
    <p className="inline text-muted-foreground">
      {getRandomSentence()}{' '}
      <Link
        href={`https://github.com/${repo.name}`}
        className="underline font-bold"
        rel="noopener noreferrer nofollow"
        target="_blank"
      >
        {repo.name}
      </Link>{' '}
      check it out!
    </p>
  );
};
