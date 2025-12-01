import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import md from 'react-syntax-highlighter/dist/cjs/languages/hljs/markdown';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/lioshi';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';

SyntaxHighlighter.registerLanguage('javascript', ts);
SyntaxHighlighter.registerLanguage('markdown', md);

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock = ({ code, language }: CodeBlockProps) => {
  return (
    <>
      <div className="bg-sidebar/80 px-4 py-2 border-b border-border flex justify-end">
        <span className="text-xs font-mono font-bold text-muted-foreground">{language}</span>
      </div>
      <SyntaxHighlighter
        style={atomDark}
        showLineNumbers
        customStyle={{ margin: 0, borderRadius: 0, fontSize: 13, overflowX: 'auto' }}
        language={language}
      >
        {code}
      </SyntaxHighlighter>
    </>
  );
};
