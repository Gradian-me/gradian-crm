# Changelog

All notable changes to this project will be documented in this file.

## [2025-09-11 12:05:45] - Feature Minor: Show Header & Sidebar Skeletons During Page Transitions
Date and Time of changes: 2025-09-11 12:05:45
Detailed description of changes: Integrated route transition loading state to display `HeaderSkeleton` and `SidebarSkeleton` via `LoadingLayout` when navigating between pages. Implemented `usePageLoading` hook in `MainLayout` to detect pathname changes and conditionally render skeleton UI, ensuring consistent skeletons in both route `loading.tsx` and client-side transitions.
Components affected:
- components/layout/MainLayout.tsx (conditionally render `LoadingLayout` on transition)
- components/layout/LoadingLayout.tsx (uses `HeaderSkeleton` and `SidebarSkeleton`)
- hooks/use-page-loading.ts (hook to detect transitions)
---- 
## [2025-09-11 12:10:04] - Bug Fix: Resolve UTF-8 Encoding Errors in Skeleton Components
Date and Time of changes: 2025-09-11 12:10:04
Detailed description of changes: Fixed build failures caused by invalid UTF-8 content in skeleton UI files. Recreated `LoadingLayout`, `HeaderSkeleton`, and `SidebarSkeleton` with clean UTF-8 to prevent "stream did not contain valid UTF-8" errors during Next.js compilation.
Components affected:
- components/layout/LoadingLayout.tsx (recreated with clean UTF-8)
- components/layout/HeaderSkeleton.tsx (recreated with clean UTF-8)
- components/layout/SidebarSkeleton.tsx (recreated with clean UTF-8)
---- 
## [2025-09-11 12:21:10] - Refactor: Migrate from @next/font to Built-in next/font
Date and Time of changes: 2025-09-11 12:21:10
Detailed description of changes: Migrated from deprecated `@next/font` package to the built-in `next/font` system to ensure compatibility with Next.js 14 and beyond. Used the official Next.js codemod (`npx @next/codemod@latest built-in-next-font .`) to automatically update font imports and configuration. Removed `@next/font` dependency from package.json.
Components affected:
- package.json (removed `@next/font` dependency)
- app/layout.tsx (updated font imports to use built-in next/font)
---- 
## [2025-09-11 12:23:33] - Bug Fix: Fix Additional UTF-8 Encoding Issue in use-page-loading Hook
Date and Time of changes: 2025-09-11 12:23:33
Detailed description of changes: Fixed additional UTF-8 encoding issue in the `use-page-loading.ts` hook that was causing build failures. Recreated the file with clean UTF-8 encoding to ensure proper compilation and page transition loading functionality.
Components affected:
- hooks/use-page-loading.ts (recreated with clean UTF-8 encoding)
---- 
## [2025-09-11 12:31:05] - Feature Minor: Add VC Features Overview to Main Navigation
Date and Time of changes: 2025-09-11 12:31:05
Detailed description of changes: Added VC Features Overview link to the main sidebar navigation for quick access to the venture capital presentation document. Used Presentation icon from Lucide React for visual clarity and placed it near the top of the navigation for prominence.
Components affected:
- components/layout/MainSidebar.tsx (added new navigation item with Presentation icon)
---- 
## [2025-09-11 12:32:51] - Bug Fix: Fix Sidebar Navigation Hover Color Issue
Date and Time of changes: 2025-09-11 12:32:51
Detailed description of changes: Fixed an issue where text color was disappearing on hover for sidebar navigation items, particularly affecting the VC Features Overview link. Enhanced the sidebar menu item styling by adding a group hover approach that ensures both icon and text maintain proper foreground color when hovering over menu items.
Components affected:
- components/layout/MainSidebar.tsx (improved hover styling for navigation links)
---- 
## [2025-09-11 12:34:30] - Bug Fix: Fix Transparency Issue in Markdown Page Title
Date and Time of changes: 2025-09-11 12:34:30
Detailed description of changes: Fixed an issue where the title in markdown pages was using a transparent background clip for gradient effect, causing visibility problems. Replaced the transparent gradient styling with solid text colors (slate-900 for light mode, white for dark mode) and added a subtle border-bottom for better visual separation.
Components affected:
- app/markdown/[doc-name]/page.tsx (fixed h1 component styling)
---- 
## [2025-09-11 12:40:21] - Fix: Sidebar Item Text Transparency on Hover
- Fixed issue where sidebar menu item text became transparent on hover
- Removed group-hover classes that were causing the text to lose color
- Components affected: MainSidebar.tsx
----
## [2025-09-11 12:44:27] - Feature Minor: Add Feature Comparison Table to VC Features Overview
Date and Time of changes: 2025-09-11 12:44:27
Detailed description of changes: Added a comprehensive feature comparison table to the end of the VC Features Overview document. The table provides a structured comparison of all platform features including key benefits, target users, implementation complexity, and ROI impact for easier evaluation by stakeholders.
Components affected:
- app/docs/vc-features-overview.md (added feature comparison table)
----
## [2025-09-11 12:46:35] - Bug Fix: Fix Markdown Table Rendering in VC Features Overview
Date and Time of changes: 2025-09-11 12:46:35
Detailed description of changes: Fixed markdown table formatting in the VC Features Overview document to ensure proper rendering. Added proper table component support in the markdown renderer and corrected table syntax with proper spacing in the separator row.
Components affected:
- app/docs/vc-features-overview.md (fixed table formatting)
- app/markdown/[doc-name]/page.tsx (added table rendering components)
----
## [2025-09-11 12:48:55] - Bug Fix: Recreate VC Features Overview with Proper Table Formatting
Date and Time of changes: 2025-09-11 12:48:55
Detailed description of changes: Recreated the entire VC Features Overview document with clean formatting to resolve persistent table rendering issues. Ensured proper markdown table syntax with no extra spaces or line breaks that could interfere with rendering.
Components affected:
- app/docs/vc-features-overview.md (recreated with clean formatting)
----
## [2025-09-11 12:52:45] - Feature Minor: Add GitHub Flavored Markdown Support for Tables
Date and Time of changes: 2025-09-11 12:52:45
Detailed description of changes: Added remark-gfm plugin to ReactMarkdown component to properly render GitHub Flavored Markdown features, particularly tables. This ensures proper rendering of markdown tables with correct styling and structure instead of displaying them as plain text.
Components affected:
- app/markdown/[doc-name]/page.tsx (added remark-gfm plugin)
- package.json (added remark-gfm dependency)
----
## [2025-09-11 12:56:19] - Feature Minor: Enhance Markdown Table Styling with Rounded Corners
Date and Time of changes: 2025-09-11 12:56:19
Detailed description of changes: Enhanced the styling of markdown tables with rounded corners, increased padding, and subtle shadow effects. Improved the visual appearance of tables in markdown documents for a more polished and modern look that aligns with the application's design system.
Components affected:
- app/markdown/[doc-name]/page.tsx (updated table component styling)
----
## [2025-09-11 12:57:39] - Bug Fix: Improve Table Rounded Corners Implementation
Date and Time of changes: 2025-09-11 12:57:39
Detailed description of changes: Fixed the implementation of rounded corners for markdown tables by applying the border-radius to the container div instead of the table element itself. This ensures proper rendering of rounded corners across all browsers and prevents overflow issues.
Components affected:
- app/markdown/[doc-name]/page.tsx (fixed table container styling)
----
## [2025-09-11 12:59:00] - Bug Fix: Add Responsive Horizontal Scrolling to Tables
Date and Time of changes: 2025-09-11 12:59:00
Detailed description of changes: Implemented responsive horizontal scrolling for tables while maintaining rounded corners. Used a nested div structure with overflow-hidden on the outer container (for rounded corners) and overflow-x-auto on the inner container (for horizontal scrolling), ensuring tables display properly on all device sizes.
Components affected:
- app/markdown/[doc-name]/page.tsx (added responsive overflow to tables)
----
## [2025-09-11 13:00:22] - Feature Minor: Create Reusable MarkdownViewer Component
Date and Time of changes: 2025-09-11 13:00:22
Detailed description of changes: Refactored markdown rendering into a reusable MarkdownViewer component to improve code organization and maintainability. Extracted all markdown rendering logic from the page component into a dedicated UI component that can be reused across the application. This improves separation of concerns and makes the codebase more modular.
Components affected:
- components/ui/markdown-viewer.tsx (new component)
- app/markdown/[doc-name]/page.tsx (refactored to use the new component)
----
## [2025-09-11 13:06:13] - Feature Major: Enhance MarkdownViewer with Advanced Markdown Features
Date and Time of changes: 2025-09-11 13:06:13
Detailed description of changes: Significantly enhanced the MarkdownViewer component with comprehensive support for advanced markdown features. Added syntax highlighting for code blocks with theme support, image optimization with Next.js Image component, smart link handling for internal/external links, and styling for additional markdown elements including blockquotes, ordered lists, emphasis, strikethrough, and task lists (checkboxes). Moved the component to the layout folder for better organization.
Components affected:
- components/layout/markdown-viewer.tsx (enhanced with advanced features)
- package.json (added react-syntax-highlighter dependency)
----
## [2025-09-11 13:10:24] - Bug Fix: Resolve TypeScript Errors in MarkdownViewer Component
Date and Time of changes: 2025-09-11 13:10:24
Detailed description of changes: Fixed TypeScript errors in the MarkdownViewer component related to image source handling and code block rendering. Implemented proper type checking for image sources to handle both string and Blob types, and improved the code block rendering logic to detect inline code without relying on the inline prop.
Components affected:
- components/layout/markdown-viewer.tsx (fixed TypeScript errors)
----
## [2025-09-11 13:13:22] - Feature Minor: Add Markdown Features Reference
Date and Time of changes: 2025-09-11 13:13:22
Detailed description of changes: Added a comprehensive markdown features reference section to the VC presentation document. This section showcases all supported markdown features including headings, text formatting, quotes, lists, code blocks with syntax highlighting, links, images, tables, horizontal rules, and HTML support. This serves as both a reference and a demonstration of the MarkdownViewer component's capabilities.
Components affected:
- app/docs/vc-presentation.md (added markdown features reference section)
----
## [2025-09-11 13:16:19] - Bug Fix: Resolve Hydration Error in MarkdownViewer Component
Date and Time of changes: 2025-09-11 13:16:19
Detailed description of changes: Fixed a React hydration error in the MarkdownViewer component caused by nesting a div inside a p tag in the image renderer. Modified the image component to use React fragments instead of div containers and replaced paragraph tags with span elements for image captions. This ensures proper HTML nesting and prevents hydration errors during rendering.
Components affected:
- components/layout/markdown-viewer.tsx (fixed image renderer implementation)
----
## [2025-09-11 13:17:50] - Feature Minor: Move Markdown Features to Dedicated Sample File
Date and Time of changes: 2025-09-11 13:17:50
Detailed description of changes: Moved the markdown features reference from vc-presentation.md to a dedicated markdown-sample.md file. This provides a cleaner separation of content and ensures the VC presentation remains focused on its core content while maintaining a comprehensive markdown reference file for documentation purposes.
Components affected:
- app/docs/markdown-sample.md (new file with markdown features reference)
- app/docs/vc-presentation.md (removed markdown features section)
----
## [2025-09-11 13:21:38] - Feature Minor: Enable HTML Rendering in Markdown
Date and Time of changes: 2025-09-11 13:21:38
Detailed description of changes: Added support for rendering raw HTML within markdown content by integrating the rehype-raw plugin with ReactMarkdown. This enhancement allows HTML elements like divs, details/summary, and other HTML tags to render properly instead of being escaped as text. The feature is particularly useful for advanced formatting and interactive elements in markdown documentation.
Components affected:
- components/layout/markdown-viewer.tsx (added rehype-raw plugin)
- package.json (added rehype-raw dependency)
----
## [2025-09-11 13:23:21] - Feature Minor: Add Language Indicator and Copy Button to Code Blocks
Date and Time of changes: 2025-09-11 13:23:21
Detailed description of changes: Enhanced code blocks in the MarkdownViewer component with a language indicator badge and an animated copy button. The language indicator displays the programming language in the top-right corner of each code block, while the copy button in the top-left allows users to easily copy code with a single click. The copy button includes a micro-animation and visual feedback when code is copied.
Components affected:
- components/layout/markdown-viewer.tsx (added CodeBlock component with copy functionality)
----
## [2025-09-11 13:25:38] - Feature Minor: Modernize Code Block UI
Date and Time of changes: 2025-09-11 13:25:38
Detailed description of changes: Redesigned the code block UI with a more modern and user-friendly interface. Moved both the language indicator and copy button to the top-right corner in a unified control group. Added hover effects that reveal the controls more prominently when interacting with the code block. Enhanced the copy button with color transitions for success feedback and added backdrop blur for a contemporary glass-morphism effect.
Components affected:
- components/layout/markdown-viewer.tsx (updated CodeBlock component styling)
----
## [2025-09-11 13:46:19] - Bug Fix: Resolve UTF-8 Encoding Issues in Loading Components
Date and Time of changes: 2025-09-11 13:46:19
Detailed description of changes: Fixed UTF-8 encoding issues in loading.tsx files that were causing build failures. Recreated the analytics and HCP loading components with proper UTF-8 encoding and simplified them to use the shared LoadingLayout component. This resolves the "stream did not contain valid UTF-8" webpack errors and ensures proper compilation.
Components affected:
- app/analytics/loading.tsx (recreated with proper encoding)
- app/hcp/loading.tsx (recreated with proper encoding)
----
## [2025-09-11 13:48:51] - Bug Fix: Force UTF-8 Encoding for Loading Components
Date and Time of changes: 2025-09-11 13:48:51
Detailed description of changes: Implemented a more aggressive fix for the UTF-8 encoding issues by completely removing the problematic files and recreating them with explicit UTF-8 encoding using PowerShell's Out-File command. This ensures the files are properly encoded and resolves the persistent webpack compilation errors.
Components affected:
- app/analytics/loading.tsx (recreated with explicit UTF-8 encoding)
- app/hcp/loading.tsx (recreated with explicit UTF-8 encoding)
----
## [2025-09-11 14:07:37] - Bug Fix: Resolve TypeScript ESLint Error in MarkdownViewer
Date and Time of changes: 2025-09-11 14:07:37
Detailed description of changes: Fixed a TypeScript ESLint error in the markdown-viewer.tsx file by replacing the 'any' type with a properly defined CodeProps interface. This improves type safety and code quality by providing explicit typing for the code component props, including the node structure needed for inline code detection.
Components affected:
- components/layout/markdown-viewer.tsx (added CodeProps interface and fixed type annotations)
---- 