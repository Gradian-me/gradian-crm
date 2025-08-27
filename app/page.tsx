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
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/MainLayout"
import { NoSSR } from "@/components/ui/no-ssr"


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
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {kpiData.map((kpi, index) => (
                      <motion.div
                        key={kpi.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                            <div className="flex items-center gap-1 text-xs">
                              <span className={`font-medium ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                                {kpi.change}
                              </span>
                              <span className="text-muted-foreground">from last month</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Actions & Territory Overview */}
                  <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Territory Overview</CardTitle>
                        <CardDescription>Your coverage area and visit distribution</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Hospital Coverage</span>
                            <span className="text-sm text-muted-foreground">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />

                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Clinic Coverage</span>
                            <span className="text-sm text-muted-foreground">72%</span>
                          </div>
                          <Progress value={72} className="h-2" />

                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Pharmacy Coverage</span>
                            <span className="text-sm text-muted-foreground">91%</span>
                          </div>
                          <Progress value={91} className="h-2" />
                        </div>
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
