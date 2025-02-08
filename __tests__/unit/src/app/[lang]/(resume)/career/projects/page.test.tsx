import { render, within } from '@testing-library/react';
import ProjectsPage from '@/app/[lang]/(resume)/career/projects/page';
import { beforeEach } from 'vitest';
import { getProjectByFilters, getProjectSkills } from '@/actions/projects';

vi.mock('@/actions/projects', () => ({
  getProjectByFilters: vi.fn(() => Promise.resolve([{ project: 'Test Project' }])),
  getProjectSkills: vi.fn(() => Promise.resolve([{ name: 'Skill1', value: 'skill1' }])),
}));

vi.mock('@/i18n/routing', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: () => {
    const translations: Record<string, unknown> = {
      title: 'projects',
    };
    return Promise.resolve((key: string) => translations[key]);
  },
}));

describe('<ProjectsPage /> tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getProjectByFilters).mockResolvedValue([
      {
        project: 'Test Project',
        start_date: '',
        enterprise: '',
        isRecent: false,
        role: '',
        additional_info: [],
      },
    ]);
  });

  it('should render the page', async () => {
    const { container } = render(await ProjectsPage());

    const wrapper = within(container);

    expect(wrapper).toBeDefined();
    expect(wrapper.getByRole('heading', { level: 1, name: 'projects' })).toBeInTheDocument();
    expect(wrapper.getAllByRole('listitem')).toHaveLength(1);
    expect(getProjectByFilters).toHaveBeenCalledWith([]);
    expect(getProjectSkills).toHaveBeenCalled();
  });

  it('should filter the projects if they are included in the searchParams', async () => {
    const searchCriteria = 'test';
    render(
      await ProjectsPage({
        searchParams: Promise.resolve({
          query: searchCriteria,
        }),
      }),
    );

    expect(getProjectByFilters).toHaveBeenCalledWith([searchCriteria]);
    expect(getProjectSkills).toHaveBeenCalled();
  });

  it('should filter the projects if they included multiple same key searchParams', async () => {
    const searchCriteria = ['test', 'test2'];
    render(
      await ProjectsPage({
        searchParams: Promise.resolve({
          query: searchCriteria,
        }),
      }),
    );

    expect(getProjectByFilters).toHaveBeenCalledWith(searchCriteria);
    expect(getProjectSkills).toHaveBeenCalled();
  });
});
