import { getProjectByFilters, getProjectSkills } from '@/actions/projects';
import { filterProjectsByTags } from '@/lib';
import { getMessages } from 'next-intl/server';
import { beforeEach } from 'vitest';

vi.mock('next-intl/server', () => ({
  getMessages: vi.fn(),
}));

vi.mock('@/lib', () => ({
  filterProjectsByTags: vi.fn(),
}));

describe('Projects action', () => {
  const dummyIntlMessages = {
    Experience: {
      content: [{ additional_info: ['React', 'Next'] }, { additional_info: ['Next', 'Jest'] }],
    },
  } as never;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should return unique skills ordered alphabetically', async () => {
    // Arrange
    vi.mocked(getMessages).mockResolvedValue(dummyIntlMessages);

    const expectedSkills = [
      { name: 'Jest', value: 'jest' },
      { name: 'Next', value: 'next' },
      { name: 'React', value: 'react' },
    ];

    // Act
    const result = await getProjectSkills();

    // Assert
    expect(result).toEqual(expectedSkills);
  });

  test('Should filter the projects when the keywords are given', async () => {
    // Arrange
    vi.mocked(getMessages).mockResolvedValue(dummyIntlMessages);

    const filtersArray = ['React'];
    const expectedProject = [
      {
        additional_info: ['React', 'Next'],
      },
    ] as never;

    vi.mocked(filterProjectsByTags).mockReturnValue(expectedProject);

    // Act
    const result = await getProjectByFilters(filtersArray);

    // Assert
    expect(filterProjectsByTags).toHaveBeenCalledWith(
      dummyIntlMessages['Experience']['content'],
      filtersArray,
    );
    expect(result).toEqual(expectedProject);
  });

  test('Should return all projects if no filters are received', async () => {
    // Arrange
    vi.mocked(getMessages).mockResolvedValue(dummyIntlMessages);
    const filtersArray: string[] = [];
    const expectedProjects = dummyIntlMessages['Experience']['content'];

    // Act
    const result = await getProjectByFilters(filtersArray);

    // Assert
    expect(result).toEqual(expectedProjects);
  });
});
