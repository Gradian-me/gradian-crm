import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import { Montserrat } from 'next/font/google'
import { MainLayout } from '@/components/layout/MainLayout'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

interface PageProps {
  params: {
    'doc-name': string
  }
}

async function getMarkdownContent(docName: string) {
  try {
    const filePath = path.join(process.cwd(), 'app', 'docs', `${docName}.md`)
    const content = await fs.readFile(filePath, 'utf8')
    return content
  } catch (error) {
    return null
  }
}

export default async function MarkdownPage({ params }: PageProps) {
  const resolvedParams = await params
  const docName = resolvedParams['doc-name']
  const content = await getMarkdownContent(docName)

  if (!content) {
    notFound()
  }

  return (
    <MainLayout>
      <div className={`${montserrat.className} min-h-screen`}>
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-8 py-10 sm:px-12 sm:py-14">
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-montserrat prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-6 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-ul:space-y-2">
                <ReactMarkdown 
                  components={{
                    h1: ({children}) => <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-semibold mt-12 mb-6 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-3">{children}</h2>,
                    p: ({children}) => <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{children}</p>,
                    strong: ({children}) => <strong className="font-semibold text-slate-900 dark:text-slate-100">{children}</strong>,
                    ul: ({children}) => <ul className="space-y-2 ml-6">{children}</ul>,
                    li: ({children}) => <li className="text-slate-700 dark:text-slate-300 flex items-start"><span className="text-blue-500 mr-2 mt-1">•</span><span>{children}</span></li>,
                    hr: () => <hr className="my-8 border-slate-300 dark:border-slate-600" />
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export async function generateStaticParams() {
  try {
    const docsDirectory = path.join(process.cwd(), 'app', 'docs')
    const files = await fs.readdir(docsDirectory)
    const markdownFiles = files.filter(file => file.endsWith('.md'))
    
    return markdownFiles.map((file) => ({
      'doc-name': file.replace('.md', '')
    }))
  } catch (error) {
    return []
  }
} 