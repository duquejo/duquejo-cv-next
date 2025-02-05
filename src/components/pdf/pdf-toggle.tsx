'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ImageDown } from 'lucide-react';
import { cn } from '@/lib';
import { PdfForm } from '@/components/pdf/pdf-form';
import { useState } from 'react';

interface Props {
  className?: string;
  buttonTitle: string;
  formDescription: string;
  formTitle: string;
  formButtonText: string;
  formButtonTextLoading: string;
  variant?: ButtonProps['variant'];
}

export const PdfGeneratorToggle = ({
  formDescription,
  formButtonText,
  formTitle,
  buttonTitle,
  formButtonTextLoading,
  className,
  variant,
}: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover key="pdf" open={isPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          className={cn('h-10 w-10', className)}
          onClick={() => setIsPopoverOpen(true)}
        >
          <ImageDown className="h-8 w-8 lg:h-10 lg:w-10" aria-label={buttonTitle} />
          <span className="sr-only">{buttonTitle}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        role="dialog"
        aria-label={formTitle}
        onInteractOutside={() => setIsPopoverOpen(false)}
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
      >
        <h2 id="form-title" className="font-medium leading-none mb-2 text-sm">
          {formTitle}
        </h2>
        <p id="form-description" className="text-muted-foreground text-xs">
          {formDescription}
        </p>
        <PdfForm
          onSubmitFinish={() => setIsPopoverOpen(false)}
          button={formButtonText}
          buttonLoading={formButtonTextLoading}
        />
      </PopoverContent>
    </Popover>
  );
};
