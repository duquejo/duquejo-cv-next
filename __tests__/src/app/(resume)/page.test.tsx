import MainPage from '@/app/(resume)/page';
import { render, within } from '@testing-library/react';

describe('<MainPage /> tests', () => {
  it('Should match the snapshot', () => {
    const { container } = render(<MainPage />);

    expect(container).toMatchSnapshot();

    const wrapper = within(container);
    expect(wrapper).toBeDefined();

    expect(
      wrapper.getByRole('heading', { level: 1, name: /Hi, I'm José Duque./ }),
    ).toBeInTheDocument();
    expect(
      wrapper.getByRole('heading', { level: 2, name: 'What have I done?' }),
    ).toBeInTheDocument();
    expect(
      wrapper.getByRole('heading', { level: 2, name: 'Academic studies & Certifications' }),
    ).toBeInTheDocument();
    expect(wrapper.getByRole('heading', { level: 2, name: 'Languages' })).toBeInTheDocument();
  });
});
