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
  Upload,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/MainLayout"
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
      name: "Total Value",
      type: "bar",
      data: [13498.50, 11999.20, 59998.00, 12495.00, 10799.88],
    },
  ],
})

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  // Calculate inventory statistics
  const totalItems = inventoryData.length
  const totalQuantity = inventoryData.reduce((sum, item) => sum + item.quantity, 0)
  const totalValue = inventoryData.reduce((sum, item) => sum + item.totalValue, 0)
  const lowStockItems = inventoryData.filter(item => item.quantity <= item.reorderPoint).length
  const criticalStockItems = inventoryData.filter(item => item.status === "critical-stock").length

  // Filter inventory based on search
  const filteredInventory = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "in-stock": { color: "bg-green-100 text-green-800", text: "In Stock" },
      "low-stock": { color: "bg-yellow-100 text-yellow-800", text: "Low Stock" },
      "critical-stock": { color: "bg-red-100 text-red-800", text: "Critical" },
      "out-of-stock": { color: "bg-gray-100 text-gray-800", text: "Out of Stock" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    
    // Handle undefined status with a fallback
    if (!config) {
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
    
    return <Badge className={config.color}>{config.text}</Badge>
  }

  const getTransactionTypeBadge = (type: string) => {
    const typeConfig = {
      "inbound": { color: "bg-green-100 text-green-800", text: "Inbound" },
      "outbound": { color: "bg-red-100 text-red-800", text: "Outbound" },
      "transfer": { color: "bg-blue-100 text-blue-800", text: "Transfer" },
    }
    const config = typeConfig[type as keyof typeof typeConfig]
    
    // Handle undefined type with a fallback
    if (!config) {
      return <Badge className="bg-gray-100 text-gray-800">{type}</Badge>
    }
    
    return <Badge className={config.color}>{config.text}</Badge>
  }

  return (
    <MainLayout
      headerTitle="Inventory Management"
      headerSubtitle="Comprehensive inventory tracking and management system"
      customHeaderActions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      }
    >
      <div className="p-6">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Inventory Management System</h1>
            <p className="text-muted-foreground text-lg">
              Track stock levels, manage inventory, and optimize warehouse operations
            </p>
          </div>

          {/* KPI Metrics */}
          <KPIGrid
            metrics={[
              {
                title: "Total Items",
                value: totalItems.toString(),
                description: "Unique products in inventory",
                icon: Package,
              },
              {
                title: "Total Quantity",
                value: totalQuantity.toString(),
                description: "Units across all products",
                icon: Truck,
              },
              {
                title: "Total Value",
                value: `$${totalValue.toLocaleString()}`,
                description: "Current inventory value",
                icon: AlertTriangle,
              },
              {
                title: "Low Stock Alerts",
                value: lowStockItems.toString(),
                description: "Items below reorder point",
                icon: AlertTriangle,
                variant: lowStockItems > 0 ? "warning" : "success",
              },
            ]}
          />

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Charts Row */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Distribution</CardTitle>
                    <CardDescription>Stock quantities by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getInventoryChartOption()} style={{ height: "300px" }} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stock Levels</CardTitle>
                    <CardDescription>Available vs reserved quantities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getInventoryTrendOption()} style={{ height: "300px" }} />
                  </CardContent>
                </Card>
              </div>

              {/* Stock Value Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Value Analysis</CardTitle>
                  <CardDescription>Total value by product</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReactECharts option={getStockValueChartOption()} style={{ height: "300px" }} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Items</CardTitle>
                  <CardDescription>Manage and track all inventory products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search inventory..."
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
                    {filteredInventory.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Package className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                            <p className="text-xs text-muted-foreground">{item.category} • {item.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm font-medium">{item.quantity}</p>
                            <p className="text-xs text-muted-foreground">Total</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{item.available}</p>
                            <p className="text-xs text-muted-foreground">Available</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">${item.unitCost}</p>
                            <p className="text-xs text-muted-foreground">Unit Cost</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">${item.totalValue.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Total Value</p>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Transactions</CardTitle>
                  <CardDescription>Track all inventory movements and changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inventoryTransactions.map((transaction, index) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                            transaction.type === "inbound" ? "bg-green-100" :
                            transaction.type === "outbound" ? "bg-red-100" : "bg-blue-100"
                          }`}>
                            <Truck className={`h-6 w-6 ${
                              transaction.type === "inbound" ? "text-green-600" :
                              transaction.type === "outbound" ? "text-red-600" : "text-blue-600"
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-medium">{transaction.description}</h3>
                            <p className="text-sm text-muted-foreground">Ref: {transaction.reference}</p>
                            <p className="text-xs text-muted-foreground">{transaction.location} • {transaction.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm font-medium">{transaction.quantity}</p>
                            <p className="text-xs text-muted-foreground">Quantity</p>
                          </div>
                          {getTransactionTypeBadge(transaction.type)}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
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
                    <CardTitle>Stock Alerts</CardTitle>
                    <CardDescription>Items requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-red-50 rounded-lg">
                        <h4 className="font-medium text-red-800">Critical Stock</h4>
                        <p className="text-sm text-red-600">{criticalStockItems} items below reorder point</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-medium text-yellow-800">Low Stock</h4>
                        <p className="text-sm text-yellow-600">{lowStockItems} items approaching reorder point</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common inventory tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Item
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Truck className="h-4 w-4 mr-2" />
                      Record Transaction
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Inventory Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
} 