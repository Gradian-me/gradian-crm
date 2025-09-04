"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Users,
  MapPin,
  FileText,
  TrendingUp,
  AlertCircle,
  Package,
  Shield,
  DollarSign,
  Award,
  Target,
  Activity,
  Clock,
  Building,
  Stethoscope,
  ChartBar,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { MainLayout } from "@/components/layout/MainLayout"
import { NoSSR } from "@/components/ui/no-ssr"
import dynamic from "next/dynamic"
import { applyChartTheme, chartTheme } from "@/lib/chart-theme"
import { KPIGrid } from "@/components/analytics"
import { hcpList, getRegions, getHCPsByFacilityType } from "@/lib/hcp-list"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

// Calculate real-time analytics from HCP data
const calculateDashboardAnalytics = () => {
  const totalHCPs = hcpList.length
  const completedVisits = hcpList.filter(hcp => hcp.status === "completed").length
  const pendingVisits = hcpList.filter(hcp => hcp.status === "scheduled" || hcp.status === "in-progress").length
  const avgEngagementScore = Math.round(hcpList.reduce((sum, hcp) => sum + (hcp.engagementScore || 0), 0) / totalHCPs)
  
  // Calculate total samples and financial metrics
  const totalSamples = hcpList.reduce((sum, hcp) => sum + (hcp.sunshineAct?.samples || 0), 0)
  const totalGifts = hcpList.reduce((sum, hcp) => sum + (hcp.sunshineAct?.gifts || 0), 0)
  const totalSponsorship = hcpList.reduce((sum, hcp) => sum + (hcp.sunshineAct?.sponsorships || 0), 0)
  
  // Calculate estimated pipeline value based on engagement and potential
  const estimatedPipeline = hcpList.reduce((sum, hcp) => {
    const baseValue = (hcp.engagementScore || 0) * 1000
    const potentialMultiplier = hcp.prescribingPotential === 'High' ? 2.5 : 
                               hcp.prescribingPotential === 'Medium' ? 1.5 : 1
    return sum + (baseValue * potentialMultiplier)
  }, 0)
  
  // Territory analytics
  const regions = getRegions()
  const publicFacilities = getHCPsByFacilityType('Public').length
  const privateFacilities = getHCPsByFacilityType('Private').length
  
  // Calculate compliance metrics
  const compliantHCPs = hcpList.filter(hcp => hcp.complianceStatus === "Compliant").length
  const complianceRate = Math.round((compliantHCPs / totalHCPs) * 100)
  
  // Calculate conversion rates
  const highEngagement = hcpList.filter(hcp => (hcp.engagementScore || 0) >= 80).length
  const conversionRate = Math.round((highEngagement / totalHCPs) * 100)
  
  return {
    totalHCPs,
    completedVisits,
    pendingVisits,
    avgEngagementScore,
    totalSamples,
    totalGifts,
    totalSponsorship,
    estimatedPipeline,
    regions: regions.length,
    publicFacilities,
    privateFacilities,
    complianceRate,
    conversionRate,
    highEngagement,
  }
}



