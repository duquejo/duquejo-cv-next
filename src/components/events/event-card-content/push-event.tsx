import { useCallback } from 'react';
import Link from 'next/link';
import { Commit, Event } from '@/interfaces';
import { Github } from 'lucide-react';

interface PushEventProps {
  repo: Event['repo'];
  payload: Event['payload'];
}

export const PushEvent = ({ payload }: PushEventProps) => {
  const getCommitUrl = useCallback(
    (commit: Commit) => commit.url.replace('https://api.github.com/repos', 'https://github.com'),
    [],
  );

  return (
    payload.commits &&
    payload.commits.length > 0 &&
    payload.commits.map(
      (commit: Commit) =>
        !['dependabot[bot]'].includes(commit.author.name) && (
          <div key={commit.sha}>
            <p className="inline text-muted-foreground cursor-pointer">{commit.message}</p>
            <Link
              href={getCommitUrl(commit)}
              className="inline font-semibold"
              target="_blank"
              rel="noopener noreferrer nofollow"
              title="Link"
            >
              <Github className="ml-2 inline bg-primary rounded-full p-1 h-5 w-5 text-background transition-colors hover:bg-primary-foreground hover:text-foreground" />
            </Link>
          </div>
        ),
    )
  );
};
