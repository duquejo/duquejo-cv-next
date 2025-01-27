'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ImageDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PdfForm } from '@/components/pdf/pdf-form';
import { useState } from 'react';

interface Props {
  className?: string;
  title: string;
  description: string;
  button: string;
  buttonLoading: string;
  variant?: ButtonProps['variant'];
}

export const PdfGeneratorToggle = ({
  description,
  button,
  title,
  buttonLoading,
  className,
  variant,
}: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover open={isPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          className={cn('h-10 w-10', className)}
          title={title}
          onClick={() => setIsPopoverOpen(true)}
        >
          <ImageDown className="h-8 w-8 lg:h-10 lg:w-10" aria-label={title} />
          <span className="sr-only">{title}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onInteractOutside={() => setIsPopoverOpen(false)}
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
      >
        <h4 className="font-medium leading-none mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        <PdfForm
          onSubmitFinish={() => setIsPopoverOpen(false)}
          button={button}
          buttonLoading={buttonLoading}
        />
      </PopoverContent>
    </Popover>
  );
};
