"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Target,
  Download,
  Filter,
  Eye,
  ExternalLink,
  Activity,
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
import { hcpList, getRegions, getSpecialties, getHCPsByRegion, getHCPsByFacilityType } from "@/lib/hcp-list"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

// Calculate analytics from HCP data
const calculateAnalytics = () => {
  const totalHCPs = hcpList.length
  const completedVisits = hcpList.filter(hcp => hcp.status === "completed").length
  const inProgressVisits = hcpList.filter(hcp => hcp.status === "in-progress").length
  const avgEngagementScore = Math.round(hcpList.reduce((sum, hcp) => sum + (hcp.engagementScore || 0), 0) / totalHCPs)
  
  // Calculate total samples and gifts across all HCPs
  const totalSamples = hcpList.reduce((sum, hcp) => sum + (hcp.sunshineAct?.samples || 0), 0)
  const totalGifts = hcpList.reduce((sum, hcp) => sum + (hcp.sunshineAct?.gifts || 0), 0)
  
  // Calculate revenue estimates based on engagement scores and visit counts
  const estimatedRevenue = hcpList.reduce((sum, hcp) => {
    const baseRevenue = (hcp.engagementScore || 0) * 1000 // $1K per engagement point
    return sum + baseRevenue
  }, 0)

  return {
    totalHCPs,
    completedVisits,
    inProgressVisits,
    avgEngagementScore,
    totalSamples,
    totalGifts,
    estimatedRevenue,
    regions: getRegions(),
    specialties: getSpecialties(),
  }
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  
  const analytics = useMemo(() => calculateAnalytics(), [])
  
  // Performance metrics based on HCP data
  const performanceMetrics = [
    {
      title: "Total HCPs",
      value: analytics.totalHCPs.toString(),
      change: "+12.5%",
      trend: "up",
      period: "vs last quarter",
      icon: Users,
    },
    {
      title: "Avg. Engagement",
      value: `${analytics.avgEngagementScore}%`,
      change: "+5.2%",
      trend: "up",
      period: "vs last quarter",
      icon: TrendingUp,
    },
    {
      title: "Completed Visits",
      value: analytics.completedVisits.toString(),
      change: "+8.1%",
      trend: "up",
      period: "vs last quarter",
      icon: Activity,
    },
    {
      title: "Territory Coverage",
      value: `${analytics.regions.length} regions`,
      change: "+1 region",
      period: "vs last quarter",
      trend: "up",
      icon: MapPin,
    },
  ]

  // Top performing HCPs based on engagement score
  const topPerformers = useMemo(() => {
    return hcpList
      .filter(hcp => hcp.engagementScore)
      .sort((a, b) => (b.engagementScore || 0) - (a.engagementScore || 0))
      .slice(0, 4)
      .map(hcp => ({
        name: hcp.name,
        hospital: hcp.institution,
        specialty: hcp.specialty || "General",
        revenue: `$${Math.round((hcp.engagementScore || 0) * 1000 / 1000)}K`,
        growth: hcp.engagementScore && hcp.engagementScore > 85 ? "+28%" : "+15%",
        visits: hcp.status === "completed" ? "Completed" : hcp.status === "in-progress" ? "In Progress" : "Scheduled",
        status: hcp.engagementScore && hcp.engagementScore > 85 ? "rising" : "stable",
        engagementScore: hcp.engagementScore || 0,
        region: hcp.region,
        facilityType: hcp.facilityType,
      }))
  }, [])

  // ECharts options using HCP data
  const getRevenueChartOption = () => {
    const regionData = analytics.regions.map(region => {
      const regionHCPs = getHCPsByRegion(region)
      const revenue = regionHCPs.reduce((sum, hcp) => sum + (hcp.engagementScore || 0) * 1000, 0) / 1000
      return Math.round(revenue)
    })

    return applyChartTheme({
      title: {
        text: "Revenue Performance by Region",
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params: { name: string; value: number }[]) {
          return `${params[0].name}<br/>Revenue: $${params[0].value}K`;
        },
      },
      xAxis: {
        type: "category",
        data: analytics.regions.slice(0, 4), // Show first 4 regions
      },
      yAxis: {
        type: "value",
        name: "Revenue ($K)",
      },
      series: [
        {
          name: "Revenue",
          type: "bar",
          data: regionData.slice(0, 4),
        },
      ],
    })
  }

  const getTerritoryMapOption = () => {
    const regionCoverage = analytics.regions.map(region => {
      const regionHCPs = getHCPsByRegion(region)
      const avgEngagement = regionHCPs.length > 0 
        ? regionHCPs.reduce((sum, hcp) => sum + (hcp.engagementScore || 0), 0) / regionHCPs.length
        : 0
      return { name: region, value: Math.round(avgEngagement) }
    })

    return applyChartTheme({
      title: {
        text: "Territory Engagement by Region",
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}% engagement",
      },
      xAxis: {
        type: "category",
        data: regionCoverage.map(item => item.name),
        axisLabel: {
          rotate: 45,
          interval: 0,
        },
      },
      yAxis: {
        type: "value",
        name: "Engagement %",
        min: 0,
        max: 100,
      },
      series: [
        {
          name: "Engagement",
          type: "bar",
          data: regionCoverage.map(item => item.value),
          itemStyle: {
            color: function(params: { value: number }) {
              const value = params.value
              if (value >= 90) return "#059669"
              if (value >= 80) return "#0891b2"
              if (value >= 70) return "#d97706"
              return "#ef4444"
            },
          },
          label: {
            show: true,
            position: "top",
            formatter: "{c}%",
          },
        },
      ],
    })
  }

  const getHCPEngagementOption = () => {
    const specialtyData = analytics.specialties.map(specialty => {
      const specialtyHCPs = hcpList.filter(hcp => hcp.specialty === specialty)
      const avgEngagement = specialtyHCPs.reduce((sum, hcp) => sum + (hcp.engagementScore || 0), 0) / specialtyHCPs.length
      return { value: Math.round(avgEngagement), name: specialty }
    }).filter(item => !isNaN(item.value))

    return applyChartTheme({
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
          data: specialtyData,
        },
      ],
    }, chartTheme.schemes.extended)
  }

  const getSalesFunnelOption = () => {
    const totalHCPs = hcpList.length
    const qualifiedHCPs = hcpList.filter(hcp => (hcp.engagementScore || 0) > 70).length
    const proposalHCPs = hcpList.filter(hcp => (hcp.engagementScore || 0) > 80).length
    const negotiationHCPs = hcpList.filter(hcp => (hcp.engagementScore || 0) > 90).length
    const closedHCPs = hcpList.filter(hcp => hcp.status === "completed").length

    return applyChartTheme({
      title: {
        text: "HCP Engagement Funnel",
      },
      tooltip: {
        trigger: "item",
        formatter: function(params: { name: string; value: number }) {
          const stage = params.name;
          const value = params.value;
          const percentage = Math.round((value / totalHCPs) * 100);
          return `${stage}<br/>Count: ${value}<br/>Percentage: ${percentage}%`;
        },
      },
      legend: {
        orient: "vertical",
        right: "5%",
        top: "middle",
        data: ["Total HCPs", "Qualified", "High Engagement", "Very High", "Completed"],
      },
      series: [
        {
          name: "HCP Funnel",
          type: "funnel",
          left: "10%",
          width: "80%",
          height: "80%",
          min: 0,
          max: totalHCPs,
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
            { value: totalHCPs, name: "Total HCPs", itemStyle: { color: "#2563eb" } },
            { value: qualifiedHCPs, name: "Qualified", itemStyle: { color: "#7c3aed" } },
            { value: proposalHCPs, name: "High Engagement", itemStyle: { color: "#0891b2" } },
            { value: negotiationHCPs, name: "Very High", itemStyle: { color: "#d97706" } },
            { value: closedHCPs, name: "Completed", itemStyle: { color: "#059669" } },
          ],
        },
      ],
    })
  }

  const getTrendAnalysisOption = () => {
    const monthlyData = {
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      samples: Array.from({ length: 6 }, () => analytics.totalSamples / 6 + Math.random() * 10),
      visits: Array.from({ length: 6 }, () => analytics.completedVisits / 6 + Math.random() * 5),
      engagement: Array.from({ length: 6 }, () => analytics.avgEngagementScore + Math.random() * 10),
    }

    return applyChartTheme({
      title: {
        text: "Performance Trends",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Engagement", "Visits", "Samples"],
      },
      xAxis: {
        type: "category",
        data: monthlyData.months,
      },
      yAxis: [
        {
          type: "value",
          name: "Engagement (%)",
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
          name: "Engagement",
          type: "line",
          yAxisIndex: 0,
          data: monthlyData.engagement.map(v => Math.round(v)),
        },
        {
          name: "Visits",
          type: "line",
          yAxisIndex: 1,
          data: monthlyData.visits.map(v => Math.round(v)),
        },
        {
          name: "Samples",
          type: "bar",
          yAxisIndex: 1,
          data: monthlyData.samples.map(v => Math.round(v)),
        },
      ],
    })
  }

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
      <div className="p-2 md:p-4 lg:p-6">
        <NoSSR>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-[600px]">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="performance" className="text-xs sm:text-sm">Performance</TabsTrigger>
              <TabsTrigger value="territory" className="text-xs sm:text-sm">Territory</TabsTrigger>
              <TabsTrigger value="insights" className="text-xs sm:text-sm">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Performance Metrics */}
              <KPIGrid
                metrics={performanceMetrics.map((metric, index) => ({
                  title: metric.title,
                  value: metric.value,
                  change: metric.change,
                  trend: metric.trend,
                  period: metric.period,
                  icon: metric.icon,
                  variant: index === 0 ? "gradient" : index === 1 ? "featured" : index === 2 ? "purple" : "default",
                }))}
              />

              {/* Main Charts */}
              <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>Revenue Performance</CardTitle>
                    <CardDescription>Quarterly revenue trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getRevenueChartOption()} style={{ height: "100%" }} className="h-[250px] sm:h-[300px] lg:h-[350px] min-h-[200px]" />
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>HCP Engagement</CardTitle>
                    <CardDescription>Engagement rates by specialty</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getHCPEngagementOption()} style={{ height: "100%" }} className="h-[250px] sm:h-[300px] lg:h-[350px] min-h-[200px]" />
                  </CardContent>
                </Card>
              </div>

              {/* Top Performers */}
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="text-gradient">Top Performing HCPs</CardTitle>
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
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium truncate">{performer.name}</h3>
                            <p className="text-sm text-muted-foreground truncate">{performer.hospital}</p>
                            <p className="text-xs text-muted-foreground truncate">{performer.specialty}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-6">
                          <div className="text-center min-w-0">
                            <p className="text-sm font-medium">{performer.revenue}</p>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                          </div>
                          <div className="text-center min-w-0">
                            <p className="text-sm font-medium">{performer.growth}</p>
                            <p className="text-xs text-muted-foreground">Growth</p>
                          </div>
                          <div className="text-center min-w-0 hidden sm:block">
                            <p className="text-sm font-medium">{performer.visits}</p>
                            <p className="text-xs text-muted-foreground">Visits</p>
                          </div>
                          <div className="shrink-0">
                            {getStatusBadge(performer.status)}
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0 self-start sm:self-center">
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
              <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>Sales Funnel</CardTitle>
                    <CardDescription>Conversion rates through sales stages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getSalesFunnelOption()} style={{ height: "100%" }} className="h-[300px] sm:h-[350px] lg:h-[400px] min-h-[250px]" />
                  </CardContent>
                </Card>

                <Card className="card-minimal">
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Monthly performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getTrendAnalysisOption()} style={{ height: "100%" }} className="h-[300px] sm:h-[350px] lg:h-[400px] min-h-[250px]" />
                  </CardContent>
                </Card>
              </div>

              {/* Performance Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                  <CardDescription>Detailed analysis by specialty and region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-4">
                      <h4 className="font-medium">By Specialty</h4>
                      <div className="space-y-3">
                        {analytics.specialties.slice(0, 4).map(specialty => {
                          const specialtyHCPs = hcpList.filter(hcp => hcp.specialty === specialty)
                          const count = specialtyHCPs.length
                          const percentage = Math.round((count / analytics.totalHCPs) * 100)
                          return (
                            <div key={specialty} className="flex justify-between items-center">
                              <span className="text-sm">{specialty}</span>
                              <span className="text-sm font-medium">{count} HCPs ({percentage}%)</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">By Region</h4>
                      <div className="space-y-3">
                        {analytics.regions.slice(0, 4).map(region => {
                          const regionHCPs = getHCPsByRegion(region)
                          const count = regionHCPs.length
                          const percentage = Math.round((count / analytics.totalHCPs) * 100)
                          return (
                            <div key={region} className="flex justify-between items-center">
                              <span className="text-sm">{region}</span>
                              <span className="text-sm font-medium">{count} HCPs ({percentage}%)</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Key Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Total Samples</span>
                          <span className="text-sm font-medium">{analytics.totalSamples}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Total Gifts</span>
                          <span className="text-sm font-medium">{analytics.totalGifts}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Public vs Private</span>
                          <span className="text-sm font-medium">{getHCPsByFacilityType('Public').length} / {getHCPsByFacilityType('Private').length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Avg. Engagement</span>
                          <span className="text-sm font-medium">{analytics.avgEngagementScore}%</span>
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
                  <CardDescription>Regional engagement analysis and coverage metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReactECharts option={getTerritoryMapOption()} style={{ height: "100%" }} className="h-[300px] sm:h-[350px] lg:h-[400px] min-h-[250px]" />
                </CardContent>
              </Card>

              {/* Territory Details */}
              <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Coverage Analysis</CardTitle>
                    <CardDescription>Territory coverage and performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.regions.map((region) => {
                        const regionHCPs = getHCPsByRegion(region)
                        const avgEngagement = regionHCPs.length > 0 
                          ? Math.round(regionHCPs.reduce((sum, hcp) => sum + (hcp.engagementScore || 0), 0) / regionHCPs.length)
                          : 0
                        const completedVisits = regionHCPs.filter(hcp => hcp.status === "completed").length
                        const coverage = regionHCPs.length > 0 ? Math.round((completedVisits / regionHCPs.length) * 100) : 0
                        
                        return (
                          <div key={region} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{region}</h4>
                              <p className="text-sm text-muted-foreground">{regionHCPs.length} HCPs</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{coverage}% visits completed</p>
                              <p className="text-xs text-muted-foreground">{avgEngagement}% avg engagement</p>
                            </div>
                          </div>
                        )
                      })}
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
                        <h4 className="font-medium text-green-800">High Performing Specialties</h4>
                        <p className="text-sm text-green-600">{
                          analytics.specialties.find(specialty => {
                            const specialtyHCPs = hcpList.filter(hcp => hcp.specialty === specialty)
                            const avgEngagement = specialtyHCPs.reduce((sum, hcp) => sum + (hcp.engagementScore || 0), 0) / specialtyHCPs.length
                            return avgEngagement > 85
                          }) || "Multiple specialties"
                        } shows exceptional engagement scores above 85%</p>
                      </div>

                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-medium text-yellow-800">Growth Opportunities</h4>
                        <p className="text-sm text-yellow-600">{
                          analytics.regions.find(region => {
                            const regionHCPs = getHCPsByRegion(region)
                            return regionHCPs.length < 3
                          }) || "Focus regions"
                        } has potential for expanding HCP network and engagement</p>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800">Resource Allocation</h4>
                        <p className="text-sm text-blue-600">Consider focusing on {getHCPsByFacilityType('Private').length > getHCPsByFacilityType('Public').length ? 'public' : 'private'} facilities for balanced coverage</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid gap-4 md:gap-6 md:grid-cols-2">
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
                          <h4 className="font-medium text-blue-800">Focus on High Engagement</h4>
                          <p className="text-sm text-blue-600">
                            {hcpList.filter(hcp => (hcp.engagementScore || 0) > 90).length} HCPs have 90%+ engagement scores - prioritize these relationships
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <Users className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800">Expand Regional Coverage</h4>
                          <p className="text-sm text-green-600">
                            {analytics.regions.find(region => getHCPsByRegion(region).length < 3) || "Emerging regions"} could benefit from increased HCP engagement
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Complete Pending Visits</h4>
                          <p className="text-sm text-yellow-600">
                            {hcpList.filter(hcp => hcp.status === "scheduled" || hcp.status === "in-progress").length} visits are pending completion
                          </p>
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
                      <div className="text-2xl font-bold text-green-600">{analytics.avgEngagementScore}%</div>
                      <p className="text-sm text-muted-foreground">Avg. Engagement</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{Math.round((analytics.completedVisits / analytics.totalHCPs) * 100)}%</div>
                      <p className="text-sm text-muted-foreground">Visit Completion Rate</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{analytics.totalHCPs}</div>
                      <p className="text-sm text-muted-foreground">Total HCPs</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{analytics.totalSamples}</div>
                      <p className="text-sm text-muted-foreground">Total Samples Distributed</p>
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