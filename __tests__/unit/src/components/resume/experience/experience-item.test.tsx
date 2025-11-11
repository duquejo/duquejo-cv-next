import type { ExperienceType } from '@/interfaces';
import { render, screen } from '@testing-library/react';
import { ExperienceItem } from '@/components/resume/experience-item';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    ({
      subtitle: 'subtitle',
      button: 'button',
      footer: 'footer',
    })[key],
}));

describe('<ExperienceItemContent /> tests', () => {
  const data: Required<ExperienceType> = {
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

  const textData = {
    experienceItemTitle: 'experience item title',
    experienceItemButtonLabel: 'experience button label',
    experienceFooterText: 'experience footer text',
  };

  it('Should match the snapshot with the default args', () => {
    const { resume, screenshot, url, end_date, ...mandatoryFields } = data;

    const { container } = render(<ExperienceItem {...mandatoryFields} {...textData} />);

    expect(container).toMatchSnapshot();

    expect(screen.getByTestId('time')).not.toHaveTextContent(end_date);
    expect(screen.getByTestId('time')).not.toHaveClass('border-yellow-400');
  });

  it('Should match the snapshot with the available args', () => {
    const { container } = render(<ExperienceItem {...data} {...textData} />);

    expect(container).toMatchSnapshot();

    expect(screen.getByText(textData.experienceItemTitle)).toBeInTheDocument();
    data.additional_info.forEach((item: string) =>
      expect(screen.getByText(item)).toBeInTheDocument(),
    );

    expect(screen.getByTestId('time')).toHaveTextContent(data.start_date);
    expect(screen.getByTestId('time')).toHaveTextContent(data.end_date);
  });

  it('Should stylize the time tags if the parameter "isRecent" is truthy', () => {
    const isRecentWithData = {
      ...data,
      isRecent: true,
    };

    render(<ExperienceItem {...isRecentWithData} {...textData} />);

    expect(screen.getByTestId('time')).toHaveClass('border-primary');
    expect(screen.getByTestId('detail')).toHaveClass('bg-primary');
  });
});
