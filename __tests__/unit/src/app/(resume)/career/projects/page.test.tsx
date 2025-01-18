import { render, within } from '@testing-library/react';
import ProjectsPage from '@/app/(resume)/career/projects/page';

describe('<ProjectsPage /> tests', () => {
  it('should match the snapshot', () => {
    const { container } = render(<ProjectsPage />);

    expect(container).toMatchSnapshot();

    const wrapper = within(container);
    expect(wrapper).toBeDefined();

    expect(wrapper.getByRole('heading', { level: 1, name: /Latest projects/ })).toBeInTheDocument();
  });
});
