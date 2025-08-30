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
  AlertTriangle,
  Truck,
  TrendingUp,
  Trash2,
  CheckCircle,
  Clock,
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

// Inventory data
const inventoryData = [
  {
    id: "INV001",
    name: "CardioStent Pro",
    sku: "CS-PRO-001",
    quantity: 150,
    reserved: 35,
    available: 115,
    reorderPoint: 20,
    maxStock: 200,
    unitCost: 89.99,
    totalValue: 13498.50,
    category: "Cardiology",
    location: "Central Warehouse",
    supplier: "MedTech Pro",
    lastUpdated: "2024-12-10",
    status: "in-stock",
  },
  {
    id: "INV002",
    name: "NeuroFlow Device",
    sku: "NF-DEV-002",
    quantity: 80,
    reserved: 28,
    available: 52,
    reorderPoint: 15,
    maxStock: 100,
    unitCost: 149.99,
    totalValue: 11999.20,
    category: "Neurology",
    location: "North Warehouse",
    supplier: "NeuroTech Inc",
    lastUpdated: "2024-12-09",
    status: "low-stock",
  },
  {
    id: "INV003",
    name: "OrthoFix Implant",
    sku: "OF-IMP-003",
    quantity: 200,
    reserved: 45,
    available: 155,
    reorderPoint: 30,
    maxStock: 250,
    unitCost: 299.99,
    totalValue: 59998.00,
    category: "Orthopedics",
    location: "Central Warehouse",
    supplier: "OrthoCare Ltd",
    lastUpdated: "2024-12-08",
    status: "in-stock",
  },
  {
    id: "INV004",
    name: "DermaCare Cream",
    sku: "DC-CRM-004",
    quantity: 500,
    reserved: 180,
    available: 320,
    reorderPoint: 50,
    maxStock: 600,
    unitCost: 24.99,
    totalValue: 12495.00,
    category: "Dermatology",
    location: "South Warehouse",
    supplier: "DermaSolutions",
    lastUpdated: "2024-12-07",
    status: "in-stock",
  },
  {
    id: "INV005",
    name: "Respiratory Monitor",
    sku: "RM-MON-005",
    quantity: 12,
    reserved: 8,
    available: 4,
    reorderPoint: 10,
    maxStock: 50,
    unitCost: 899.99,
    totalValue: 10799.88,
    category: "Respiratory",
    location: "East Warehouse",
    supplier: "RespTech",
    lastUpdated: "2024-12-06",
    status: "critical-stock",
  },
]

const inventoryTransactions = [
  {
    id: 1,
    itemId: "INV001",
    type: "outbound",
    quantity: 15,
    reference: "PO-2024-001",
    description: "Field demonstration - Dr. Sarah Johnson",
    date: "2024-12-10",
    status: "completed",
    location: "Central Warehouse",
  },
  {
    id: 2,
    itemId: "INV002",
    type: "inbound",
    quantity: 50,
    reference: "GRN-2024-002",
    description: "Stock replenishment from supplier",
    date: "2024-12-09",
    status: "completed",
    location: "North Warehouse",
  },
  {
    id: 3,
    itemId: "INV003",
    type: "transfer",
    quantity: 25,
    reference: "TR-2024-003",
    description: "Transfer to South Warehouse",
    date: "2024-12-08",
    status: "in-transit",
    location: "Central Warehouse",
  },
]

// ECharts options
const getInventoryChartOption = () => applyChartTheme({
  title: {
    text: "Inventory Overview by Category",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} units ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    top: "middle",
  },
  series: [
    {
      name: "Inventory Categories",
      type: "pie",
      data: [
        { value: 150, name: "Cardiology" },
        { value: 80, name: "Neurology" },
        { value: 200, name: "Orthopedics" },
        { value: 500, name: "Dermatology" },
        { value: 12, name: "Respiratory" },
      ],
    },
  ],
}, chartTheme.schemes.extended)

const getInventoryTrendOption = () => applyChartTheme({
  title: {
    text: "Inventory Levels by Product",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Available", "Reserved", "Reorder Point"],
  },
  xAxis: {
    type: "category",
    data: ["CardioStent Pro", "NeuroFlow Device", "OrthoFix Implant", "DermaCare Cream", "Respiratory Monitor"],
  },
  yAxis: {
    type: "value",
    name: "Quantity",
  },
  series: [
    {
      name: "Available",
      type: "bar",
      data: [115, 52, 155, 320, 4],
    },
    {
      name: "Reserved",
      type: "bar",
      data: [35, 28, 45, 180, 8],
    },
    {
      name: "Reorder Point",
      type: "line",
      data: [20, 15, 30, 50, 10],
    },
  ],
})

const getStockValueChartOption = () => applyChartTheme({
  title: {
    text: "Inventory Value by Product",
  },
  tooltip: {
    trigger: "axis",
    formatter: function (params: { name: string; seriesName: string; value: number }[]) {
      return `${params[0].name}<br/>${params[0].seriesName}: $${params[0].value.toLocaleString()}`;
    },
  },
  xAxis: {
    type: "category",
    data: ["CardioStent Pro", "NeuroFlow Device", "OrthoFix Implant", "DermaCare Cream", "Respiratory Monitor"],
  },
  yAxis: {
    type: "value",
    name: "Value ($)",
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

  const filteredSamples = inventoryData.filter(sample =>
    sample.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sample.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sample.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "in-stock": { color: "bg-green-100 text-green-800", text: "In Stock" },
      "low-stock": { color: "bg-yellow-100 text-yellow-800", text: "Low Stock" },
      "critical-stock": { color: "bg-red-100 text-red-800", text: "Critical Stock" },
      "out-of-stock": { color: "bg-gray-100 text-gray-800", text: "Out of Stock" },
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
                    <CardTitle>Stock Levels by Product</CardTitle>
                    <CardDescription>Current inventory levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getInventoryTrendOption()} style={{ height: "300px" }} />
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
                            <p className="text-sm text-muted-foreground">SKU: {sample.sku}</p>
                            <p className="text-sm text-muted-foreground">{sample.category}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{sample.available} available</p>
                            <p className="text-xs text-muted-foreground">of {sample.quantity}</p>
                          </div>
                          {getStatusBadge(sample.status)}
                          <div className="text-right">
                            <p className="text-sm font-medium">Last Updated</p>
                            <p className="text-xs text-muted-foreground">{sample.lastUpdated}</p>
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
                    {inventoryTransactions.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Truck className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.reference}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <p className="text-xs text-muted-foreground">Item ID: {item.itemId}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">Qty: {item.quantity}</p>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                          <Badge
                            className={
                              item.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {item.status === "completed" ? (
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
                    <CardTitle>Stock Value by Product</CardTitle>
                    <CardDescription>Inventory value distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getStockValueChartOption()} style={{ height: "300px" }} />
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