import { memo } from 'react';

export const ProjectsShowcaseNotFound = memo(({ text }: { text: string }) => (
  <p data-testid="not-found">{text}</p>
));

ProjectsShowcaseNotFound.displayName = 'ProjectsShowcaseNotFound';
