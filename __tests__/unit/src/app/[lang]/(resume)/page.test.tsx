import { render, within } from '@testing-library/react';
import MainPage from '@/app/[lang]/(resume)/page';
import type { ReactNode } from 'react';

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: Record<string, unknown> = {
      role: 'role',
      'resume.greetings': 'resume.greetings',
      'resume.excerpt1': 'resume.excerpt1',
      content: [
        {
          title: 'title',
          subtitle: 'subtitle',
          icon: 'icon',
          description: 'description',
        },
      ],
      'education.title': 'education.title',
      'education.content': [
        {
          start_date: 'start_date',
          enterprise: 'enterprise',
          isRecent: 'isRecent',
          project: 'project',
          role: 'role',
        },
      ],
      'languages.title': 'languages.title',
      'languages.content': [
        {
          title: 'title',
          subtitle: 'subtitle',
        },
      ],
    };

    const t = (key: string) => translations[key];
    t.raw = (key: string) => translations[key];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    t.rich = (key: string, tags: ReactNode) => key;
    return t;
  },
}));

describe('<MainPage /> tests', () => {
  it('should render the page', () => {
    const { container } = render(<MainPage />);

    const wrapper = within(container);
    expect(wrapper).toBeDefined();

    expect(
      wrapper.getByRole('heading', { level: 1, name: /resume.greetings/ }),
    ).toBeInTheDocument();
  });
});
