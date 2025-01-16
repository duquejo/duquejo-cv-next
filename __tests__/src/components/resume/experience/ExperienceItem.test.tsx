import { ExperienceType } from '@/interfaces';
import { render, screen } from '@testing-library/react';
import { ExperienceItem } from '@/components/resume/experience/ExperienceItem';

describe('<ExperienceItemContent /> tests', () => {
  const data: ExperienceType = {
    resume: ['foo', 'bar', 'baz'],
    screenshot: '/foo/bar.webp',
    url: 'https://foo.bar',
    enterprise: 'John Doe',
    additional_info: ['Next JS', 'React', 'Vitest'],
    isRecent: false,
    start_date: '2025-01-01',
    end_date: '2025-01-02',
    role: 'Software analyst',
    project: 'Foo-Bar Baz Inc.',
  };

  it('Should match the snapshot with the default args', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { resume, additional_info, screenshot, url, end_date, ...mandatoryFields } = data;

    const { container } = render(<ExperienceItem {...mandatoryFields} />);

    expect(container).toMatchSnapshot();

    expect(screen.getByTestId('time')).not.toHaveTextContent(data.end_date!);
    expect(screen.getByTestId('time')).not.toHaveClass('border-yellow-400');

    expect(screen.getByTestId('detail')).not.toHaveClass('bg-primary');
  });

  it('Should match the snapshot with the available args', () => {
    const { container } = render(<ExperienceItem {...data} />);

    expect(container).toMatchSnapshot();

    expect(screen.getByText('Skills')).toBeInTheDocument();
    data.additional_info!.forEach((item) => expect(screen.getByText(item)).toBeInTheDocument());

    expect(screen.getByTestId('time')).toHaveTextContent(data.start_date);
    expect(screen.getByTestId('time')).toHaveTextContent(data.end_date!);
  });

  it('Should stylize the time tags if the parameter "isRecent" is truthy', () => {
    const isRecentWithData = {
      ...data,
      isRecent: true,
    };

    render(<ExperienceItem {...isRecentWithData} />);

    expect(screen.getByTestId('time')).toHaveClass('border-yellow-400');
    expect(screen.getByTestId('detail')).toHaveClass('bg-primary');
  });
});
