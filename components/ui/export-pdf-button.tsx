'use client'

import { useState, useEffect } from 'react'
import { FileDown } from 'lucide-react'
import { motion } from 'framer-motion'

// Define a list of Tailwind color classes that might use oklch
const tailwindColorClasses = [
  'text-primary', 'bg-primary', 'border-primary',
  'text-blue', 'bg-blue', 'border-blue',
  'text-green', 'bg-green', 'border-green',
  'text-red', 'bg-red', 'border-red',
  'text-yellow', 'bg-yellow', 'border-yellow',
  'text-purple', 'bg-purple', 'border-purple',
  'text-pink', 'bg-pink', 'border-pink',
  'text-indigo', 'bg-indigo', 'border-indigo',
  'text-gray', 'bg-gray', 'border-gray',
  'text-slate', 'bg-slate', 'border-slate',
  'text-zinc', 'bg-zinc', 'border-zinc',
  'text-neutral', 'bg-neutral', 'border-neutral',
  'text-stone', 'bg-stone', 'border-stone',
  'text-amber', 'bg-amber', 'border-amber',
  'text-lime', 'bg-lime', 'border-lime',
  'text-emerald', 'bg-emerald', 'border-emerald',
  'text-teal', 'bg-teal', 'border-teal',
  'text-cyan', 'bg-cyan', 'border-cyan',
  'text-sky', 'bg-sky', 'border-sky',
  'text-violet', 'bg-violet', 'border-violet',
  'text-fuchsia', 'bg-fuchsia', 'border-fuchsia',
  'text-rose', 'bg-rose', 'border-rose'
]

// Define fallback RGB colors for common Tailwind colors
const tailwindFallbacks: Record<string, string> = {
  'text-primary': 'rgb(37, 99, 235)', // blue-600
  'bg-primary': 'rgb(37, 99, 235)',
  'border-primary': 'rgb(37, 99, 235)',
  'text-blue': 'rgb(59, 130, 246)', // blue-500
  'bg-blue': 'rgb(59, 130, 246)',
  'border-blue': 'rgb(59, 130, 246)',
  'text-green': 'rgb(34, 197, 94)', // green-500
  'bg-green': 'rgb(34, 197, 94)',
  'border-green': 'rgb(34, 197, 94)',
  'text-red': 'rgb(239, 68, 68)', // red-500
  'bg-red': 'rgb(239, 68, 68)',
  'border-red': 'rgb(239, 68, 68)',
  'text-yellow': 'rgb(234, 179, 8)', // yellow-500
  'bg-yellow': 'rgb(234, 179, 8)',
  'border-yellow': 'rgb(234, 179, 8)'
}