const recentActivities = [
  {
    id: 1,
    type: "visit",
    title: "Visit completed at Ibn Sina Hospital",
    description: "Met with Dr. Ahmad Hassan - General Medicine",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    type: "sample",
    title: "Sample distribution logged",
    description: "Delivered 8 units at Al-Kindi Hospital",
    time: "4 hours ago",
    status: "completed",
  },
  {
    id: 3,
    type: "tender",
    title: "New tender opportunity",
    description: "Baghdad Medical City - $750K",
    time: "6 hours ago",
    status: "pending",
  },
  {
    id: 4,
    type: "compliance",
    title: "Compliance update",
    description: "Documentation review completed",
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
    formatter: function (params: { name: string; value: number }[]) {
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
    formatter: function (params: { name: string; value: number }[]) {
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
  
  const analytics = useMemo(() => calculateDashboardAnalytics(), [])

  return (
    <MainLayout 
      headerTitle="Dashboard Overview" 
      headerSubtitle="Real-time insights and performance metrics"
    >
      <div className="p-2 md:p-4 lg:p-6">
        <NoSSR>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">
                <ChartBar className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-xs sm:text-sm">
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-xs sm:text-sm">
                <Target className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="performance" className="text-xs sm:text-sm">
                <Award className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Enhanced KPI Grid with Real Data */}
              <KPIGrid
                metrics={[
                  {
                    title: "Total HCPs",
                    value: analytics.totalHCPs.toString(),
                    change: "+5.2%",
                    trend: "up",
                    period: "from last month",
                    icon: Users,
                    variant: "featured",
                  },
                  {
                    title: "Completed Visits",
                    value: analytics.completedVisits.toString(),
                    change: "+12.3%",
                    trend: "up",
                    period: "this month",
                    icon: MapPin,
                    variant: "default",
                  },
                  {
                    title: "Pipeline Value",
                    value: `$${(analytics.estimatedPipeline / 1000000).toFixed(1)}M`,
                    change: "+18.5%",
                    trend: "up",
                    period: "estimated",
                    icon: DollarSign,
                    variant: "success",
                  },
                  {
                    title: "Avg Engagement",
                    value: `${analytics.avgEngagementScore}%`,
                    change: "+3.1%",
                    trend: "up",
                    period: "overall score",
                    icon: Target,
                    variant: "purple",
                  },
                ]}
              />

              {/* Secondary Metrics Row */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="card-minimal">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                    <Shield className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{analytics.complianceRate}%</div>
                    <p className="text-xs text-muted-foreground">+2% from last month</p>
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{analytics.conversionRate}%</div>
                    <p className="text-xs text-muted-foreground">High engagement HCPs</p>
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Samples Distributed</CardTitle>
                    <Package className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{analytics.totalSamples}</div>
                    <p className="text-xs text-muted-foreground">Total units this month</p>
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Coverage Areas</CardTitle>
                    <Building className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{analytics.regions}</div>
                    <p className="text-xs text-muted-foreground">Active regions</p>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Analytics Charts - Row 1 */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>Sales Performance Trends</CardTitle>
                    <CardDescription>Monthly sales growth and target achievement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getSalesTrendOption()} style={{ height: "100%" }} className="h-[250px] sm:h-[300px] lg:h-[350px] min-h-[200px]" />
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>HCP Engagement Distribution</CardTitle>
                    <CardDescription>Engagement scores across healthcare providers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getHCPEngagementOption()} style={{ height: "100%" }} className="h-[250px] sm:h-[300px] lg:h-[350px] min-h-[200px]" />
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Analytics Charts - Row 2 */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>Sample Distribution Overview</CardTitle>
                    <CardDescription>Quarterly sample distribution and inventory status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getSampleDistributionOption()} style={{ height: "100%" }} className="h-[250px] sm:h-[300px] lg:h-[350px] min-h-[200px]" />
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>Compliance Score Progression</CardTitle>
                    <CardDescription>Monthly compliance score trends with area fill</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getComplianceTrendOption()} style={{ height: "100%" }} className="h-[250px] sm:h-[300px] lg:h-[350px] min-h-[200px]" />
                  </CardContent>
                </Card>
              </div>

              {/* Territory Performance and Enhanced Actions */}
              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 card-minimal">
                  <CardHeader>
                    <CardTitle>Territory Performance Overview</CardTitle>
                    <CardDescription>Coverage and performance metrics by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getTerritoryPerformanceOption()} style={{ height: "100%" }} className="h-[250px] sm:h-[300px] lg:h-[350px] min-h-[200px]" />
                  </CardContent>
                </Card>

                <Card className="card-glass">
                  <CardHeader>
                    <CardTitle className="text-gradient">Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:text-white border-none shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
                      <Users className="h-4 w-4 mr-2" />
                      Add New HCP
                    </Button>
                    <Button className="w-full justify-start bg-white hover:bg-gray-100 text-gray-800 hover:text-gray-900 border border-gray-200 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-200 font-medium">
                      <MapPin className="h-4 w-4 mr-2" />
                      Plan Route
                    </Button>
                    <Button className="w-full justify-start bg-white hover:bg-gray-100 text-gray-800 hover:text-gray-900 border border-gray-200 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-200 font-medium">
                      <Package className="h-4 w-4 mr-2" />
                      Log Sample
                    </Button>
                    <Button className="w-full justify-start bg-white hover:bg-gray-100 text-gray-800 hover:text-gray-900 border border-gray-200 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-200 font-medium">
                      <FileText className="h-4 w-4 mr-2" />
                      Create Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Metrics Row with Real Data */}
              <KPIGrid
                metrics={[
                  {
                    title: "Public Facilities",
                    value: analytics.publicFacilities.toString(),
                    change: "+3",
                    trend: "up",
                    period: "new partnerships",
                    icon: Building,
                    variant: "default",
                  },
                  {
                    title: "Private Facilities",
                    value: analytics.privateFacilities.toString(),
                    change: "+2",
                    trend: "up",
                    period: "new contracts",
                    icon: Stethoscope,
                    variant: "default",
                  },
                  {
                    title: "Pending Visits",
                    value: analytics.pendingVisits.toString(),
                    change: "-5",
                    trend: "down",
                    period: "scheduled",
                    icon: Clock,
                    variant: "warning",
                  },
                  {
                    title: "High Engagement",
                    value: analytics.highEngagement.toString(),
                    change: "+7",
                    trend: "up",
                    period: "HCPs (80%+ score)",
                    icon: Award,
                    variant: "success",
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="card-featured">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-white/80">Your latest actions and system updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm"
                      >
                        <div className="shrink-0">
                          {activity.type === "visit" && <MapPin className="h-5 w-5 text-green-400" />}
                          {activity.type === "sample" && <Package className="h-5 w-5 text-blue-400" />}
                          {activity.type === "tender" && <TrendingUp className="h-5 w-5 text-purple-400" />}
                          {activity.type === "compliance" && <Shield className="h-5 w-5 text-orange-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white">{activity.title}</h4>
                          <p className="text-sm text-white/70">{activity.description}</p>
                          <p className="text-xs text-white/50 mt-1">{activity.time}</p>
                        </div>
                        <div className="shrink-0">
                          {activity.status === "completed" && (
                            <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                          )}
                          {activity.status === "pending" && (
                            <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>
                          )}
                          {activity.status === "alert" && (
                            <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Analytics */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>Activity Timeline</CardTitle>
                    <CardDescription>Daily activity patterns and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Visits Completed</span>
                        <span className="text-sm font-medium">24 today</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Samples Distributed</span>
                        <span className="text-sm font-medium">156 units</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Reports Generated</span>
                        <span className="text-sm font-medium">8 reports</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Compliance Checks</span>
                        <span className="text-sm font-medium">12 completed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>Territory Insights</CardTitle>
                    <CardDescription>Regional performance breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Baghdad Region</span>
                        <span className="text-sm font-medium text-green-600">High Activity</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Basra Region</span>
                        <span className="text-sm font-medium text-blue-600">Moderate</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Erbil Region</span>
                        <span className="text-sm font-medium text-purple-600">Growing</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Mosul Region</span>
                        <span className="text-sm font-medium text-orange-600">Potential</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              {/* Key Insights */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="card-highlight">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Top Opportunity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white">
                    <p className="text-lg font-semibold">Baghdad Medical City</p>
                    <p className="text-sm text-white/80">High-potential facility with 850+ beds</p>
                    <p className="text-xs text-white/70 mt-2">Estimated value: $2.3M</p>
                  </CardContent>
                </Card>

                <Card className="card-important">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Growth Leader
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white">
                    <p className="text-lg font-semibold">Cardiology Segment</p>
                    <p className="text-sm text-white/80">+45% growth this quarter</p>
                    <p className="text-xs text-white/70 mt-2">12 new HCP partnerships</p>
                  </CardContent>
                </Card>

                <Card className="card-minimal border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-amber-800 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Action Required
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-amber-800">Sample Inventory</p>
                    <p className="text-sm text-amber-700">Low stock alert - 3 products</p>
                    <p className="text-xs text-amber-600 mt-2">Reorder by next week</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analytics */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>Market Penetration</CardTitle>
                    <CardDescription>Coverage analysis by facility type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Public Hospitals</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Private Clinics</span>
                          <span>65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Specialized Centers</span>
                          <span>82%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "82%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Key metrics over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-green-800">Visit Completion Rate</p>
                          <p className="text-xs text-green-600">+8% this month</p>
                        </div>
                        <div className="text-2xl font-bold text-green-600">94%</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-blue-800">Average Deal Size</p>
                          <p className="text-xs text-blue-600">+12% this quarter</p>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">$48K</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-purple-800">Customer Satisfaction</p>
                          <p className="text-xs text-purple-600">+0.3 this month</p>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">4.7/5</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {/* Performance Overview */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="card-minimal">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Target</CardTitle>
                    <Target className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">85%</div>
                    <p className="text-xs text-muted-foreground">Achievement rate</p>
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">+24%</div>
                    <p className="text-xs text-muted-foreground">Year over year</p>
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Market Share</CardTitle>
                    <ChartBar className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">31%</div>
                    <p className="text-xs text-muted-foreground">In target regions</p>
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
                    <Award className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">92%</div>
                    <p className="text-xs text-muted-foreground">Productivity score</p>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Details */}
              <Card className="card-minimal">
                <CardHeader>
                  <CardTitle>Quarterly Performance Review</CardTitle>
                  <CardDescription>Detailed breakdown of key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-4">
                      <h4 className="font-medium">Sales Performance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Q4 Target</span>
                          <span className="text-sm font-medium">$3.2M</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Q4 Achieved</span>
                          <span className="text-sm font-medium text-green-600">$2.8M</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Pipeline</span>
                          <span className="text-sm font-medium">$4.1M</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Territory Coverage</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Active Territories</span>
                          <span className="text-sm font-medium">{analytics.regions}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Coverage Rate</span>
                          <span className="text-sm font-medium text-blue-600">87%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">New Opportunities</span>
                          <span className="text-sm font-medium">23</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Quality Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Compliance Score</span>
                          <span className="text-sm font-medium text-green-600">{analytics.complianceRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Customer Satisfaction</span>
                          <span className="text-sm font-medium">4.7/5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Response Time</span>
                          <span className="text-sm font-medium">&lt; 2 hours</span>
                        </div>
                      </div>
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
