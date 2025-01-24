import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FormEvent, useState } from 'react';

interface Props {
  onSubmitFinish: () => void;
}

export const PdfForm = ({ onSubmitFinish }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/pdf', {
        method: 'POST',
        next: { revalidate: 3600 },
      });

      if (response.status !== 200) {
        console.error(response.status, response.statusText);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cv_jose_duque.pdf';
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
      onSubmitFinish();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <Separator orientation="horizontal" className="mt-2 mb-3" />
      <Button type="submit" size="sm" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate'}
      </Button>
    </form>
  );
};
