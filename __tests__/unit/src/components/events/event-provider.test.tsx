import { render, screen } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { EventProvider } from '@/components/events/event-provider';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    ({
      title: 'title',
      description: 'description',
    })[key],
}));

describe('<EventProvider /> tests', () => {
  it('should match the snapshot', () => {
    const { container } = render(
      <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
        <EventProvider>
          <div data-testid="child">Child Component</div>
        </EventProvider>
      </SWRConfig>,
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should toggle loadEvents state on sheet open', async () => {
    const { container } = render(
      <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
        <EventProvider defaultOpen={true}>
          <div data-testid="child">Child Component</div>
        </EventProvider>
      </SWRConfig>,
    );

    expect(container).toMatchSnapshot();
  });
});
