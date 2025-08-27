"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  Calendar,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/MainLayout"
import { NoSSR } from "@/components/ui/no-ssr"
import dynamic from "next/dynamic"
import { applyChartTheme, chartTheme } from "@/lib/chart-theme"
import { KPIGrid } from "@/components/analytics"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

// Sample data
const sampleData = [
  {
    id: "S001",
    name: "CardioStent Pro",
    batch: "B2024-001",
    quantity: 50,
    distributed: 35,
    remaining: 15,
    expiryDate: "2025-06-15",
    status: "active",
    category: "Cardiology",
    location: "Central Warehouse",
    lastUpdated: "2024-12-10",
  },
  {
    id: "S002",
    name: "NeuroFlow Device",
    batch: "B2024-002",
    quantity: 30,
    distributed: 28,
    remaining: 2,
    expiryDate: "2025-03-20",
    status: "low-stock",
    category: "Neurology",
    location: "North Warehouse",
    lastUpdated: "2024-12-09",
  },
  {
    id: "S003",
    name: "OrthoFix Implant",
    batch: "B2024-003",
    quantity: 100,
    distributed: 45,
    remaining: 55,
    expiryDate: "2026-01-10",
    status: "active",
    category: "Orthopedics",
    location: "Central Warehouse",
    lastUpdated: "2024-12-08",
  },
  {
    id: "S004",
    name: "DermaCare Cream",
    batch: "B2024-004",
    quantity: 200,
    distributed: 180,
    remaining: 20,
    expiryDate: "2024-12-31",
    status: "expiring-soon",
    category: "Dermatology",
    location: "South Warehouse",
    lastUpdated: "2024-12-07",
  },
]

const distributionHistory = [
  {
    id: 1,
    sampleId: "S001",
    hcpName: "Dr. Sarah Johnson",
    hospital: "City General Hospital",
    quantity: 5,
    date: "2024-12-10",
    status: "delivered",
  },
  {
    id: 2,
    sampleId: "S002",
    hcpName: "Dr. Michael Chen",
    hospital: "Regional Medical Center",
    quantity: 3,
    date: "2024-12-09",
    status: "in-transit",
  },
  {
    id: 3,
    sampleId: "S003",
    hcpName: "Dr. Emily Rodriguez",
    hospital: "University Hospital",
    quantity: 10,
    date: "2024-12-08",
    status: "delivered",
  },
]

// ECharts options
const getInventoryChartOption = () => applyChartTheme({
  title: {
    text: "Sample Inventory Overview",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    top: "middle",
  },
  series: [
    {
      name: "Sample Categories",
      type: "pie",
      data: [
        { value: 35, name: "Cardiology" },
        { value: 28, name: "Neurology" },
        { value: 45, name: "Orthopedics" },
        { value: 180, name: "Dermatology" },
      ],
    },
  ],
}, chartTheme.schemes.extended)

const getDistributionTrendOption = () => applyChartTheme({
  title: {
    text: "Sample Distribution Trends",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Distributed", "Remaining"],
  },
  xAxis: {
    type: "category",
    data: ["CardioStent Pro", "NeuroFlow Device", "OrthoFix Implant", "DermaCare Cream"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Distributed",
      type: "bar",
      data: [35, 28, 45, 180],
    },
    {
      name: "Remaining",
      type: "bar",
      data: [15, 2, 55, 20],
    },
  ],
})

const getExpiryChartOption = () => applyChartTheme({
  title: {
    text: "Sample Expiry Timeline",
  },
  tooltip: {
    trigger: "axis",
    formatter: function (params: any) {
      return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].value} days`;
    },
  },
  xAxis: {
    type: "category",
    data: ["CardioStent Pro", "NeuroFlow Device", "OrthoFix Implant", "DermaCare Cream"],
  },
  yAxis: {
    type: "value",
    name: "Days Until Expiry",
  },
  series: [
    {
      name: "Days Until Expiry",
      type: "line",
      data: [187, 100, 396, 21],
    },
  ],
})

export default function SamplesPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSamples = sampleData.filter(sample =>
    sample.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sample.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sample.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", text: "Active" },
      "low-stock": { color: "bg-yellow-100 text-yellow-800", text: "Low Stock" },
      "expiring-soon": { color: "bg-red-100 text-red-800", text: "Expiring Soon" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.color}>{config.text}</Badge>
  }

  return (
    <MainLayout
      headerTitle="Sample Management"
      headerSubtitle="Track and manage sample distribution across your territory"
      customHeaderActions={
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Sample
        </Button>
      }
    >
      <div className="p-6">
        <NoSSR>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Summary Cards */}
              <KPIGrid
                metrics={[
                  {
                    title: "Total Samples",
                    value: "380",
                    description: "Across all categories",
                    icon: Package,
                  },
                  {
                    title: "Distributed",
                    value: "288",
                    change: "+12%",
                    trend: "up" as const,
                    period: "from last month",
                    icon: TrendingUp,
                  },
                  {
                    title: "Remaining",
                    value: "92",
                    description: "Available for distribution",
                    icon: Package,
                  },
                  {
                    title: "Expiring Soon",
                    value: "22",
                    description: "Within 30 days",
                    icon: AlertTriangle,
                    variant: "warning",
                  },
                ]}
              />

              {/* Charts Row */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Distribution</CardTitle>
                    <CardDescription>Sample quantities by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getInventoryChartOption()} style={{ height: "300px" }} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribution vs Remaining</CardTitle>
                    <CardDescription>Current stock levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getDistributionTrendOption()} style={{ height: "300px" }} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardHeader>
                  <CardTitle>Sample Inventory</CardTitle>
                  <CardDescription>Manage and track all sample products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search samples..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {filteredSamples.map((sample, index) => (
                      <motion.div
                        key={sample.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Package className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{sample.name}</h3>
                            <p className="text-sm text-muted-foreground">Batch: {sample.batch}</p>
                            <p className="text-sm text-muted-foreground">{sample.category}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{sample.remaining} remaining</p>
                            <p className="text-xs text-muted-foreground">of {sample.quantity}</p>
                          </div>
                          {getStatusBadge(sample.status)}
                          <div className="text-right">
                            <p className="text-sm font-medium">Expires</p>
                            <p className="text-xs text-muted-foreground">{sample.expiryDate}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="distribution" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribution History</CardTitle>
                  <CardDescription>Track all sample distributions and deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {distributionHistory.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.hcpName}</h3>
                            <p className="text-sm text-muted-foreground">{item.hospital}</p>
                            <p className="text-xs text-muted-foreground">Sample ID: {item.sampleId}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">Qty: {item.quantity}</p>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                          <Badge
                            className={
                              item.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {item.status === "delivered" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {item.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Expiry Timeline</CardTitle>
                    <CardDescription>Days until samples expire</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getExpiryChartOption()} style={{ height: "300px" }} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribution Metrics</CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Distribution Rate</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">75.8%</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Coverage</span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">89%</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium">Avg. Delivery Time</span>
                        </div>
                        <span className="text-lg font-bold text-yellow-600">2.3 days</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">Active Recipients</span>
                        </div>
                        <span className="text-lg font-bold text-purple-600">156</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
                    </NoSSR>
          </div>
    </MainLayout>
  )
} 