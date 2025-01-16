import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

vi.mock('next/font/google', () => ({
  Inter: () => ({
    style: {
      fontFamily: 'mocked',
    },
    className: 'mocked',
  }),
}));

describe('Root layout test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 768px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('should render the main wrapper layout', () => {
    render(
      <RootLayout>
        <p>MainLayout</p>
      </RootLayout>,
      { container: document },
    );

    expect(screen.getByText('MainLayout')).toBeInTheDocument();
  });
});
