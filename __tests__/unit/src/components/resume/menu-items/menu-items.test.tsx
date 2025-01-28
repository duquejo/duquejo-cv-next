import { MenuItems } from '@/components/menu/menu-items/menu-items';
import { fireEvent, render, screen } from '@testing-library/react';
import { MenuItem } from '@/interfaces';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import type { Pathnames } from '@/i18n/routing';

// Partial mocking
vi.mock('@/components/ui/sidebar', async (importOriginal) => ({
  ...(await importOriginal()),
  useSidebar: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Link: ({ children, href, onClick, ...props }: any) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  ),
  usePathname: vi.fn(() => '/home'),
}));

describe('<MenuItems /> tests', () => {
  const setOpenMobileMock = vi.fn();

  const mockItems: MenuItem[] = [
    {
      title: 'Foo',
      url: '/home' as Pathnames,
    },
    {
      title: 'Bar',
      url: '/about' as Pathnames,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: 'mock',
      },
    });

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

    vi.mocked(useSidebar).mockReturnValue({
      state: 'expanded',
      open: true,
      isMobile: true,
      openMobile: true,
      setOpen: vi.fn(),
      toggleSidebar: vi.fn(),
      setOpenMobile: setOpenMobileMock,
    });
  });

  it('Should match the snapshot with the default args', () => {
    const { container } = render(
      <SidebarProvider>
        <MenuItems items={mockItems} />
      </SidebarProvider>,
    );
    expect(container).toMatchSnapshot();

    mockItems.forEach((item) => {
      const aTag = screen.getByRole('link', { name: item.title });
      expect(aTag).toHaveAttribute('href', item.url);
      expect(aTag).toContainHTML('svg');
    });
  });

  it('Should match the snapshot with the available args', () => {
    const { container } = render(
      <SidebarProvider>
        <MenuItems items={mockItems} size="lg" />
      </SidebarProvider>,
    );
    expect(container).toMatchSnapshot();

    mockItems.forEach((item) => {
      expect(screen.getByRole('link', { name: item.title })).toHaveAttribute('data-size', 'lg');
    });
  });

  it('Should handle the click events', () => {
    render(
      <SidebarProvider>
        <MenuItems items={mockItems} />
      </SidebarProvider>,
    );

    const item = screen.getByRole('link', { name: mockItems[0].title });

    /**
     * @see Error: Not implemented: navigation (except hash changes)
     * Adverse routing while clicking & adding the setOpenMobile action
     */
    item.addEventListener('click', (e) => {
      e.preventDefault();
    });

    fireEvent.click(item);

    expect(setOpenMobileMock).toHaveBeenCalledWith(false);
  });
});
