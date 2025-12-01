import { CodeBlock } from '@/components/general/code-block';
import { DynamicIcon } from '@/components/general/dynamic-icon';
import { RichText } from '@/components/general/rich-text';
import { render, screen } from '@testing-library/react';

vi.mock('next/dynamic', () => ({
  default: (importFn: () => Promise<unknown>, options?: { loading?: () => any }) => {
    const MockComponent = (props: Record<string, unknown>) => (
      <span data-testid="dynamic-icon" {...props} />
    );
    MockComponent.displayName = 'DynamicIcon';

    // Return loading component if provided
    if (options?.loading) {
      const LoadingComponent = options.loading;
      MockComponent.Loading = LoadingComponent;
    }

    return MockComponent;
  },
}));

vi.mock('react-syntax-highlighter', () => {
  const MockSyntaxHighlighter = ({
    children,
    language,
  }: {
    children: string;
    language?: string;
  }) => (
    <pre data-testid="syntax-highlighter" data-language={language}>
      <code>{children}</code>
    </pre>
  );
  MockSyntaxHighlighter.registerLanguage = vi.fn();
  return { Light: MockSyntaxHighlighter };
});

vi.mock('react-syntax-highlighter/dist/cjs/languages/hljs/markdown', () => ({
  default: {},
}));

vi.mock('react-syntax-highlighter/dist/cjs/styles/hljs/lioshi', () => ({
  default: {},
}));

vi.mock('react-syntax-highlighter/dist/esm/languages/hljs/typescript', () => ({
  default: {},
}));

describe('General components unit tests', () => {
  it('should render components - CodeBlock', () => {
    // Arrange
    const codeString = `const hello = "Hello, World!";`;
    const language = 'javascript';

    // Act
    render(<CodeBlock code={codeString} language={language} />);

    // Assert
    expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument();
    expect(screen.getByText(codeString)).toBeInTheDocument();
    expect(screen.getByText(language)).toBeInTheDocument();
  });

  it('should render components - RichText bold tag', () => {
    // Act
    render(<RichText>{(tags) => tags.b('bold text content')}</RichText>);

    // Assert
    const boldElement = screen.getByText('bold text content');
    expect(boldElement).toBeInTheDocument();
    expect(boldElement.tagName).toBe('B');
  });

  it('should render components - RichText italic tag', () => {
    // Act
    render(<RichText>{(tags) => tags.i('italic text content')}</RichText>);

    // Assert
    const italicElement = screen.getByText('italic text content');
    expect(italicElement).toBeInTheDocument();
    expect(italicElement.tagName).toBe('I');
  });

  it('should render components - DynamicIcon', () => {
    // Act
    render(<DynamicIcon iconName="Database" size={24} />);

    // Assert
    expect(screen.getByTestId('dynamic-icon')).toBeInTheDocument();
  });
});