// Helper function to process element styles and convert all colors to RGB
function processElementStyles(element: HTMLElement): void {
  const computedStyle = window.getComputedStyle(element)
  
  // List of CSS properties that might contain color values
  const colorProperties = [
    'color',
    'backgroundColor',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
    'outlineColor',
    'textDecorationColor',
    'fill',
    'stroke',
    'boxShadow',
    'textShadow'
  ]
  
  // Apply computed RGB values to inline styles
  colorProperties.forEach(prop => {
    const camelCaseProp = prop as keyof CSSStyleDeclaration
    const value = computedStyle[camelCaseProp]
    
    if (value && value !== 'none' && value !== 'initial' && value !== '') {
      try {
        // Only set if it's a valid color (will be RGB/RGBA in computed styles)
        const valueStr = String(value)
        if (valueStr.startsWith('rgb')) {
          // Use setProperty instead of direct assignment to avoid type errors
          element.style.setProperty(prop, valueStr)
        } else if (valueStr.includes('oklch') || valueStr.includes('hsl')) {
          // For oklch or hsl colors, try to get the computed RGB value
          // This is a fallback for cases where the browser computed style still returns oklch
          const tempDiv = document.createElement('div')
          tempDiv.style.setProperty(prop, valueStr)
          document.body.appendChild(tempDiv)
          const rgbValue = window.getComputedStyle(tempDiv)[camelCaseProp]
          document.body.removeChild(tempDiv)
          
          if (rgbValue && typeof rgbValue === 'string' && rgbValue.startsWith('rgb')) {
            element.style.setProperty(prop, rgbValue)
          } else {
            // If we can't get an RGB value, use a safe fallback color
            if (prop === 'color') element.style.setProperty(prop, 'rgb(0, 0, 0)')
            else if (prop === 'backgroundColor') element.style.setProperty(prop, 'rgb(255, 255, 255)')
          }
        }
      } catch {
        // Ignore errors for properties that can't be set
      }
    }
  })
  
  // Remove all CSS custom properties that might use oklch
  // Create a list of properties to remove to avoid issues with modifying during iteration
  const propsToRemove: string[] = []
  for (let i = 0; i < element.style.length; i++) {
    const prop = element.style[i]
    if (typeof prop === 'string' && prop.startsWith('--')) {
      propsToRemove.push(prop)
    }
  }
  
  // Now remove all collected properties
  propsToRemove.forEach(prop => {
    element.style.removeProperty(prop)
  })
  
  // Remove all CSS variables from inline style
  Array.from(element.attributes).forEach(attr => {
    if (attr.name.startsWith('style') && attr.value.includes('--')) {
      const cleanedStyle = attr.value.replace(/--[\w-]+:[\s\w\d.%#(),]+;?/g, '')
      element.setAttribute('style', cleanedStyle)
    }
  })
  
  // Remove specific Tailwind opacity properties
  element.style.removeProperty('--tw-text-opacity')
  element.style.removeProperty('--tw-bg-opacity')
  element.style.removeProperty('--tw-border-opacity')
  
  // Remove any background images with gradients (which might use oklch)
  const backgroundImage = computedStyle.backgroundImage
  if (backgroundImage && backgroundImage.includes('gradient')) {
    element.style.backgroundImage = 'none'
  }
  
  // Force any remaining problematic colors to simple RGB values
  // Check for all Tailwind color classes and apply fallbacks
  for (const className of tailwindColorClasses) {
    if (element.classList.contains(className)) {
      // Extract the type (text, bg, border)
      const [type] = className.split('-')
      const fallbackColor = tailwindFallbacks[className]
      
      if (fallbackColor) {
        // Apply the fallback color based on the type
        if (type === 'text') {
          element.style.color = fallbackColor
        } else if (type === 'bg') {
          element.style.backgroundColor = fallbackColor
        } else if (type === 'border') {
          element.style.borderColor = fallbackColor
        }
      } else {
        // Default fallbacks if not in our mapping
        if (type === 'text') {
          element.style.color = 'rgb(0, 0, 0)'
        } else if (type === 'bg') {
          element.style.backgroundColor = 'rgb(255, 255, 255)'
        } else if (type === 'border') {
          element.style.borderColor = 'rgb(229, 231, 235)' // gray-200
        }
      }
    }
  }
  
  // Handle specific color shades (like text-blue-500)
  const colorClassRegex = /(text|bg|border)-(primary|blue|green|red|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(\d+)/
  
  Array.from(element.classList).forEach(className => {
    const match = className.match(colorClassRegex)
    if (match) {
      const [, type, color, shade] = match
      
      // Default RGB values based on common Tailwind colors and shades
      let rgbValue = 'rgb(0, 0, 0)'
      
      if (color === 'blue') {
        if (shade === '500') rgbValue = 'rgb(59, 130, 246)'
        else if (shade === '600') rgbValue = 'rgb(37, 99, 235)'
        else if (shade === '700') rgbValue = 'rgb(29, 78, 216)'
      } else if (color === 'green') {
        if (shade === '500') rgbValue = 'rgb(34, 197, 94)'
        else if (shade === '600') rgbValue = 'rgb(22, 163, 74)'
        else if (shade === '700') rgbValue = 'rgb(21, 128, 61)'
      } else if (color === 'red') {
        if (shade === '500') rgbValue = 'rgb(239, 68, 68)'
        else if (shade === '600') rgbValue = 'rgb(220, 38, 38)'
        else if (shade === '700') rgbValue = 'rgb(185, 28, 28)'
      }
      
      // Apply the RGB value based on the type
      if (type === 'text') {
        element.style.color = rgbValue
      } else if (type === 'bg') {
        element.style.backgroundColor = rgbValue
      } else if (type === 'border') {
        element.style.borderColor = rgbValue
      }
    }
  })
}

interface ExportPDFButtonProps {
  contentRef: React.RefObject<HTMLDivElement | null>
  filename?: string
  className?: string
}

// Define a type for the html2pdf library
type Html2PdfLib = () => {
  set: (options: object) => {
    from: (element: HTMLElement) => {
      save: () => Promise<void>
    }
  }
}

export function ExportPDFButton({ 
  contentRef, 
  filename = `document-${new Date().toISOString().slice(0, 10)}`,
  className = ''
}: ExportPDFButtonProps) {
  const [html2pdfLib, setHtml2pdfLib] = useState<Html2PdfLib | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  // Load html2pdf dynamically on client-side only
  useEffect(() => {
    import('html2pdf.js').then((module) => {
      setHtml2pdfLib(() => module.default)
    })
  }, [])

  const exportToPDF = async () => {
    if (!contentRef.current || !html2pdfLib || isExporting) return
    
    try {
      setIsExporting(true)
      
      // Clone the content to avoid modifying the original DOM
      const element = contentRef.current.cloneNode(true) as HTMLElement
      
      // Inject a style tag to force all colors to RGB and add pagination styles
      const styleTag = document.createElement('style')
      styleTag.textContent = `
        * {
          color-scheme: light !important;
          color: rgb(0, 0, 0) !important;
          background-color: rgb(255, 255, 255) !important;
          border-color: rgb(229, 231, 235) !important;
          --tw-text-opacity: 1 !important;
          --tw-bg-opacity: 1 !important;
          --tw-border-opacity: 1 !important;
        }
        
        /* Override for specific elements that need different colors */
        h1, h2, h3, h4, h5, h6 {
          color: rgb(17, 24, 39) !important; /* gray-900 */
          break-after: avoid !important;
          page-break-after: avoid !important;
          margin-top: 30px !important;
          margin-bottom: 20px !important;
          padding-bottom: 8px !important;
          border-bottom: 1px solid rgb(229, 231, 235) !important;
          font-weight: 600 !important;
          line-height: 1.3 !important;
        }
        
        h1 {
          font-size: 28px !important;
          margin-top: 40px !important;
          margin-bottom: 24px !important;
        }
        
        h2 {
          font-size: 24px !important;
          margin-top: 36px !important;
          margin-bottom: 20px !important;
        }
        
        h3 {
          font-size: 20px !important;
          margin-top: 32px !important;
          margin-bottom: 16px !important;
        }
        
        a {
          color: rgb(37, 99, 235) !important; /* blue-600 */
        }
        
        /* Remove all gradients */
        * {
          background-image: none !important;
        }
        
        /* Pagination control */
        p, li {
          orphans: 3 !important;
          widows: 3 !important;
        }
        
        h1, h2, h3, h4, h5, h6, img, table {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        
        img, table {
          max-width: 100% !important;
          margin-top: 8px !important;
          margin-bottom: 8px !important;
        }
        
        /* Enhanced list styling for PDF export */
        ul, ol {
          margin-bottom: 16px !important;
          margin-top: 8px !important;
          padding-left: 24px !important;
        }
        
        li {
          margin-bottom: 12px !important;
          line-height: 1.5 !important;
          position: relative !important;
          display: list-item !important;
          text-align: left !important;
        }
        
        ul li {
          list-style-type: disc !important;
          padding-left: 8px !important;
          margin-left: 8px !important;
        }
        
        ol li {
          list-style-type: decimal !important;
          padding-left: 8px !important;
          margin-left: 8px !important;
        }
        
        /* Fix for multiline bullet points */
        li p {
          margin: 0 !important;
          padding: 0 !important;
          display: inline-block !important;
          width: 100% !important;
        }
        
        /* Ensure list items don't break across pages if possible */
        li {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        
        hr {
          border: none !important;
          border-top: 1px solid rgb(229, 231, 235) !important;
          margin: 20px 0 !important;
          break-after: auto !important;
          page-break-after: auto !important;
        }
      `
      element.appendChild(styleTag)
      
      // Enhanced fix for oklch color function error
      // Process all elements to convert all CSS properties to RGB
      const allElements = element.querySelectorAll('*')
      
      // Process the root element too
      if (element instanceof HTMLElement) {
        processElementStyles(element)
      }
      
      // Process all child elements
      allElements.forEach(el => {
        if (el instanceof HTMLElement) {
          processElementStyles(el)
          
          // Additional fix for SVG elements which might contain oklch colors
          const svgElements = el.querySelectorAll('svg *')
          svgElements.forEach(svgEl => {
            if (svgEl instanceof SVGElement) {
              // Remove any fill or stroke that might use oklch
              if (svgEl.hasAttribute('fill') && !svgEl.getAttribute('fill')?.startsWith('rgb')) {
                const computedFill = window.getComputedStyle(svgEl).fill
                if (computedFill && computedFill !== 'none') {
                  svgEl.setAttribute('fill', computedFill)
                }
              }
              
              if (svgEl.hasAttribute('stroke') && !svgEl.getAttribute('stroke')?.startsWith('rgb')) {
                const computedStroke = window.getComputedStyle(svgEl).stroke
                if (computedStroke && computedStroke !== 'none') {
                  svgEl.setAttribute('stroke', computedStroke)
                }
              }
            }
          })
        }
      })
      
      const opt = {
        margin: 10,
        filename: `${filename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          // Force using RGB color space
          letterRendering: true,
          // Avoid using advanced CSS features
          allowTaint: true,
          // Explicitly set the color space to avoid oklch issues
          backgroundColor: '#ffffff',
          // Remove CSS variables that might contain oklch
          removeContainer: false,
          // Ignore CSS background-blend-mode as it can cause issues
          ignoreElements: (element: Element) => {
            const style = window.getComputedStyle(element)
            return style.backgroundBlendMode !== 'normal'
          }
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: ['img', 'table', 'h2', 'h3', 'h4', 'h5', 'h6']
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true,
          hotfixes: ['px_scaling']
        }
      }
      
      // Add page break elements to help with pagination
      const addPageBreaks = (element: HTMLElement) => {
        // Find headings that should have page breaks before them
        const headings = element.querySelectorAll('h1, h2')
        headings.forEach(heading => {
          // Don't add page break before the first heading
          if (heading.previousElementSibling && 
              !(heading.previousElementSibling instanceof HTMLHeadingElement)) {
            heading.classList.add('page-break-before')
          }
          
          // Add extra spacing for headings
          if (heading instanceof HTMLElement) {
            if (heading.tagName === 'H1') {
              heading.style.fontSize = '28px'
              heading.style.marginTop = '40px'
              heading.style.marginBottom = '24px'
              heading.style.paddingBottom = '8px'
              heading.style.borderBottom = '1px solid rgb(229, 231, 235)'
              heading.style.fontWeight = '600'
              heading.style.lineHeight = '1.3'
            } else if (heading.tagName === 'H2') {
              heading.style.fontSize = '24px'
              heading.style.marginTop = '36px'
              heading.style.marginBottom = '20px'
              heading.style.paddingBottom = '8px'
              heading.style.borderBottom = '1px solid rgb(229, 231, 235)'
              heading.style.fontWeight = '600'
              heading.style.lineHeight = '1.3'
            } else if (heading.tagName === 'H3') {
              heading.style.fontSize = '20px'
              heading.style.marginTop = '32px'
              heading.style.marginBottom = '16px'
              heading.style.paddingBottom = '6px'
              heading.style.fontWeight = '600'
              heading.style.lineHeight = '1.3'
            }
          }
        })
        
        // Find large tables and add page breaks before them
        const tables = element.querySelectorAll('table')
        tables.forEach(table => {
          if (table.offsetHeight > 300) { // If table is large
            table.classList.add('page-break-before')
          }
        })
        
        // Fix list rendering by ensuring proper structure
        const fixLists = (element: HTMLElement) => {
          // Find all lists
          const lists = element.querySelectorAll('ul, ol')
          
          lists.forEach(list => {
            // Ensure list has proper list-style
            if (list instanceof HTMLElement) {
              if (list.tagName === 'UL') {
                list.style.listStyleType = 'disc'
                list.style.paddingLeft = '24px'
                list.style.marginBottom = '16px'
                list.style.marginTop = '8px'
              } else if (list.tagName === 'OL') {
                list.style.listStyleType = 'decimal'
                list.style.paddingLeft = '24px'
                list.style.marginBottom = '16px'
                list.style.marginTop = '8px'
              }
            }
            
            // Add spacing between list items
            const items = list.querySelectorAll('li')
            items.forEach(item => {
              if (item instanceof HTMLElement) {
                item.style.marginBottom = '12px'
                item.style.lineHeight = '1.5'
                
                // Ensure list items have proper bullet/number visibility
                if (list instanceof HTMLElement) {
                  if (list.tagName === 'UL') {
                    item.style.listStyleType = 'disc'
                    item.style.paddingLeft = '8px'
                    item.style.marginLeft = '8px'
                    
                    // Create a wrapper for content if it doesn't exist
                    if (!item.querySelector('.li-content-wrapper')) {
                      const content = item.innerHTML
                      const wrapper = document.createElement('div')
                      wrapper.className = 'li-content-wrapper'
                      wrapper.style.display = 'inline-block'
                      wrapper.style.width = 'calc(100% - 16px)'
                      wrapper.style.verticalAlign = 'top'
                      wrapper.innerHTML = content
                      item.innerHTML = ''
                      item.appendChild(wrapper)
                    }
                  } else if (list.tagName === 'OL') {
                    item.style.listStyleType = 'decimal'
                    item.style.paddingLeft = '8px'
                    item.style.marginLeft = '8px'
                    
                    // Create a wrapper for content if it doesn't exist
                    if (!item.querySelector('.li-content-wrapper')) {
                      const content = item.innerHTML
                      const wrapper = document.createElement('div')
                      wrapper.className = 'li-content-wrapper'
                      wrapper.style.display = 'inline-block'
                      wrapper.style.width = 'calc(100% - 16px)'
                      wrapper.style.verticalAlign = 'top'
                      wrapper.innerHTML = content
                      item.innerHTML = ''
                      item.appendChild(wrapper)
                    }
                  }
                }
                
                // Fix multiline bullet points by ensuring proper text wrapping
                item.style.display = 'list-item'
                item.style.textAlign = 'left'
                
                // Find paragraphs within list items and fix their styling
                const paragraphs = item.querySelectorAll('p')
                paragraphs.forEach(p => {
                  if (p instanceof HTMLElement) {
                    p.style.margin = '0'
                    p.style.padding = '0'
                    p.style.display = 'inline-block'
                    p.style.width = '100%'
                  }
                })
              }
            })
          })
        }
        
        // Apply list fixes
        fixLists(element)
      }
      
      // Apply page break rules
      addPageBreaks(element)
      
      // Generate PDF with enhanced pagination
      await html2pdfLib().set(opt).from(element).save()
    } catch (error) {
      console.error('Error exporting PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <motion.button
      className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md ${className}`}
      onClick={exportToPDF}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      disabled={!html2pdfLib || isExporting}
    >
      <FileDown size={14} />
      {isExporting ? 'Exporting...' : 'Export PDF'}
    </motion.button>
  )
} 