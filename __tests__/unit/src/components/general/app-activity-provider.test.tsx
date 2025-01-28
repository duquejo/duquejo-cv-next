import { render, screen } from '@testing-library/react';
import { AppActivityProvider } from '@/components/general/app-activity-provider';
import { SWRConfig } from 'swr';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    ({
      title: 'title',
      description: 'description',
    })[key],
}));

describe('<AppActivityProvider /> tests', () => {
  it('should match the snapshot', () => {
    const { container } = render(
      <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
        <AppActivityProvider>
          <div data-testid="child">Child Component</div>
        </AppActivityProvider>
      </SWRConfig>,
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should toggle loadEvents state on sheet open', async () => {
    const { container } = render(
      <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
        <AppActivityProvider defaultOpen={true}>
          <div data-testid="child">Child Component</div>
        </AppActivityProvider>
      </SWRConfig>,
    );

    expect(container).toMatchSnapshot();
  });
});
