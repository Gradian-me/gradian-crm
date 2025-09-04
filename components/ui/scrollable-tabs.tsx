"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ScrollableTabsProps {
  tabs: Array<{
    value: string
    label: string
    content: React.ReactNode
  }>
  defaultValue?: string
  className?: string
  tabsListClassName?: string
  triggerClassName?: string
  onValueChange?: (value: string) => void
}

const ScrollableTabs = React.forwardRef<
  React.ElementRef<typeof Tabs>,
  ScrollableTabsProps
>(({ 
  tabs, 
  defaultValue, 
  className, 
  tabsListClassName, 
  triggerClassName,
  onValueChange,
  ...props 
}, ref) => {
  return (
    <Tabs
      ref={ref}
      defaultValue={defaultValue || tabs[0]?.value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
      {...props}
    >
      <ScrollArea className="w-full whitespace-nowrap rounded-md" orientation="horizontal">
        <TabsList 
          className={cn(
            "inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-max",
            tabsListClassName
          )}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex-shrink-0",
                triggerClassName
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollArea>
      
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
})

ScrollableTabs.displayName = "ScrollableTabs"

export { ScrollableTabs }
export type { ScrollableTabsProps } 