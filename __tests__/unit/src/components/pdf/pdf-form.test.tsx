import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PdfForm } from '@/components/pdf/pdf-form';
import { afterEach, beforeEach, MockInstance, vi } from 'vitest';
import { worker } from '@/msw/worker';
import { errorHandlers } from '@/msw/handlers';

describe('<PdfForm /> tests', () => {
  let fetchSpy: MockInstance;

  const mockedCallback = vi.fn();

  const args = {
    button: 'Mocked button',
    buttonLoading: 'Mocked loading',
    onSubmitFinish: mockedCallback,
  };

  const expectedServiceCall = {
    method: 'POST',
    next: { revalidate: 3600 },
  };

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, 'fetch');
    global.URL.createObjectURL = vi.fn();
    global.URL.revokeObjectURL = vi.fn();
    HTMLAnchorElement.prototype.click = vi.fn(); // Mock anchor DOM element
  });

  afterEach(() => {
    vi.clearAllMocks();
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

    expect(fetchSpy).toHaveBeenCalledWith('/api/v1/pdf', expectedServiceCall);
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

    expect(fetchSpy).toHaveBeenCalledWith('/api/v1/pdf', expectedServiceCall);
  });

  it('should handle fetch errors gracefully', async () => {
    worker.use(...errorHandlers);

    const consoleSpy = vi.spyOn(console, 'error');

    render(<PdfForm {...args} />);

    fireEvent.click(screen.getByRole('button', { name: args.button }));

    await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch'));

    expect(mockedCallback).not.toHaveBeenCalled();

    expect(fetchSpy).toHaveBeenCalledWith('/api/v1/pdf', expectedServiceCall);
  });
});
