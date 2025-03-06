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
import { cn } from '@/lib';

interface Props {
  className?: string;
  variant?: ButtonProps['variant'];
  title: string;
  light: string;
  dark: string;
  system: string;
}

export function ThemeToggle({ className, variant, title, dark, system, light }: Props) {
  const { setTheme, theme, themes } = useTheme();

  const themeLabels: Record<string, string> = {
    dark,
    light,
    system,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="icon" className={cn('h-10 w-10', className)} title={title}>
          <Sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            aria-label={light}
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            aria-label={dark}
          />
          <span className="sr-only">{title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t: string) => (
          <DropdownMenuItem
            key={t}
            aria-label={themeLabels[t]}
            className={cn('text-xs cursor-pointer', theme === t && 'bg-accent')}
            onClick={() => setTheme(t)}
          >
            {themeLabels[t]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
