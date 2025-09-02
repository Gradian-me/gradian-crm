"use client"

import { useState } from "react"
// Temporarily commenting out framer-motion to test if it's causing the module conflict
// import { motion } from "framer-motion"
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
import { KPIGrid } from "@/components/analytics"

// Temporary chart placeholder to isolate the module issue
const ChartPlaceholder = ({ title }: { title: string }) => (
  <div className="h-[300px] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded border-2 border-dashed border-gray-300">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500">Chart temporarily disabled</p>
      <p className="text-xs text-gray-400 mt-1">Resolving module compatibility issues</p>
    </div>
  </div>
)

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

// Temporary removal of chart configurations to isolate module issue

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
      <div className="p-2 md:p-4 lg:p-6">
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
                    <ChartPlaceholder title="Inventory Distribution" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stock Levels by Product</CardTitle>
                    <CardDescription>Current inventory levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartPlaceholder title="Stock Levels by Product" />
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
                    {filteredSamples.map((sample) => (
                      <div
                        key={sample.id}
                        className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors gap-4"
                      >
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Package className="h-6 w-6 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium truncate">{sample.name}</h3>
                            <p className="text-sm text-muted-foreground">SKU: {sample.sku}</p>
                            <p className="text-sm text-muted-foreground">{sample.category}</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 w-full lg:w-auto">
                          <div className="flex justify-between sm:justify-start sm:gap-6 lg:gap-4 flex-1">
                            <div className="text-left sm:text-right">
                              <p className="text-sm font-medium">{sample.available} available</p>
                              <p className="text-xs text-muted-foreground">of {sample.quantity}</p>
                            </div>
                            <div className="flex items-center">
                              {getStatusBadge(sample.status)}
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">Last Updated</p>
                              <p className="text-xs text-muted-foreground">{sample.lastUpdated}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 justify-end lg:justify-start">
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
                        </div>
                      </div>
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
                    {inventoryTransactions.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg gap-4"
                      >
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Truck className="h-5 w-5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium truncate">{item.reference}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 lg:line-clamp-1">{item.description}</p>
                            <p className="text-xs text-muted-foreground">Item ID: {item.itemId}</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 w-full lg:w-auto">
                          <div className="flex justify-between sm:justify-start sm:gap-6 lg:gap-4 items-center">
                            <div className="text-left sm:text-right">
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
                        </div>
                      </div>
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
                    <ChartPlaceholder title="Stock Value by Product" />
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
      </div>
    </MainLayout>
  )
}