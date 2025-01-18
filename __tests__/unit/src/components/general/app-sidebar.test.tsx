import { render, screen } from '@testing-library/react';
import {
  AppSidebar,
  hobbiesItems,
  lastItems,
  professionalItems,
} from '@/components/general/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

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

  it("should render the required sections 'Avatar', 'Professional career', 'Hobbies' and misc.", () => {
    render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>,
    );

    expect(screen.getByText('Professional career')).toBeInTheDocument();
    expect(screen.getByText('Hobbies')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();

    professionalItems.forEach(({ title, url }) => {
      const screenItem = screen.getByRole('link', { name: title });
      expect(screenItem).toBeInTheDocument();
      expect(screenItem).toHaveTextContent(title);
      expect(screenItem).toHaveAttribute('href', url);
    });

    hobbiesItems.forEach(({ title, url }) => {
      const screenItem = screen.getByRole('link', { name: title });
      expect(screenItem).toBeInTheDocument();
      expect(screenItem).toHaveTextContent(title);
      expect(screenItem).toHaveAttribute('href', url);
    });

    lastItems.forEach(({ title, url }) => {
      const screenItem = screen.getByRole('link', { name: title });
      expect(screenItem).toBeInTheDocument();
      expect(screenItem).toHaveTextContent(title);
      expect(screenItem).toHaveAttribute('href', url);
    });
  });
});
