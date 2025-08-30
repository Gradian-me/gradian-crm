"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  Target,
  Download,
  Filter,
  Eye,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/MainLayout"
import { NoSSR } from "@/components/ui/no-ssr"
import dynamic from "next/dynamic"
import { applyChartTheme, chartTheme } from "@/lib/chart-theme"
import { KPIGrid } from "@/components/analytics"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

// Analytics data
const performanceMetrics = [
  {
    title: "Total Revenue",
    value: "$4.2M",
    change: "+18.5%",
    trend: "up",
    period: "vs last quarter",
    icon: DollarSign,
  },
  {
    title: "Sales Growth",
    value: "24.3%",
    change: "+5.2%",
    trend: "up",
    period: "vs last quarter",
    icon: TrendingUp,
  },
  {
    title: "HCP Engagement",
    value: "89%",
    change: "+3.1%",
    trend: "up",
    period: "vs last quarter",
    icon: Users,
  },
  {
    title: "Territory Coverage",
    value: "94%",
    change: "+2.8%",
    period: "vs last quarter",
    trend: "up",
    icon: MapPin,
  },
]

const topPerformers = [
  {
    name: "Dr. Sarah Johnson",
    hospital: "City General Hospital",
    specialty: "Cardiology",
    revenue: "$850K",
    growth: "+32%",
    visits: 24,
    status: "rising",
  },
  {
    name: "Dr. Michael Chen",
    hospital: "Regional Medical Center",
    specialty: "Neurology",
    revenue: "$720K",
    growth: "+28%",
    visits: 21,
    status: "rising",
  },
  {
    name: "Dr. Emily Rodriguez",
    hospital: "University Hospital",
    specialty: "Orthopedics",
    revenue: "$680K",
    growth: "+19%",
    visits: 18,
    status: "stable",
  },
  {
    name: "Dr. James Wilson",
    hospital: "Community Clinic",
    specialty: "Dermatology",
    revenue: "$520K",
    growth: "+15%",
    visits: 16,
    status: "stable",
  },
]

// ECharts options
const getRevenueChartOption = () => applyChartTheme({
  title: {
    text: "Revenue Performance",
  },
  tooltip: {
    trigger: "axis",
    formatter: function (params: { name: string; value: number }[]) {
      return `${params[0].name}<br/>Revenue: $${params[0].value}K`;
    },
  },
  xAxis: {
    type: "category",
    data: ["Q1", "Q2", "Q3", "Q4"],
  },
  yAxis: {
    type: "value",
    name: "Revenue ($K)",
  },
  series: [
    {
      name: "Revenue",
      type: "bar",
      data: [850, 920, 1050, 1200],

    },
  ],
})

