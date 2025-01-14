import { cn } from '@/lib/utils';

interface Props {
  size?: 'medium' | 'large' | 'small';
}

export const NameTag = ({ size = 'medium' }: Props) => {
  return (
    <span
      className={cn(
        'relative w-[max-content] font-mono before:absolute before:inset-0 before:animate-typewriter before:opacity-80 after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-primary  after:ml-0.5 font-light',
        size === 'medium' && 'text-base',
        size === 'large' && 'text-lg',
        size === 'small' && 'text-xs',
      )}
    >
      @duquejo
    </span>
  );
};
