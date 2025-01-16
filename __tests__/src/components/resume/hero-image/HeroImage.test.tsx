import { HeroImage } from '@/components/resume/hero-image/HeroImage';
import { render } from '@testing-library/react';

describe('<HeroImage /> tests', () => {
  it('Should match the snapshot with the default args', () => {
    const { container } = render(<HeroImage />);

    expect(container).toMatchSnapshot();
  });

  it('Should add the given css classes if they are given', () => {
    const { container } = render(<HeroImage className="bg-red-500" />);

    expect(container.querySelector('picture')).toBeInTheDocument();
    expect(container.querySelector('picture')).toHaveClass('bg-red-500');
  });
});
