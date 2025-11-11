import { cleanup, render, screen } from '@testing-library/react';
import { EventCard } from '@/components/events/event-card';
import type { Event } from '@/interfaces';

describe('<EventCard /> tests', () => {
  const args: Event = {
    id: '123',
    type: 'PushEvent',
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
    created_at: '2024-01-23T16:16:53.477Z',
  };

  it('should match the snapshot', () => {
    const { container } = render(<EventCard {...args} />);

    expect(container).toMatchSnapshot();
  });

  it('should render the optional fields if they are given', () => {
    const completeArgs: Event = {
      ...args,
      payload: {
        ref: 'main', // Optional
        ref_type: 'WatchEvent', // Optional
        description: 'Commit title',
        commits: [
          {
            // Optional
            author: {
              name: 'johndoe',
              email: 'johndoe@email.com',
            },
            url: 'https://github.com/johndoe',
            sha: '123',
            message: 'Commit detail',
            distinct: false,
          },
        ],
      },
    };
    const { container } = render(<EventCard {...completeArgs} />);

    expect(container).toMatchSnapshot();

    expect(screen.getByText(completeArgs.payload.ref!)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute(
      'href',
      'https://github.com/johndoe',
    );
    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute(
      'rel',
      'noopener noreferrer nofollow',
    );
    expect(screen.getByText(completeArgs.payload.description!)).toBeInTheDocument();
    expect(screen.getByText(completeArgs.payload.ref_type!)).toBeInTheDocument();
  });

  it('should render the event icon conditionally', () => {
    const events = [
      {
        type: 'CreateEvent',
        expectedColor: 'bg-teal-400',
      },
      {
        type: 'PullRequestEvent',
        expectedColor: 'bg-yellow-400',
      },
      {
        type: 'PushEvent',
        expectedColor: 'bg-red-400',
      },
      {
        type: 'WatchEvent',
        expectedColor: 'bg-amber-300',
      },
      {
        type: 'PullRequestReviewEvent',
        expectedColor: 'bg-cyan-300',
      },
      {
        type: 'OtherEventType',
        expectedColor: 'bg-purple-400',
      },
    ];

    events.forEach((event) => {
      const eventConfig: Event = {
        ...args,
        type: event.type,
      };
      render(<EventCard {...eventConfig} />);

      expect(screen.getByTestId('event-action')).toBeInTheDocument();
      expect(screen.getByTestId('event-action')).toHaveClass(event.expectedColor);

      cleanup();
    });
  });
});
