import { render, screen } from '@testing-library/react';
import { HeroImage } from '@/components/resume/hero-image';

describe('<HeroImage /> tests', () => {
  it('Should match the snapshot with the default args', () => {
    const { container } = render(<HeroImage />);

    expect(container).toMatchSnapshot();
  });

  it('Should add the given css classes if they are given', () => {
    render(<HeroImage className="bg-red-500" />);

    expect(screen.getByTestId('hero-image')).toBeInTheDocument();
    expect(screen.getByTestId('hero-image')).toHaveClass('bg-red-500');
  });
});
