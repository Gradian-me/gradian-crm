import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import { MainLayout } from '@/components/layout/MainLayout'
import { MarkdownViewer } from '@/components/layout/markdown-viewer'

interface PageProps {
  params: Promise<{
    'doc-name': string
  }>
}

async function getMarkdownContent(docName: string) {
  try {
    const filePath = path.join(process.cwd(), 'app', 'docs', `${docName}.md`)
    const content = await fs.readFile(filePath, 'utf8')
    return content
  } catch {
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
      <MarkdownViewer content={content} />
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
  } catch {
    return []
  }
} 