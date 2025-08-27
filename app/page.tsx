"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  Users,
  MapPin,
  FileText,
  TrendingUp,
  AlertCircle,
  Calendar,
  Package,
  Shield,
  BarChart3,
  DollarSign,
  Award,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/MainLayout"
import { NoSSR } from "@/components/ui/no-ssr"
import dynamic from "next/dynamic"
import { applyChartTheme, chartTheme } from "@/lib/chart-theme"
import { KPIGrid } from "@/components/analytics"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })


const kpiData = [
  {
    title: "Active HCPs",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "Healthcare professionals in your network",
  },
  {
    title: "Field Visits",
    value: "89",
    change: "+8%",
    trend: "up",
    icon: MapPin,
    description: "Visits completed this month",
  },
  {
    title: "Sales Pipeline",
    value: "$2.4M",
    change: "+15%",
    trend: "up",
    icon: TrendingUp,
    description: "Total pipeline value",
  },
  {
    title: "Compliance Score",
    value: "94%",
    change: "-2%",
    trend: "down",
    icon: Shield,
    description: "Overall compliance rating",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "visit",
    title: "Visit completed at City General Hospital",
    description: "Met with Dr. Sarah Johnson - Cardiology",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    type: "sample",
    title: "Sample distribution logged",
    description: "Delivered 5 units of CardioStent Pro",
    time: "4 hours ago",
    status: "completed",
  },
  {
    id: 3,
    type: "tender",
    title: "New tender opportunity",
    description: "Regional Hospital Network - $500K",
    time: "6 hours ago",
    status: "pending",
  },
  {
    id: 4,
    type: "compliance",
    title: "Compliance alert",
    description: "Sample expiry reminder for Batch #A2024",
    time: "1 day ago",
    status: "alert",
  },
]

// ECharts options for enhanced analytics
const getSalesTrendOption = () => applyChartTheme({
  title: {
    text: "Monthly Sales Performance",
  },
  tooltip: {
    trigger: "axis",
    formatter: function (params: any) {
      return `${params[0].name}<br/>Revenue: $${params[0].value}K<br/>Visits: ${params[1].value}`;
    },
  },
  legend: {
    data: ["Revenue", "Field Visits"],
  },
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  yAxis: [
    {
      type: "value",
      name: "Revenue ($K)",
      position: "left",
    },
    {
      type: "value",
      name: "Visits",
      position: "right",
    },
  ],
  series: [
    {
      name: "Revenue",
      type: "line",
      yAxisIndex: 0,
      data: [850, 920, 1050, 1200, 1100, 1250, 1300, 1400, 1350, 1500, 1600, 1700],
    },
    {
      name: "Field Visits",
      type: "bar",
      yAxisIndex: 1,
      data: [45, 52, 58, 65, 62, 68, 72, 75, 78, 82, 85, 89],
    },
  ],
})

const getTerritoryPerformanceOption = () => applyChartTheme({
  title: {
    text: "Territory Performance Overview",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    },
    formatter: function (params: any) {
      return `${params[0].name}<br/>Coverage: ${params[0].value}%<br/>Performance: ${params[1].value}%`;
    },
  },
  legend: {
    data: ["Coverage", "Performance"],
  },
  xAxis: {
    type: "category",
    data: ["North", "South", "East", "West", "Central"],
  },
  yAxis: {
    type: "value",
    name: "Percentage (%)",
    max: 100,
  },
  series: [
    {
      name: "Coverage",
      type: "bar",
      data: [92, 87, 95, 89, 94],
    },
    {
      name: "Performance",
      type: "bar",
      data: [88, 82, 91, 85, 90],

    },
  ],
})

const getHCPEngagementOption = () => applyChartTheme({
  title: {
    text: "HCP Engagement by Specialty",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c}% ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    top: "middle",
  },
  series: [
    {
      name: "Engagement",
      type: "pie",
      data: [
        { value: 92, name: "Cardiology" },
        { value: 88, name: "Neurology" },
        { value: 85, name: "Orthopedics" },
        { value: 78, name: "Dermatology" },
        { value: 82, name: "Oncology" },
      ],
    },
  ],
}, chartTheme.schemes.extended)

const getSampleDistributionOption = () => applyChartTheme({
  title: {
    text: "Sample Distribution Trends",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Distributed", "Remaining", "Expired"],
  },
  xAxis: {
    type: "category",
    data: ["Q1", "Q2", "Q3", "Q4"],
  },
  yAxis: {
    type: "value",
    name: "Quantity",
  },
  series: [
    {
      name: "Distributed",
      type: "bar",
      stack: "total",
      data: [120, 135, 150, 180],

    },
    {
      name: "Remaining",
      type: "bar",
      stack: "total",
      data: [80, 65, 50, 20],

    },
    {
      name: "Expired",
      type: "bar",
      stack: "total",
      data: [10, 15, 20, 25],

    },
  ],
})

