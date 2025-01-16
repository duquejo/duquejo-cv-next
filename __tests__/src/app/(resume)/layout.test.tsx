import { render, screen, within } from '@testing-library/react';
import ResumeLayout from '@/app/(resume)/layout';

describe('Resume layout test', () => {
  it('should render the main wrapper layout', () => {
    render(
      <ResumeLayout>
        <p>ResumeLayout</p>
      </ResumeLayout>,
    );

    const main = within(screen.getByRole('main'));

    expect(main).toBeDefined();
    expect(main.getByRole('contentinfo')).toBeInTheDocument();
    expect(main.getByText('ResumeLayout')).toBeInTheDocument();
  });
});
