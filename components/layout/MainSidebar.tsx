"use client"

import {
  Activity,
  Users,
  MapPin,
  FileText,
  TrendingUp,
  Package,
  Shield,
  BarChart3,
  Hexagon,
  Stethoscope,
  Warehouse,
  UserCheck,
  TabletSmartphone,
  Beaker,
  Sparkles,
  Presentation,
} from "lucide-react"
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/" },
  { icon: Sparkles, label: "Introduction", href: "/introduction" },
  { icon: Presentation, label: "VC Features", href: "/markdown/vc-features-overview" },
  { icon: Users, label: "HCP Management", href: "/hcp" },
  { icon: UserCheck, label: "Med Reps", href: "/med-reps" },
  { icon: MapPin, label: "Field Tracking", href: "/field" },
  { icon: TrendingUp, label: "Sales Funnel", href: "/sales" },
  { icon: FileText, label: "Contracts", href: "/contracts" },
  { icon: Stethoscope, label: "Medical Devices", href: "/devices" },
  { icon: Warehouse, label: "Inventory Management", href: "/inventory" },
  { icon: Package, label: "Samples", href: "/samples" },
  { icon: Shield, label: "Compliance", href: "/compliance" },
  { icon: Activity, label: "Analytics", href: "/analytics" },
  { icon: TabletSmartphone, label: "Scrollable Tabs Demo", href: "/scrollable-tabs-demo" },
  { icon: Beaker, label: "Project Justification", href: "/project-justification" },
]

export function MainSidebar() {
  return (
    <>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Hexagon className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Gradian CRM</h2>
            <p className="text-xs text-muted-foreground">Sales Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild className="w-full justify-start gap-3 px-3 py-2 text-sm">
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-accent" />
          <div className="flex-1 text-sm">
            <p className="font-medium">Mahyar Abidi</p>
            <p className="text-xs text-muted-foreground">Sales Deputy</p>
          </div>
        </div>
      </SidebarFooter>
    </>
  )
} 