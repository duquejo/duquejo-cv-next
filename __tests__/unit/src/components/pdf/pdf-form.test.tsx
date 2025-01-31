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

  const args = {
    button: 'Mocked button',
    buttonLoading: 'Mocked loading',
    onSubmitFinish: mockedCallback,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    global.fetch = vi.fn().mockImplementation(() =>
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
    const { container } = render(<PdfForm {...args} />);

    expect(container).toMatchSnapshot();

    expect(screen.getByRole('button', { name: args.button })).toBeInTheDocument();
  });

  it('should execute the form handlers when its submitted', async () => {
    render(<PdfForm {...args} />);

    fireEvent.click(screen.getByRole('button', { name: args.button }));

    await waitFor(() => expect(mockedCallback).toHaveBeenCalledOnce());

    expect(fetch).toHaveBeenCalledWith('/api/v1/pdf', {
      method: 'POST',
      next: { revalidate: 3600 },
    });
    expect(mockedCallback).toHaveBeenCalled();
  });

  it('should disable the button when loading', async () => {
    render(<PdfForm {...args} />);

    const button = screen.getByRole('button', { name: args.button });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(args.buttonLoading);

    await waitFor(() => expect(mockedCallback).toHaveBeenCalledOnce());

    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent(args.button);
  });

  it('should handle fetch errors gracefully', async () => {
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        statusText: 'Internal Server Error',
      }),
    ) as Mock;

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    render(<PdfForm {...args} />);

    fireEvent.click(screen.getByRole('button', { name: args.button }));

    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith('Request failed with status code 500'),
    );

    expect(mockedCallback).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
