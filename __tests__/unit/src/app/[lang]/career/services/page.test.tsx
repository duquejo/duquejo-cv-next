import ServicesPage, { generateMetadata } from '@/app/[lang]/career/services/page';
import { render, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import validateMetadata from '../../../../../common/validate-metadata';

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: Record<string, unknown> = {
      title: 'services',
      content: [
        {
          title: 'title',
          subtitle: 'subtitle',
          icon: 'icon',
          description: 'description',
        },
      ],
      'badges.title': 'badges',
      'badges.content': [
        { name: 'hard skill', type: 'hard' },
        { name: 'soft skill', type: 'soft' },
      ],
      'languages.title': 'languages',
      'languages.content': [{ color: 'color', tag: 'tag', value: 'value' }],
    };

    const t = (key: string) => translations[key];
    t.raw = (key: string) => translations[key];

    t.rich = (key: string, tags: ReactNode) => key;
    return t;
  },
}));

// Mock @/lib for metadata validation tests
vi.mock('@/lib', async (importOriginal) => ({
  ...(await importOriginal()),
  createMetadata: vi.fn(),
}));

/**
 * Validate metadata generation for the Blog page.
 */
validateMetadata(generateMetadata, 'Services');

describe('<ServicesPage /> tests', () => {
  it('should render the page', () => {
    const { container } = render(<ServicesPage />);

    const wrapper = within(container);
    expect(wrapper).toBeDefined();

    expect(wrapper.getByRole('heading', { level: 1, name: 'title' })).toBeInTheDocument();
    expect(wrapper.getByRole('heading', { level: 2, name: 'badges' })).toBeInTheDocument();
    expect(wrapper.getByRole('heading', { level: 2, name: 'languages' })).toBeInTheDocument();

    expect(wrapper.getByText('hard skill')).toHaveClass('bg-secondary');
    expect(wrapper.getByText('soft skill')).not.toHaveClass('bg-secondary');
  });
});
