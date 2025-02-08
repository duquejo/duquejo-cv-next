import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach } from 'vitest';
import { MobileHeader } from '@/components/header/mobile-header';

let openMobileValue = false;
const mockToggleSidebar = vi.fn();

vi.mock('@/components/ui/sidebar', () => {
  return {
    useSidebar: () => ({
      openMobile: openMobileValue,
      toggleSidebar: mockToggleSidebar,
    }),
  };
});

// Mock para useTranslations de next-intl
vi.mock('next-intl', () => {
  return {
    useTranslations: () => {
      return (key: string) => `translated-${key}`;
    },
  };
});

describe('<MobileHeader /> tests', () => {
  beforeEach(() => {
    openMobileValue = false;
    mockToggleSidebar.mockClear();
  });

  it('should match the snapshot', () => {
    const { container } = render(<MobileHeader />);

    expect(container).toMatchSnapshot();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /translated-title/i })).toHaveAttribute(
      'title',
      'translated-title',
    );
  });

  it('Should call the toggleSidebar when the button is clicked', () => {
    // Arrange & Act
    render(<MobileHeader />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockToggleSidebar).toHaveBeenCalled();
  });

  it('Should render the close icon when the sidebar is truthy', () => {
    openMobileValue = true;
    const { container } = render(<MobileHeader />);

    expect(container).toMatchSnapshot();

    // Act & Assert
    expect(screen.getByLabelText('close')).toBeInTheDocument();
    expect(screen.queryByLabelText('open')).toBeNull();
  });
});
