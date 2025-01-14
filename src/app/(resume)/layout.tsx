import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ResumeLayout({ children }: Props): ReactNode {
  return (
    <>
      <main className="flex justify-between flex-1 h-screen">
        <div className="flex-1 mt-5 lg:mt-0 relative">{children}</div>
      </main>
    </>
  );
}
