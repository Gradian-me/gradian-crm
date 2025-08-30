"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout/MainLayout"
import {
  Activity,
  Award,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  Target,
  Star,
  Route,
  BarChart3,
  Trophy,
  CheckCircle,
  Clock3,
  Navigation,
  DollarSign,
} from "lucide-react"

// Mock data for med reps
const medRepsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/api/placeholder/40/40",
    region: "North East",
    performance: 94,
    activities: 28,
    routes: 12,
    sales: 156000,
    status: "active",
    lastActivity: "2 hours ago",
    topProducts: ["CardioMax Pro", "NeuroFlow", "VitalSigns"],
    achievements: ["Top Performer Q1", "Route Champion", "Sales Leader"],
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/api/placeholder/40/40",
    region: "West Coast",
    performance: 87,
    activities: 24,
    routes: 10,
    sales: 142000,
    status: "active",
    lastActivity: "4 hours ago",
    topProducts: ["NeuroFlow", "CardioMax Pro", "VitalSigns"],
    achievements: ["Growth Champion", "Customer Focus"],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/api/placeholder/40/40",
    region: "South Central",
    performance: 91,
    activities: 26,
    routes: 11,
    sales: 148000,
    status: "active",
    lastActivity: "1 hour ago",
    topProducts: ["VitalSigns", "CardioMax Pro", "NeuroFlow"],
    achievements: ["Rising Star", "Route Efficiency"],
  },
]

const routeData = [
  {
    id: 1,
    name: "Downtown Medical District",
    rep: "Sarah Johnson",
    stops: 8,
    distance: "45 km",
    duration: "6.5 hours",
    efficiency: 92,
    status: "completed",
  },
  {
    id: 2,
    name: "Suburban Healthcare Loop",
    rep: "Michael Chen",
    stops: 6,
    distance: "38 km",
    duration: "5.2 hours",
    efficiency: 88,
    status: "in-progress",
  },
  {
    id: 3,
    name: "Rural Medical Outreach",
    rep: "Emily Rodriguez",
    stops: 10,
    distance: "67 km",
    duration: "8.0 hours",
    efficiency: 95,
    status: "planned",
  },
]

const bestSellers = [
  { name: "CardioMax Pro", sales: 234, growth: 12, rep: "Sarah Johnson" },
  { name: "NeuroFlow", sales: 198, growth: 8, rep: "Michael Chen" },
  { name: "VitalSigns", sales: 187, growth: 15, rep: "Emily Rodriguez" },
  { name: "OrthoFlex", sales: 156, growth: 5, rep: "Sarah Johnson" },
  { name: "PulmoCare", sales: 134, growth: 22, rep: "Emily Rodriguez" },
]

const performanceMetrics = {
  totalReps: 24,
  activeReps: 22,
  avgPerformance: 89,
  totalSales: 3200000,
  totalActivities: 612,
  totalRoutes: 156,
  topPerformer: "Sarah Johnson",
  growthRate: 12.5,
}

export default function MedRepsPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Representatives</h1>
          <p className="text-muted-foreground">
            Track performance, activities, and insights for your medical sales team
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Add Rep
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reps</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.totalReps}</div>
            <p className="text-xs text-muted-foreground">
              {performanceMetrics.activeReps} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.avgPerformance}%</div>
            <p className="text-xs text-muted-foreground">
              +{performanceMetrics.growthRate}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(performanceMetrics.totalSales / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              {performanceMetrics.totalActivities} activities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{performanceMetrics.topPerformer}</div>
            <p className="text-xs text-muted-foreground">Leading the team</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="routing">Routing</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="champions">Champions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rep Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Rep Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {medRepsData.map((rep) => (
                  <div key={rep.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={rep.avatar} />
                        <AvatarFallback>{rep.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{rep.name}</p>
                        <p className="text-sm text-muted-foreground">{rep.region}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">{rep.performance}%</span>
                        <Badge variant={rep.performance >= 90 ? "default" : rep.performance >= 80 ? "secondary" : "destructive"}>
                          {rep.performance >= 90 ? "Excellent" : rep.performance >= 80 ? "Good" : "Needs Improvement"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">${rep.sales.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {medRepsData.map((rep) => (
                  <div key={rep.id} className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">{rep.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{rep.lastActivity}</span>
                  </div>
                ))}
                <Separator />
                <div className="text-center">
                  <Button variant="ghost" size="sm">
                    View All Activities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Distribution */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medRepsData.map((rep) => (
                    <div key={rep.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{rep.name}</span>
                        <span className="text-sm text-muted-foreground">{rep.performance}%</span>
                      </div>
                      <Progress value={rep.performance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Products by Rep</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bestSellers.slice(0, 5).map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <span className="text-sm font-medium">{product.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{product.sales}</p>
                        <p className="text-xs text-green-600">+{product.growth}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Routing Tab */}
        <TabsContent value="routing" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Route Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  Route Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routeData.map((route) => (
                    <div key={route.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{route.name}</h4>
                        <Badge variant={route.status === 'completed' ? 'default' : route.status === 'in-progress' ? 'secondary' : 'outline'}>
                          {route.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Rep</p>
                          <p className="font-medium">{route.rep}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Stops</p>
                          <p className="font-medium">{route.stops}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Distance</p>
                          <p className="font-medium">{route.distance}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Efficiency</p>
                          <p className="font-medium">{route.efficiency}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Route Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Route Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Total Routes</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{performanceMetrics.totalRoutes}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Completed</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">89%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">Avg Duration</span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-600">6.2h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Sales Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Monthly Growth</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      +{performanceMetrics.growthRate}%
                    </Badge>
                  </div>
                  <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{performanceMetrics.totalActivities}</p>
                      <p className="text-sm text-muted-foreground">Total Activities</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{Math.round(performanceMetrics.totalActivities / performanceMetrics.totalReps)}</p>
                      <p className="text-sm text-muted-foreground">Avg per Rep</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Champions Tab */}
        <TabsContent value="champions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medRepsData
                    .sort((a, b) => b.performance - a.performance)
                    .map((rep, index) => (
                      <div key={rep.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-800 font-bold">
                          {index + 1}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={rep.avatar} />
                          <AvatarFallback>{rep.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{rep.name}</p>
                          <p className="text-sm text-muted-foreground">{rep.region}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{rep.performance}%</p>
                          <p className="text-sm text-muted-foreground">${rep.sales.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {medRepsData.flatMap(rep => 
                    rep.achievements.map((achievement, index) => (
                      <div key={`${rep.id}-${index}`} className="flex items-center gap-3 p-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{achievement}</p>
                          <p className="text-xs text-muted-foreground">Earned by {rep.name}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </MainLayout>
  )
} 