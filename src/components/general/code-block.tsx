import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import md from 'react-syntax-highlighter/dist/cjs/languages/hljs/markdown';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/lioshi';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';

SyntaxHighlighter.registerLanguage('javascript', ts);
SyntaxHighlighter.registerLanguage('markdown', md);

interface CodeBlockProps {
  code: string;
}

export const CodeBlock = ({ code }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      style={atomDark}
      showLineNumbers
      customStyle={{ margin: 0, borderRadius: 0, fontSize: 13, overflowX: 'auto' }}
    >
      {code}
    </SyntaxHighlighter>
  );
};
