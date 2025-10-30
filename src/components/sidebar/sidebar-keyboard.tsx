import { cn } from '@/lib';
import { Kbd, KbdGroup } from '@/components/ui/kbd';

export const SidebarKeyboard = ({ className }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('flex-col items-center gap-4', className)}>
      <p className="text-xs text-muted-foreground">
        Use{' '}
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>B</Kbd>
        </KbdGroup>{' '}
        to toggle the sidebar
      </p>
    </div>
  );
};
