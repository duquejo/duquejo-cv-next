import { render, screen } from '@testing-library/react';
import { ExperienceItemContent } from '@/components/timeline/experience-item-content';

describe('<ExperienceItemContent /> tests', () => {
  const args = {
    resume: ['foo', 'bar', 'baz'],
    contentTitle: 'Mocked title',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should match the snapshot with the default args', () => {
    const { container } = render(<ExperienceItemContent resume={args.resume} />);

    expect(container).toMatchSnapshot();

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(args.resume.length);
    expect(screen.queryByText(args.contentTitle)).not.toBeInTheDocument();
  });

  it('Should match the snapshot with the available args - >1 resume items', () => {
    const { container } = render(
      <ExperienceItemContent contentTitle={args.contentTitle} resume={args.resume} />,
    );

    expect(container).toMatchSnapshot();

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(args.resume.length);
    expect(screen.queryByText(args.contentTitle)).toBeInTheDocument();
  });
});
