"use client"

import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollableTabs } from "@/components/ui/scrollable-tabs"
import {
  Activity,
  Clock,
  DollarSign,
  Shield,
  Target,
  TrendingUp,
  Users
} from "lucide-react"

export default function ScrollableTabsDemo() {

  const tabs = [
    {
      value: "overview",
      label: "📊 Overview",
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-minimal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">2,847</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>

            <Card className="card-minimal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$45,231</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>

            <Card className="card-minimal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Activity className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">573</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
              </CardContent>
            </Card>

            <Card className="card-minimal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">+12.5%</div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      value: "activity",
      label: "🔄 Activity",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest user interactions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment processed</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">System update completed</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "insights",
      label: "🎯 Insights",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>AI-powered analytics and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-medium text-blue-900">User Engagement Up</h4>
                  <p className="text-sm text-blue-700">Your user engagement increased by 23% this week</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-medium text-green-900">Revenue Goal Achieved</h4>
                  <p className="text-sm text-green-700">Monthly revenue target reached 5 days early</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-medium text-purple-900">Performance Optimization</h4>
                  <p className="text-sm text-purple-700">System performance improved by 15% after updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "performance",
      label: "🏆 Performance",
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-minimal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <Target className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <p className="text-xs text-muted-foreground">+0.5% improvement</p>
              </CardContent>
            </Card>

            <Card className="card-minimal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">1.2s</div>
                <p className="text-xs text-muted-foreground">-0.3s faster</p>
              </CardContent>
            </Card>

            <Card className="card-minimal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <Shield className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">99.9%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      value: "analytics",
      label: "📈 Analytics",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>Comprehensive data analysis and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Traffic Analysis</h4>
                  <p className="text-sm text-blue-700 mt-1">Detailed visitor behavior and conversion patterns</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h4 className="font-medium text-green-900">Revenue Tracking</h4>
                  <p className="text-sm text-green-700 mt-1">Real-time financial performance monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "settings",
      label: "⚙️ Settings",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure application preferences and options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notifications</h4>
                    <p className="text-sm text-muted-foreground">Manage notification preferences</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Export</h4>
                    <p className="text-sm text-muted-foreground">Export dashboard data</p>
                  </div>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">API Access</h4>
                    <p className="text-sm text-muted-foreground">Manage API keys and permissions</p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "reports",
      label: "📊 Reports",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Create and download various reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline">Monthly Report</Button>
                <Button variant="outline">Quarterly Report</Button>
                <Button variant="outline">Annual Report</Button>
                <Button variant="outline">Custom Report</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "notifications",
      label: "🔔 Notifications",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Center</CardTitle>
              <CardDescription>View and manage your notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="font-medium text-blue-900">System Update</p>
                  <p className="text-sm text-blue-700">New features available</p>
                </div>
                <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                  <p className="font-medium text-green-900">Backup Complete</p>
                  <p className="text-sm text-green-700">Daily backup successful</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "security",
      label: "🔒 Security",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage security and access controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Two-Factor Authentication</span>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Password Policy</span>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "integrations",
      label: "🔗 Integrations",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Third-party Integrations</CardTitle>
              <CardDescription>Connect with external services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Slack</h4>
                  <p className="text-sm text-muted-foreground">Team communication</p>
                  <Button variant="outline" size="sm" className="mt-2">Connect</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Google Workspace</h4>
                  <p className="text-sm text-muted-foreground">Productivity suite</p>
                  <Button variant="outline" size="sm" className="mt-2">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <MainLayout 
      headerTitle="Scrollable Tabs Demo" 
      headerSubtitle="Responsive horizontal scrolling tabs with comprehensive content"
    >
      <div className="p-2 md:p-4 lg:p-6">
        <div className="mb-6">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">ScrollableTabs Component Demo</h2>
              <p className="text-blue-700">
                This demonstrates the new ScrollableTabs component with horizontal scrolling when tabs overflow the container width. 
                Try resizing your browser window to see the responsive behavior.
              </p>
            </CardContent>
          </Card>
        </div>

        <ScrollableTabs
          tabs={tabs}
          defaultValue="overview"
          className="space-y-6"
        />
      </div>
    </MainLayout>
  )
} 