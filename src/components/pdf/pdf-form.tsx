import { type FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Props {
  onSubmitFinish: () => void;
  button: string;
  buttonLoading: string;
}

export const PdfForm = ({ onSubmitFinish, button, buttonLoading }: Props) => {
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
        throw new Error('Request failed with status code ' + response.status);
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
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col"
      aria-labelledby="form-title"
      aria-describedby="form-description"
    >
      <Separator orientation="horizontal" className="mt-2 mb-3" />
      <Button
        type="submit"
        className="cursor-pointer disabled:cursor-not-allowed"
        size="sm"
        disabled={isLoading}
      >
        {isLoading ? buttonLoading : button}
      </Button>
    </form>
  );
};
