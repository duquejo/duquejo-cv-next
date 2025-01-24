import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PdfForm } from '@/components/pdf/pdf-form';
import { beforeEach, type Mock, vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('<PdfForm /> tests', () => {
  const mockedCallback = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        blob: () => Promise.resolve(new Blob(['testing'], { type: 'application/pdf' })),
      }),
    ) as Mock;

    global.URL.createObjectURL = vi.fn();
    global.URL.revokeObjectURL = vi.fn();
    HTMLAnchorElement.prototype.click = vi.fn(); // Mock anchor DOM element
  });

  it('should match the snapshot', () => {
    const { container } = render(<PdfForm onSubmitFinish={mockedCallback} />);

    expect(container).toMatchSnapshot();

    expect(screen.getByRole('button', { name: /Generate/ })).toBeInTheDocument();
  });

  it('should execute the form handlers when its submitted', async () => {
    render(<PdfForm onSubmitFinish={mockedCallback} />);

    fireEvent.click(screen.getByRole('button', { name: /Generate/ }));

    await waitFor(() => expect(mockedCallback).toHaveBeenCalledOnce());

    expect(fetch).toHaveBeenCalledWith('/api/v1/pdf', {
      method: 'POST',
      next: { revalidate: 3600 },
    });
    expect(mockedCallback).toHaveBeenCalled();
  });

  it('should disable the button when loading', async () => {
    render(<PdfForm onSubmitFinish={mockedCallback} />);

    const button = screen.getByRole('button', { name: /generate/i });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Generating...');

    await waitFor(() => expect(mockedCallback).toHaveBeenCalledOnce());

    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Generate');
  });

  it('should handle fetch errors gracefully', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 500,
        statusText: 'Internal Server Error',
      }),
    ) as Mock;

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    render(<PdfForm onSubmitFinish={mockedCallback} />);

    fireEvent.click(screen.getByRole('button', { name: /generate/i }));

    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith('Request failed with status code 500'),
    );

    expect(mockedCallback).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
