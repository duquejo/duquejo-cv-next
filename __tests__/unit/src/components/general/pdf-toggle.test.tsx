import { PdfGeneratorToggle } from '@/components/general/pdf-toggle';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';

describe('<PdfGeneratorToggle /> tests', () => {
  let user: UserEvent;

  beforeEach(() => {
    vi.clearAllMocks();

    user = userEvent.setup();
  });

  it('Should match the snapshot with the default args', () => {
    const { container } = render(<PdfGeneratorToggle />);

    const button = screen.getByRole('button');

    expect(container).toMatchSnapshot();

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-state', 'closed');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('title', 'Download CV');
    expect(button).toHaveTextContent('Download CV');
    expect(button).toHaveClass('text-primary-foreground', 'hover:bg-primary/90');
  });

  it('Should match the snapshot with a given args', async () => {
    const { container } = render(
      <PdfGeneratorToggle variant="secondary" title="Testing PDF" className="bg-color-red" />,
    );

    const button = screen.getByRole('button');

    expect(container).toMatchSnapshot();

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Testing PDF');
    expect(button).toHaveTextContent('Testing PDF');
    expect(button).toHaveClass(
      'text-secondary-foreground',
      'hover:bg-secondary/80',
      'bg-color-red',
    );
  });

  it('Should handle the outside popover click', async () => {
    render(<PdfGeneratorToggle />);

    const button = screen.getByRole('button');

    await user.click(button);

    await waitFor(() => screen.getByRole('button', { name: /Generate/ }));

    expect(button).toHaveAttribute('data-state', 'open');
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.click(document.body); // Outside click

    expect(button).toHaveAttribute('data-state', 'closed');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('Should handle the keydown event', async () => {
    render(<PdfGeneratorToggle />);

    const button = screen.getByRole('button');

    await user.click(button);

    await waitFor(() => screen.getByRole('button', { name: /Generate/ }));

    expect(button).toHaveAttribute('data-state', 'open');
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document.body, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    expect(button).toHaveAttribute('data-state', 'closed');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
