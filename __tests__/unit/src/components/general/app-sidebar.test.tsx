import { render, screen } from '@testing-library/react';
import { AppSidebar } from '@/components/general/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

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
      'professional.links': professionalItems,
    };

    const t = (key: string) => translations[key];

    t.raw = (key: string) => translations[key];

    return t;
  },
}));

describe('<AppSidebar /> tests', () => {
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
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it("should render the required sections 'Avatar', 'Professional career'", () => {
    render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>,
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