const getComplianceTrendOption = () => applyChartTheme({
  title: {
    text: "Compliance Score Trends",
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  yAxis: {
    type: "value",
    name: "Compliance Score (%)",
    max: 100,
  },
  series: [
    {
      name: "Overall Score",
      type: "line",
      data: [85, 87, 89, 91, 88, 92, 94, 93, 95, 96, 94, 97],

    },
  ],
})

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <MainLayout 
      headerTitle="Dashboard"
      headerSubtitle="Welcome back, John"
    >
      <main className="flex-1 p-6">
        <NoSSR>
          <Tabs key={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* KPI Cards */}
                  <KPIGrid
                    metrics={kpiData.map((kpi) => ({
                      title: kpi.title,
                      value: kpi.value,
                      change: kpi.change,
                      trend: kpi.trend,
                      period: "from last month",
                      icon: kpi.icon,
                      description: kpi.description,
                    }))}
                  />

                  {/* Enhanced Analytics Charts - Row 1 */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sales Performance Trends</CardTitle>
                        <CardDescription>Monthly revenue and field visit correlation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ReactECharts option={getSalesTrendOption()} style={{ height: "300px" }} />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>HCP Engagement Analysis</CardTitle>
                        <CardDescription>Engagement rates by medical specialty</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ReactECharts option={getHCPEngagementOption()} style={{ height: "300px" }} />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enhanced Analytics Charts - Row 2 */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sample Distribution Overview</CardTitle>
                        <CardDescription>Quarterly sample distribution and inventory status</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ReactECharts option={getSampleDistributionOption()} style={{ height: "300px" }} />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Compliance Score Progression</CardTitle>
                        <CardDescription>Monthly compliance score trends with area fill</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ReactECharts option={getComplianceTrendOption()} style={{ height: "300px" }} />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Territory Performance and Quick Actions */}
                  <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Territory Performance Overview</CardTitle>
                        <CardDescription>Coverage and performance metrics by region</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ReactECharts option={getTerritoryPerformanceOption()} style={{ height: "300px" }} />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks and shortcuts</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <Users className="h-4 w-4 mr-2" />
                          Add New HCP
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <MapPin className="h-4 w-4 mr-2" />
                          Plan Route
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <Package className="h-4 w-4 mr-2" />
                          Log Sample
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Create Report
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Additional Metrics Row */}
                  <KPIGrid
                    metrics={[
                      {
                        title: "Conversion Rate",
                        value: "24.3%",
                        change: "+2.1%",
                        trend: "up",
                        period: "from last month",
                        icon: TrendingUp,
                      },
                      {
                        title: "Avg. Deal Size",
                        value: "$45K",
                        change: "+8.5%",
                        trend: "up",
                        period: "from last month",
                        icon: DollarSign,
                      },
                      {
                        title: "Sales Cycle",
                        value: "45 days",
                        change: "-3 days",
                        trend: "down" as const,
                        period: "from last month",
                        icon: Calendar,
                      },
                      {
                        title: "Customer Satisfaction",
                        value: "4.8/5",
                        change: "+0.2",
                        trend: "up",
                        period: "from last month",
                        icon: Award,
                      },
                    ]}
                  />
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest actions and system updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-3 rounded-lg border border-border"
                          >
                            <div
                              className={`h-2 w-2 rounded-full mt-2 ${
                                activity.status === "completed"
                                  ? "bg-green-500"
                                  : activity.status === "pending"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            />
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium">{activity.title}</p>
                              <p className="text-xs text-muted-foreground">{activity.description}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insights" className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Insights</CardTitle>
                        <CardDescription>Key metrics and trends analysis</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="text-sm font-medium text-green-800">Visit efficiency up 15%</p>
                              <p className="text-xs text-green-600">Compared to last quarter</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                            <Users className="h-4 w-4 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium text-blue-800">New HCP relationships: 23</p>
                              <p className="text-xs text-blue-600">This month</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">3 compliance items need attention</p>
                              <p className="text-xs text-yellow-600">Review required</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recommendations</CardTitle>
                        <CardDescription>AI-powered suggestions for optimization</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 border border-border rounded-lg">
                            <p className="text-sm font-medium">Focus on Cardiology</p>
                            <p className="text-xs text-muted-foreground">High engagement rates in this specialty</p>
                          </div>

                          <div className="p-3 border border-border rounded-lg">
                            <p className="text-sm font-medium">Schedule follow-ups</p>
                            <p className="text-xs text-muted-foreground">5 HCPs haven't been visited in 30+ days</p>
                          </div>

                          <div className="p-3 border border-border rounded-lg">
                            <p className="text-sm font-medium">Sample optimization</p>
                            <p className="text-xs text-muted-foreground">Reduce waste by 12% with better planning</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </NoSSR>
          </main>
    </MainLayout>
  )
}
