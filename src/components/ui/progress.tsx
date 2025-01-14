'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, color = 'bg-primary', ...props }, ref) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalSpeed = 30;
    const incrementSpeed = 1;

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const updatedProgress = prevProgress + incrementSpeed;
        if (updatedProgress >= value!) {
          clearInterval(progressInterval);
          return value!;
        }
        return updatedProgress;
      });
    }, intervalSpeed);

    return () => clearInterval(progressInterval);
  }, [value]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn('h-full w-full flex-1 transition-all', color)}
        style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
