import { ExperienceItemContent } from '@/components/resume/experience/experience-item-content';
import { render, screen } from '@testing-library/react';
import { ExperienceType } from '@/interfaces';

describe('<ExperienceItemContent /> tests', () => {
  const { resume, screenshot, url }: Partial<ExperienceType> = {
    project: 'foo bar',
    resume: ['foo', 'bar', 'baz'],
    screenshot: '/foo/bar.webp',
    url: 'https://foo.bar',
  };

  it('Should match the snapshot with the default args', () => {
    const { container } = render(<ExperienceItemContent />);

    expect(container).toMatchSnapshot();

    expect(screen.queryByRole('list')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.queryByRole('listitem')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('Should match the snapshot with the available args - >1 resume items', () => {
    const { container } = render(
      <ExperienceItemContent resume={resume} screenshot={screenshot} url={url} />,
    );

    expect(container).toMatchSnapshot();

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(resume.length);

    const cta = screen.getByRole('link');
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveTextContent(/Project's link/);
    expect(cta).toHaveAttribute('href', url);

    const screenShot = screen.getByRole('img');
    expect(screenShot).toBeInTheDocument();
  });

  it('Should render a single paragraph if the resume array is equal to 1.', () => {
    const resumeParagraph = ['baz'];

    render(<ExperienceItemContent resume={resumeParagraph} />);

    expect(screen.queryByRole('list')).toBeNull();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);

    expect(screen.getByText(resumeParagraph[0])).toBeInTheDocument();
  });
});
