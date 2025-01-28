import { render, within } from '@testing-library/react';
import ProjectsPage from '@/app/[lang]/(resume)/career/projects/page';

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: Record<string, unknown> = {
      title: 'projects',
      content: [
        {
          start_date: 'start_date',
          enterprise: 'enterprise',
          isRecent: 'isRecent',
          project: 'project',
          role: 'role',
        },
      ],
    };

    const t = (key: string) => translations[key];
    t.raw = (key: string) => translations[key];
    return t;
  },
}));

describe('<ProjectsPage /> tests', () => {
  it('should render the page', () => {
    const { container } = render(<ProjectsPage />);

    const wrapper = within(container);
    expect(wrapper).toBeDefined();

    expect(wrapper.getByRole('heading', { level: 1, name: 'projects' })).toBeInTheDocument();
  });
});
