"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/MainLayout"
import { DeviceGrid } from "@/components/medical"
import { medicalDevices, deviceCategories, getDevicesByCategory } from "@/lib/medical-devices"
import Image from "next/image"
import { 
  Search, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Download,
  Upload,
  Users
} from "lucide-react"

export default function DevicesPage() {
  const [activeTab, setActiveTab] = useState("catalog")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Calculate device statistics
  const totalDevices = medicalDevices.length
  const availableDevices = medicalDevices.filter(d => d.status === "available").length
  const outOfStockDevices = medicalDevices.filter(d => d.status === "out-of-stock").length
  const discontinuedDevices = medicalDevices.filter(d => d.status === "discontinued").length

  // Get devices by category for statistics
  const getCategoryCount = (category: string) => {
    return getDevicesByCategory(category).length
  }

  const handleAddToCart = (device: { name: string }) => {
    console.log('Added to cart:', device.name)
    // Handle adding device to cart/order
  }

  const handleViewDetails = (device: { name: string }) => {
    console.log('Viewing device:', device.name)
    // Handle device details view
  }

  const handleAddDevice = () => {
    console.log('Add new device')
    // Handle adding new device
  }

  const handleImportDevices = () => {
    console.log('Import devices')
    // Handle device import
  }

  const handleExportDevices = () => {
    console.log('Export devices')
    // Handle device export
  }

  return (
    <MainLayout
      headerTitle="Medical Devices Management"
      headerSubtitle="Comprehensive medical equipment catalog and inventory management"
      customHeaderActions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportDevices}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExportDevices}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddDevice}>
            <Plus className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
      }
    >
      <div className="p-6">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Medical Devices & Equipment</h1>
            <p className="text-muted-foreground text-lg">
              Manage your medical equipment catalog, track inventory, and streamline device procurement
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Devices</p>
                    <p className="text-2xl font-bold">{totalDevices}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-2xl font-bold text-green-600">{availableDevices}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Out of Stock</p>
                    <p className="text-2xl font-bold text-yellow-600">{outOfStockDevices}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Discontinued</p>
                    <p className="text-2xl font-bold text-red-600">{discontinuedDevices}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Device Categories</CardTitle>
              <CardDescription>Distribution of devices across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {deviceCategories.map((category) => (
                  <div key={category} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{category}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {getCategoryCount(category)}
                      </span>
                      <span className="text-sm text-muted-foreground">devices</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="catalog">Device Catalog</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="catalog" className="space-y-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search medical devices..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Category Filter */}
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {deviceCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DeviceGrid 
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                  showFilters={false}
                  showSearch={false}
                />
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              {/* Inventory Overview */}
              <div className="grid gap-6 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Stock Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">In Stock</span>
                        <span className="font-semibold text-green-600">3 devices</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Low Stock</span>
                        <span className="font-semibold text-yellow-600">1 device</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Out of Stock</span>
                        <span className="font-semibold text-red-600">0 devices</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Reorder Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                        <span className="text-sm font-medium">TENS Unit</span>
                        <Badge variant="secondary" className="text-yellow-700 bg-yellow-100">Reorder</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Neck Traction</span>
                        <Badge variant="secondary" className="text-green-700 bg-green-100">In Stock</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Warranty Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Active</span>
                        <span className="font-semibold text-green-600">4 devices</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Expiring Soon</span>
                        <span className="font-semibold text-orange-600">0 devices</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Expired</span>
                        <span className="font-semibold text-red-600">0 devices</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Inventory Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Device Inventory Details</CardTitle>
                  <CardDescription>Comprehensive inventory tracking for all medical devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Device</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Stock Level</th>
                          <th className="text-left p-3 font-medium">Last Updated</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {medicalDevices.map((device) => (
                          <tr key={device.id} className="hover:bg-gray-50">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <Image src={device.image} alt={device.name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
                                <div>
                                  <p className="font-medium">{device.name}</p>
                                  <p className="text-sm text-muted-foreground">{device.manufacturer}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge className={device.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                                {device.status.replace('-', ' ')}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div className={`h-2 rounded-full ${device.status === "available" ? "bg-green-500" : "bg-red-500"}`} style={{ width: device.status === "available" ? "100%" : "0%" }}></div>
                                </div>
                                <span className="text-sm font-medium">{device.status === "available" ? "In Stock" : "Out of Stock"}</span>
                              </div>
                            </td>
                            <td className="p-3 text-sm text-muted-foreground">2024-12-10</td>
                            <td className="p-3">
                              <Button size="sm" variant="outline">Manage</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Analytics Overview Cards */}
              <div className="grid gap-6 lg:grid-cols-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <p className="text-xl font-bold">$1,557.96</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <ShoppingCart className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Orders This Month</p>
                        <p className="text-xl font-bold">24</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Package className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                        <p className="text-xl font-bold">68.2%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Users className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Active Customers</p>
                        <p className="text-xl font-bold">156</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Devices</CardTitle>
                    <CardDescription>Revenue and popularity metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medicalDevices.map((device, index) => (
                        <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{device.name}</p>
                              <p className="text-sm text-muted-foreground">{device.manufacturer}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{device.price}</p>
                            <p className="text-sm text-muted-foreground">
                              {device.status === "available" ? "In Stock" : "Out of Stock"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Performance</CardTitle>
                    <CardDescription>Revenue by device category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deviceCategories.map((category, index) => {
                        const categoryDevices = getDevicesByCategory(category);
                        const totalRevenue = categoryDevices.reduce((sum, device) => {
                          const price = parseFloat(device.price.replace('$', '').replace(',', ''));
                          return sum + price;
                        }, 0);
                        
                        return (
                          <div key={category} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4] }}></div>
                              <span className="font-medium">{category}</span>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${totalRevenue.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">{categoryDevices.length} devices</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Trends and Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Trends & Insights</CardTitle>
                  <CardDescription>Key performance indicators and growth metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold mb-1">Monthly Growth</h4>
                      <p className="text-2xl font-bold text-green-600">+25.3%</p>
                      <p className="text-sm text-muted-foreground">vs last month</p>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold mb-1">Customer Retention</h4>
                      <p className="text-2xl font-bold text-blue-600">89.2%</p>
                      <p className="text-sm text-muted-foreground">repeat customers</p>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <ShoppingCart className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold mb-1">Avg. Order Value</h4>
                      <p className="text-2xl font-bold text-purple-600">$64.92</p>
                      <p className="text-sm text-muted-foreground">per transaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
} 