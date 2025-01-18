import { render, type RenderResult, screen } from '@testing-library/react';
import { AppFooter, SOCIAL_DATA as social } from '@/components/general/app-footer';

describe('<AppFooter /> tests', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<AppFooter />);

    const copyDate = component.container.querySelector('span');
    if (copyDate) {
      copyDate.textContent = '© 1992 José Duque';
    }
  });

  it('Should match the snapshot', () => {
    // Arrange & Act
    const footer = screen.getByRole('contentinfo');

    // Assert
    expect(component.container).toMatchSnapshot();
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('© 1992 José Duque');

    social.map((s) => {
      const link = screen.getByRole('link', { name: s.name });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', s.link);
      expect(link).toHaveAttribute('title', s.name);
      expect(link).toHaveAttribute('aria-label', s.name);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toContainHTML('svg');
    });
  });
});
