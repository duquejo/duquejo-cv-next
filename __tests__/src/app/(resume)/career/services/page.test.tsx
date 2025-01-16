import ServicesPage from '@/app/(resume)/career/services/page';
import { render, within } from '@testing-library/react';

describe('<ServicesPage /> tests', () => {
  it('should match the snapshot', () => {
    const { container } = render(<ServicesPage />);

    expect(container).toMatchSnapshot();

    const wrapper = within(container);
    expect(wrapper).toBeDefined();

    expect(
      wrapper.getByRole('heading', { level: 1, name: /Services & Technology stack/ }),
    ).toBeInTheDocument();
    expect(
      wrapper.getByRole('heading', { level: 2, name: /Main tech languages/ }),
    ).toBeInTheDocument();
    expect(
      wrapper.getByRole('heading', { level: 2, name: /Tools & Soft-skills/ }),
    ).toBeInTheDocument();
  });
});
