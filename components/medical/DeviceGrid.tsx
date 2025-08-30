"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Grid3X3, List, ShoppingCart } from "lucide-react"
import { DeviceCard } from "./DeviceCard"
import { MedicalDevice, deviceCategories, searchDevices, getDevicesByCategory, medicalDevices } from "@/lib/medical-devices"

interface DeviceGridProps {
  devices?: MedicalDevice[]
  onAddToCart?: (device: MedicalDevice) => void
  showFilters?: boolean
  showSearch?: boolean
  layout?: 'grid' | 'list'
}

export function DeviceGrid({ 
  devices: initialDevices, 
  onAddToCart, 
  showFilters = true,
  showSearch = true,
  layout = 'grid'
}: DeviceGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(layout)
  const [cartItems, setCartItems] = useState<MedicalDevice[]>([])

  // Use provided devices or default to all devices
  const allDevices = initialDevices || medicalDevices

  // Filter devices based on search and category
  const filteredDevices = useMemo(() => {
    let filtered = allDevices

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = getDevicesByCategory(selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = searchDevices(searchQuery)
      // If category is also selected, apply both filters
      if (selectedCategory !== "all") {
        filtered = filtered.filter((device: MedicalDevice) => device.category === selectedCategory)
      }
    }

    return filtered
  }, [allDevices, selectedCategory, searchQuery])

  const handleAddToCart = (device: MedicalDevice) => {
    setCartItems(prev => [...prev, device])
    onAddToCart?.(device)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            {showSearch && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medical devices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}

            {/* Category Filter */}
            {showFilters && (
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
            )}
          </div>

          {/* View Mode Toggle and Cart */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Cart Badge */}
            {cartItems.length > 0 && (
              <Badge variant="secondary" className="gap-1">
                <ShoppingCart className="h-3 w-3" />
                {cartItems.length}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(searchQuery || selectedCategory !== "all") && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <Badge variant="outline" className="gap-1">
              Search: &quot;{searchQuery}&quot;
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => setSearchQuery("")}
              >
                ×
              </Button>
            </Badge>
          )}
          {selectedCategory !== "all" && (
            <Badge variant="outline" className="gap-1">
              Category: {selectedCategory}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => setSelectedCategory("all")}
              >
                ×
              </Button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredDevices.length} of {allDevices.length} devices
      </div>

      {/* Devices Grid/List */}
      {filteredDevices.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No devices found</h3>
            <p className="text-sm">
              Try adjusting your search terms or category filter
            </p>
          </div>
          <Button variant="outline" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {filteredDevices.map((device: MedicalDevice, index: number) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <DeviceCard
                device={device}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
} 