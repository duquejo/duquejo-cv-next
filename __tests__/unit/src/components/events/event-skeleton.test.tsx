import { EventSkeleton } from '@/components/events/event-skeleton';
import { render, screen } from '@testing-library/react';

describe('<EventSkeleton /> tests', () => {
  it('should match the snapshot', () => {
    const { container } = render(<EventSkeleton />);

    expect(container).toMatchSnapshot();

    expect(screen.getAllByTestId('loading')).toHaveLength(2);
  });

  it('should match the snapshot for a provided amount', () => {
    render(<EventSkeleton rounds={1} />);

    expect(screen.getAllByTestId('loading')).toHaveLength(1);
  });
});
