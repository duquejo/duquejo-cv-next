import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark-reasonable';

SyntaxHighlighter.registerLanguage('javascript', ts);

interface CodeBlockProps {
  code: string;
}

export const CodeBlock = ({ code }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      style={atomDark}
      showLineNumbers
      customStyle={{ margin: 0, borderRadius: 0, fontSize: 14 }}
    >
      {code}
    </SyntaxHighlighter>
  );
};
