import type { ReactNode } from 'react';

type Tag = 'b' | 'br' | 'i';

interface Props {
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode;
}
export const RichText = ({ children }: Props) => {
  return children({
    b: (chunks: ReactNode) => <b>{chunks}</b>,
    i: (chunks: ReactNode) => <i>{chunks}</i>,
    br: () => <br />,
  });
};
