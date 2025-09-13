'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Montserrat } from 'next/font/google'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { Components } from 'react-markdown'
import { useState, useRef } from 'react'
import { Check, Copy } from 'lucide-react'
import { motion } from 'framer-motion'
import { ExportPDFButton } from '@/components/ui/export-pdf-button'

// Define proper types for code component props
interface CodeProps {
  className?: string;
  children?: React.ReactNode;
  node?: {
    position?: {
      start: { line: number };
      end: { line: number };
    };
  };
}

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

interface MarkdownViewerProps {
  content: string
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const contentRef = useRef<HTMLDivElement>(null)

  const CodeBlock = ({ language, value }: { language: string, value: string }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = async () => {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="my-5 rounded-lg overflow-hidden relative group">
        <div className="absolute top-2 right-2 flex items-center gap-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
          {language && (
            <div className="bg-slate-100 backdrop-blur-sm text-slate-600 text-xs px-2 py-1 rounded-md font-mono">
              {language}
            </div>
          )}
          <motion.button
            className="p-1.5 bg-slate-200 backdrop-blur-sm hover:bg-slate-300 text-slate-500 rounded-md flex items-center justify-center"
            onClick={handleCopy}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0.8 }}
            animate={{ 
              opacity: 1,
              backgroundColor: copied ? 'rgba(74, 222, 128, 0.7)' : 'rgba(51, 65, 85, 0.2)'
            }}
            transition={{ duration: 0.2 }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </motion.button>
        </div>
        <SyntaxHighlighter
          language={language}
          style={isDark ? vscDarkPlus : vs}
          customStyle={{
            borderRadius: '0.5rem',
            margin: 0,
            padding: '1.25rem',
            fontSize: '0.85rem',
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  };

  const components: Components = {
    h1: ({children}) => <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">{children}</h1>,
    h2: ({children}) => <h2 className="text-xl font-semibold mt-10 mb-4 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">{children}</h2>,
    h3: ({children}) => <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-800 dark:text-slate-200">{children}</h3>,
    h4: ({children}) => <h4 className="text-base font-semibold mt-5 mb-2 text-slate-800 dark:text-slate-200">{children}</h4>,
    h5: ({children}) => <h5 className="text-sm font-semibold mt-4 mb-2 text-slate-800 dark:text-slate-200">{children}</h5>,
    h6: ({children}) => <h6 className="text-xs font-semibold mt-3 mb-1 text-slate-800 dark:text-slate-200">{children}</h6>,
    p: ({children}) => <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{children}</p>,
    strong: ({children}) => <strong className="font-semibold text-slate-900 dark:text-slate-100">{children}</strong>,
    em: ({children}) => <em className="italic text-slate-700 dark:text-slate-300">{children}</em>,
    del: ({children}) => <del className="line-through text-slate-500 dark:text-slate-400">{children}</del>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-indigo-500 pl-4 py-1 italic text-sm text-slate-600 dark:text-slate-400">{children}</blockquote>,
    ul: ({children}) => <ul className="space-y-1 ml-5 text-sm">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal space-y-1 ml-5 text-sm">{children}</ol>,
    li: ({children}) => <li className="text-sm text-slate-700 dark:text-slate-300 flex items-start"><span className="text-blue-500 mr-2 mt-1">•</span><span>{children}</span></li>,
    hr: () => <hr className="my-6 border-slate-300 dark:border-slate-600" />,
    a: ({href, children}) => {
      const isInternal = href?.startsWith('/') || href?.startsWith('#')
      if (isInternal && href) {
        return <Link href={href} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">{children}</Link>
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">{children}</a>
    },
    img: ({src, alt}) => {
      if (!src) return null
      // Handle only string URLs, not Blobs
      const imgSrc = typeof src === 'string' ? src : ''
      return (
        <>
          <Image 
            src={imgSrc} 
            alt={alt || ''} 
            width={800} 
            height={400} 
            className="rounded-lg mx-auto shadow-md my-5" 
            style={{objectFit: 'contain'}}
            unoptimized={imgSrc.startsWith('http')} 
          />
          {alt && <span className="block text-center text-xs text-slate-500 dark:text-slate-400 mt-1">{alt}</span>}
        </>
      )
    },
    code: ({className, children, ...props}: CodeProps) => {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''
      const isInline = !(props.node?.position?.start.line !== props.node?.position?.end.line)
      
      if (!isInline && language) {
        return <CodeBlock language={language} value={String(children).replace(/\n$/, '')} />;
      } else if (isInline) {
        return (
          <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono text-slate-800 dark:text-slate-200">
            {children}
          </code>
        )
      } else {
        return (
          <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg overflow-x-auto text-xs font-mono text-slate-800 dark:text-slate-200 my-4">
            <code>{children}</code>
          </pre>
        )
      }
    },
    table: ({children}) => <div className="overflow-hidden my-6 rounded-xl shadow-sm"><div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 text-sm">{children}</table></div></div>,
    thead: ({children}) => <thead className="bg-slate-100 dark:bg-slate-700">{children}</thead>,
    tbody: ({children}) => <tbody className="divide-y divide-slate-200 dark:divide-slate-700">{children}</tbody>,
    tr: ({children}) => <tr>{children}</tr>,
    th: ({children}) => <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">{children}</th>,
    td: ({children}) => <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-300">{children}</td>,
    // Task lists (checkboxes)
    input: ({checked}) => (
      <input 
        type="checkbox" 
        checked={checked} 
        readOnly 
        className="mr-2 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
      />
    )
  }

  return (
    <div className={`${montserrat.className} min-h-screen`}>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="flex justify-end px-4 pt-4">
            <ExportPDFButton 
              contentRef={contentRef} 
              filename={`markdown-doc-${new Date().toISOString().slice(0, 10)}`} 
            />
          </div>
          <div className="px-6 py-8 sm:px-8 sm:py-10" ref={contentRef}>
            <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-montserrat prose-headings:tracking-tight prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-p:text-sm prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-ul:space-y-1 prose-table:my-6 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-sm prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={components}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 