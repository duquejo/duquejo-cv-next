import { render, screen } from '@testing-library/react';
import { EventCard } from '@/components/events/event-card';
import { type Event, EventType } from '@/interfaces';

describe('<EventCard /> tests', () => {
  const args: Event = {
    id: '123',
    type: EventType.PushEvent,
    actor: {
      id: 123,
      url: 'https://foo.bar',
      avatar_url: 'https://foo.bar',
      login: 'johndoe',
      display_login: 'johndoe',
      gravatar_id: '123',
    },
    repo: {
      url: 'https://foo.bar',
      id: 213,
      name: 'johndoe',
    },
    payload: {
      commits: [],
    },
    public: false,
    created_at: 'Foo 123',
  };

  it('should match the snapshot', () => {
    const { container } = render(<EventCard {...args} />);

    expect(container).toMatchSnapshot();

    const avatar = screen.getByAltText(args.actor.display_login);

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('alt', args.actor.display_login);
    expect(avatar).toHaveAttribute('src');

    expect(screen.getByRole('link')).toBeInTheDocument();

    expect(screen.getByTestId('event-action')).toBeInTheDocument();

    // @TODO: Add the remaining conditional tags
  });
});
