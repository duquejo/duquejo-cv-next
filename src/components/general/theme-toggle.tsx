'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button, type ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  variant?: ButtonProps['variant'];
  title: string;
  light: string;
  dark: string;
  system: string;
}

export function ThemeToggle({ className, variant, title, dark, system, light }: Props) {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="icon" className={cn('h-10 w-10', className)} title={title}>
          <Sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            aria-label={`${light}-control`}
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            aria-label={`${dark}-control`}
          />
          <span className="sr-only">{title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          aria-label={light}
          className={cn('text-xs', theme === 'light' && 'bg-accent')}
          onClick={() => setTheme('light')}
        >
          {light}
        </DropdownMenuItem>
        <DropdownMenuItem
          aria-label={dark}
          className={cn('text-xs', theme === 'dark' && 'bg-accent')}
          onClick={() => setTheme('dark')}
        >
          {dark}
        </DropdownMenuItem>
        <DropdownMenuItem
          aria-label={system}
          className={cn('text-xs', theme === 'system' && 'bg-accent')}
          onClick={() => setTheme('system')}
        >
          {system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
