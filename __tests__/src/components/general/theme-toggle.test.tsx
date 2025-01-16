import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeToggle } from '@/components/general/theme-toggle';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { useTheme, type UseThemeProps } from 'next-themes';

vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

describe('<ThemeToggle /> tests', () => {
  const setThemeMock = vi.fn();
  let user: UserEvent;

  const mockThemeArgs: UseThemeProps = {
    theme: 'light',
    themes: ['light', 'dark', 'system'],
    systemTheme: 'light',
    setTheme: setThemeMock,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTheme).mockReturnValue({ ...mockThemeArgs });

    user = userEvent.setup();
  });

  it('Should match the snapshot with the default args', () => {
    const { container } = render(<ThemeToggle />);

    const button = screen.getByRole('button');

    expect(container).toMatchSnapshot();

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-state', 'closed');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('title', 'Toggle theme');
    expect(button).toHaveTextContent('Toggle theme');
    expect(button).toHaveClass('text-primary-foreground', 'hover:bg-primary/90');
  });

  it('Should match the snapshot with a given args', async () => {
    const { container } = render(
      <ThemeToggle variant="secondary" title="Testing toggle" className="bg-color-red" />,
    );

    const button = screen.getByRole('button');
    const btnSvgs = container.querySelectorAll('svg');

    expect(container).toMatchSnapshot();

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Testing toggle');
    expect(button).toHaveTextContent('Testing toggle');
    expect(button).toHaveClass(
      'text-secondary-foreground',
      'hover:bg-secondary/80',
      'bg-color-red',
    );

    expect(btnSvgs).toHaveLength(2);
  });

  it('Should handle the system theme by default', async () => {
    vi.mocked(useTheme).mockReturnValue({
      ...mockThemeArgs,
      theme: 'system',
      systemTheme: 'dark',
    });

    render(<ThemeToggle variant="secondary" />);

    const selectedTheme = screen.getByLabelText('Dark mode');
    expect(selectedTheme).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      const selectedThemeOption = screen.getByText('System');
      expect(selectedThemeOption).toHaveClass('bg-accent');

      fireEvent.click(selectedThemeOption);
    });

    expect(setThemeMock).toHaveBeenCalledWith('system');
  });

  it('Should handle the light theme', async () => {
    vi.mocked(useTheme).mockReturnValue({ ...mockThemeArgs });

    render(<ThemeToggle />);

    const selectedTheme = screen.getByLabelText('Light mode');
    expect(selectedTheme).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      const selectedThemeOption = screen.getByText('Light');
      expect(selectedThemeOption).toHaveClass('bg-accent');

      fireEvent.click(selectedThemeOption);
    });

    expect(setThemeMock).toHaveBeenCalledWith('light');
  });

  it('Should handle the dark theme', async () => {
    vi.mocked(useTheme).mockReturnValue({
      ...mockThemeArgs,
      theme: 'dark',
      systemTheme: 'dark',
    });

    render(<ThemeToggle />);

    const selectedTheme = screen.getByLabelText('Dark mode');
    expect(selectedTheme).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      const selectedThemeOption = screen.getByText('Dark');
      expect(selectedThemeOption).toHaveClass('bg-accent');

      fireEvent.click(selectedThemeOption);
    });

    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });

  it('Should trigger the button click events', async () => {
    render(<ThemeToggle variant="secondary" title="Testing toggle" className="bg-color-red" />);

    const button = screen.getByRole('button');
    const buttonWrapper = button.parentElement!;

    await user.click(button);

    expect(button).toHaveAttribute('data-state', 'open');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(buttonWrapper).toHaveAttribute('aria-hidden', 'true');
    expect(buttonWrapper).toHaveAttribute('data-aria-hidden', 'true');

    const themeOptionsDropdown = await waitFor(() => screen.getAllByRole('menuitem'));

    expect(themeOptionsDropdown).toHaveLength(3);
  });
});