const getTerritoryMapOption = () => applyChartTheme({
  title: {
    text: "Territory Performance Heatmap",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}% coverage",
  },
  visualMap: {
    min: 0,
    max: 100,
    calculable: true,
    orient: "horizontal",
    left: "center",
    bottom: "15%",
    inRange: {
      color: ["#fef3c7", "#f59e0b", "#ef4444"],
    },
  },
  series: [
    {
      name: "Coverage",
      type: "map",
      map: "none",
      roam: true,
      data: [
        { name: "North Region", value: 92 },
        { name: "South Region", value: 87 },
        { name: "East Region", value: 95 },
        { name: "West Region", value: 89 },
        { name: "Central Region", value: 94 },
      ],
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

const getSalesFunnelOption = () => applyChartTheme({
  title: {
    text: "Sales Funnel Analysis",
  },
  tooltip: {
    trigger: "item",
    formatter: function(params: { name: string; value: number }) {
      const stage = params.name;
      const value = params.value;
      let conversionRate = "";
      
      if (stage === "Leads") {
        conversionRate = "100% (Base)";
      } else if (stage === "Qualified") {
        conversionRate = "80%";
      } else if (stage === "Proposals") {
        conversionRate = "60%";
      } else if (stage === "Negotiations") {
        conversionRate = "40%";
      } else if (stage === "Closed") {
        conversionRate = "20%";
      }
      
      return `${stage}<br/>Count: ${value}<br/>Conversion: ${conversionRate}`;
    },
  },
  legend: {
    orient: "vertical",
    right: "5%",
    top: "middle",
    data: ["Leads", "Qualified", "Proposals", "Negotiations", "Closed"],
  },
  series: [
    {
      name: "Sales Funnel",
      type: "funnel",
      left: "10%",
      width: "80%",
      height: "80%",
      min: 0,
      max: 100,
      minSize: "0%",
      maxSize: "100%",
      sort: "descending",
      gap: 3,
      animation: true,
      animationDuration: 1000,
      animationEasing: "cubicOut",
      label: {
        show: true,
        position: "inside",
        fontSize: 14,
        fontWeight: "bold",
        color: "#ffffff",
        formatter: function(params: { name: string; value: number }) {
          return `${params.name}\n${params.value}`;
        },
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: "solid",
        },
      },
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 4,
      },
      emphasis: {
        label: {
          fontSize: 20,
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
          shadowOffsetX: 0,
          shadowOffsetY: 5,
        },
      },
      data: [
        { value: 100, name: "Leads", itemStyle: { color: "#2563eb" } },
        { value: 80, name: "Qualified", itemStyle: { color: "#7c3aed" } },
        { value: 60, name: "Proposals", itemStyle: { color: "#0891b2" } },
        { value: 40, name: "Negotiations", itemStyle: { color: "#d97706" } },
        { value: 20, name: "Closed", itemStyle: { color: "#059669" } },
      ],
    },
  ],
})

const getTrendAnalysisOption = () => applyChartTheme({
  title: {
    text: "Performance Trends",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Revenue", "Visits", "Samples"],
  },
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  yAxis: [
    {
      type: "value",
      name: "Revenue ($K)",
      position: "left",
    },
    {
      type: "value",
      name: "Count",
      position: "right",
    },
  ],
  series: [
    {
      name: "Revenue",
      type: "line",
      yAxisIndex: 0,
      data: [850, 920, 1050, 1200, 1100, 1250],
    },
    {
      name: "Visits",
      type: "line",
      yAxisIndex: 1,
      data: [45, 52, 58, 65, 62, 68],
    },
    {
      name: "Samples",
      type: "bar",
      yAxisIndex: 1,
      data: [120, 135, 150, 180, 165, 190],
    },
  ],
})

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  // Removed unused variables and functions to fix linting errors

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      rising: { color: "bg-green-100 text-green-800", text: "Rising" },
      stable: { color: "bg-blue-100 text-blue-800", text: "Stable" },
      declining: { color: "bg-red-100 text-red-800", text: "Declining" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    
    // Handle undefined status with a fallback
    if (!config) {
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
    
    return <Badge className={config.color}>{config.text}</Badge>
  }

  return (
    <MainLayout
      headerTitle="Analytics Dashboard"
      headerSubtitle="Comprehensive business intelligence and performance insights"
      customHeaderActions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      }
    >
      <div className="p-6">
        <NoSSR>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="territory">Territory</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Performance Metrics */}
              <KPIGrid
                metrics={performanceMetrics.map((metric) => ({
                  title: metric.title,
                  value: metric.value,
                  change: metric.change,
                  trend: metric.trend,
                  period: metric.period,
                  icon: metric.icon,
                }))}
              />

              {/* Main Charts */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Performance</CardTitle>
                    <CardDescription>Quarterly revenue trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getRevenueChartOption()} style={{ height: "300px" }} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>HCP Engagement</CardTitle>
                    <CardDescription>Engagement rates by specialty</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getHCPEngagementOption()} style={{ height: "300px" }} />
                  </CardContent>
                </Card>
              </div>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing HCPs</CardTitle>
                  <CardDescription>Highest revenue generating healthcare professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((performer, index) => (
                      <motion.div
                        key={performer.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{performer.name}</h3>
                            <p className="text-sm text-muted-foreground">{performer.hospital}</p>
                            <p className="text-xs text-muted-foreground">{performer.specialty}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm font-medium">{performer.revenue}</p>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{performer.growth}</p>
                            <p className="text-xs text-muted-foreground">Growth</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{performer.visits}</p>
                            <p className="text-xs text-muted-foreground">Visits</p>
                          </div>
                          {getStatusBadge(performer.status)}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Funnel</CardTitle>
                    <CardDescription>Conversion rates through sales stages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getSalesFunnelOption()} style={{ height: "400px" }} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Monthly performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getTrendAnalysisOption()} style={{ height: "400px" }} />
                  </CardContent>
                </Card>
              </div>

              {/* Performance Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                  <CardDescription>Detailed analysis by category and region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-4">
                      <h4 className="font-medium">By Product Category</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Cardiology</span>
                          <span className="text-sm font-medium">$1.8M (43%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Neurology</span>
                          <span className="text-sm font-medium">$1.2M (29%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Orthopedics</span>
                          <span className="text-sm font-medium">$0.8M (19%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Other</span>
                          <span className="text-sm font-medium">$0.4M (9%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">By Region</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">North</span>
                          <span className="text-sm font-medium">$1.1M (26%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">South</span>
                          <span className="text-sm font-medium">$0.9M (21%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">East</span>
                          <span className="text-sm font-medium">$1.3M (31%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">West</span>
                          <span className="text-sm font-medium">$0.9M (22%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Key Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Avg. Deal Size</span>
                          <span className="text-sm font-medium">$45K</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Conversion Rate</span>
                          <span className="text-sm font-medium">24%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Sales Cycle</span>
                          <span className="text-sm font-medium">45 days</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Customer Lifetime</span>
                          <span className="text-sm font-medium">$180K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="territory" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Territory Performance</CardTitle>
                  <CardDescription>Geographic analysis and coverage metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReactECharts option={getTerritoryMapOption()} style={{ height: "500px" }} />
                </CardContent>
              </Card>

              {/* Territory Details */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Coverage Analysis</CardTitle>
                    <CardDescription>Territory coverage and performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { region: "North Region", coverage: 92, performance: 95, hcps: 45 },
                        { region: "South Region", coverage: 87, performance: 88, hcps: 38 },
                        { region: "East Region", coverage: 95, performance: 92, hcps: 52 },
                        { region: "West Region", coverage: 89, performance: 90, hcps: 41 },
                        { region: "Central Region", coverage: 94, performance: 93, hcps: 48 },
                      ].map((territory) => (
                        <div key={territory.region} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{territory.region}</h4>
                            <p className="text-sm text-muted-foreground">{territory.hcps} HCPs</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{territory.coverage}% coverage</p>
                            <p className="text-xs text-muted-foreground">{territory.performance}% performance</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Territory Insights</CardTitle>
                    <CardDescription>Key findings and recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800">High Performing Areas</h4>
                        <p className="text-sm text-green-600">East and Central regions show exceptional performance with 95%+ coverage</p>
                      </div>

                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-medium text-yellow-800">Growth Opportunities</h4>
                        <p className="text-sm text-yellow-600">South region has potential for improvement - focus on expanding HCP network</p>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800">Resource Allocation</h4>
                        <p className="text-sm text-blue-600">Consider redistributing field resources to underperforming territories</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Predictive Analytics</CardTitle>
                    <CardDescription>AI-powered insights and forecasts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Revenue Forecast</h4>
                        <p className="text-sm text-muted-foreground mb-3">Based on current trends and historical data</p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Q1 2025</span>
                            <span className="text-sm font-medium">$1.4M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Q2 2025</span>
                            <span className="text-sm font-medium">$1.6M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Q3 2025</span>
                            <span className="text-sm font-medium">$1.8M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Q4 2025</span>
                            <span className="text-sm font-medium">$2.0M</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Risk Assessment</h4>
                        <p className="text-sm text-muted-foreground">Low risk indicators across all major metrics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>Actionable insights for improvement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-800">Focus on Cardiology</h4>
                          <p className="text-sm text-blue-600">Highest engagement rates and revenue potential in this specialty</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <Users className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800">Expand HCP Network</h4>
                          <p className="text-sm text-green-600">South region has room for 15+ new healthcare professional relationships</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Optimize Visit Frequency</h4>
                          <p className="text-sm text-yellow-600">Increase visits to high-value HCPs by 20% for better engagement</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Metrics</CardTitle>
                  <CardDescription>Deep dive into performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">24.3%</div>
                      <p className="text-sm text-muted-foreground">YoY Growth</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">89%</div>
                      <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">156</div>
                      <p className="text-sm text-muted-foreground">Active HCPs</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">2.3</div>
                      <p className="text-sm text-muted-foreground">Avg. Response Time (days)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
                    </NoSSR>
          </div>
    </MainLayout>
  )
} 