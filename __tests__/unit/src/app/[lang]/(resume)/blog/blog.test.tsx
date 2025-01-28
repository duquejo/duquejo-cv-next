import { render, within } from '@testing-library/react';
import BlogPage from '@/app/[lang]/(resume)/blog/page';

describe('<BlogPage /> tests', () => {
  it('should render the page', () => {
    const { container } = render(<BlogPage />);

    const wrapper = within(container);
    expect(wrapper).toBeDefined();

    expect(wrapper.getByRole('heading', { level: 1, name: /Blog/ })).toBeInTheDocument();
  });
});
