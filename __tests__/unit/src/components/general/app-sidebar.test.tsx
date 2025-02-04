import { render, screen } from '@testing-library/react';
import { MainSidebar } from '@/components/sidebar/main-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sheet } from '@/components/ui/sheet';

const professionalItems = [
  { title: 'Home', url: '/home' },
  { title: 'About', url: '/about' },
];

vi.mock('@/i18n/routing', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Link: ({ children, href, onClick, ...props }: any) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  ),
  usePathname: vi.fn(() => '/home'),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: Record<string, unknown> = {
      role: 'User Role',
      'professional.title': 'Professional Links',
      'footer.mobile.title': 'Footer Mobile',
      'professional.links': professionalItems,
    };

    const t = (key: string) => translations[key];

    t.raw = (key: string) => translations[key];

    return t;
  },
}));

describe('<MainSidebar /> tests', () => {
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

  it('Should match the snapshot', () => {
    const { container } = render(
      <Sheet>
        <SidebarProvider>
          <MainSidebar />
        </SidebarProvider>
      </Sheet>,
    );

    expect(container).toMatchSnapshot();
  });

  it("should render the required sections 'Avatar', 'Professional career'", () => {
    render(
      <Sheet>
        <SidebarProvider>
          <MainSidebar />
        </SidebarProvider>
      </Sheet>,
    );

    expect(screen.getByText('Professional Links')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();

    professionalItems.forEach(({ title, url }) => {
      const screenItem = screen.getByRole('link', { name: title });
      expect(screenItem).toBeInTheDocument();
      expect(screenItem).toHaveTextContent(title);
      expect(screenItem).toHaveAttribute('href', url);
    });
  });
});
