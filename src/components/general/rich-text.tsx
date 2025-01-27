// @flow
import * as React from 'react';
import { ReactNode } from 'react';

type Tag = 'b' | 'br';

interface Props {
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode;
}
export const RichText = ({ children }: Props) => {
  return children({
    b: (chunks: ReactNode) => <b>{chunks}</b>,
    br: () => <br />,
  });
};
