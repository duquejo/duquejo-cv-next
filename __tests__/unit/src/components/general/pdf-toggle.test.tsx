import { PdfGeneratorToggle } from '@/components/general/pdf-toggle';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';

describe('<PdfGeneratorToggle /> tests', () => {
  let user: UserEvent;

  const props = {
    buttonTitle: 'mocked title',
    formTitle: 'mocked form title',
    formDescription: 'mocked description',
    formButtonText: 'mocked button',
    formButtonTextLoading: 'mocked loading',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    user = userEvent.setup();
  });

  const openButtonTriggerEvt = async (): Promise<HTMLElement> => {
    render(<PdfGeneratorToggle {...props} />);

    const button = screen.getByRole('button');

    await user.click(button);

    await waitFor(() => screen.getByRole('button', { name: props.formButtonText }));

    expect(button).toHaveAttribute('data-state', 'open');
    expect(button).toHaveAttribute('aria-expanded', 'true');

    return button;
  };

  it('Should match the snapshot with the default args', () => {
    const { container } = render(<PdfGeneratorToggle {...props} />);

    const button = screen.getByRole('button');

    expect(container).toMatchSnapshot();

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-state', 'closed');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveTextContent(props.buttonTitle);
    expect(button).toHaveClass('text-primary-foreground', 'hover:bg-primary/90');
  });

  it('Should match the snapshot with a given args', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { buttonTitle, ...rest } = props;
    const { container } = render(
      <PdfGeneratorToggle
        variant="secondary"
        buttonTitle="Testing PDF"
        className="bg-color-red"
        {...rest}
      />,
    );

    const button = screen.getByRole('button');

    expect(container).toMatchSnapshot();

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Testing PDF');
    expect(button).toHaveClass(
      'text-secondary-foreground',
      'hover:bg-secondary/80',
      'bg-color-red',
    );
  });

  it('Should handle the outside popover click', async () => {
    const button = await openButtonTriggerEvt();

    await user.click(document.body); // Outside click

    expect(button).toHaveAttribute('data-state', 'closed');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('Should handle the keydown event', async () => {
    const button = await openButtonTriggerEvt();

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
