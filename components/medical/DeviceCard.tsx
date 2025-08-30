"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, AlertCircle, XCircle, Info, ShoppingCart, Eye } from "lucide-react"
import { MedicalDevice } from "@/lib/medical-devices"

interface DeviceCardProps {
  device: MedicalDevice
  onAddToCart?: (device: MedicalDevice) => void
  onViewDetails?: (device: MedicalDevice) => void
}

export function DeviceCard({ device, onAddToCart, onViewDetails }: DeviceCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "out-of-stock":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "discontinued":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "out-of-stock":
        return "bg-yellow-100 text-yellow-800"
      case "discontinued":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 hover:border-gray-200 bg-white overflow-hidden group">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-base font-semibold line-clamp-2 text-gray-900 group-hover:text-primary transition-colors">
                  {device.name}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                  {device.manufacturer} • {device.model}
                </CardDescription>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(device.status)}
                <Badge className={`${getStatusColor(device.status)} text-xs px-2 py-1`}>
                  {device.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 px-4">
            {/* Device Image */}
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gray-50 rounded-lg flex items-center justify-center p-4 group-hover:bg-gray-100 transition-colors">
                <img 
                  src={device.image} 
                  alt={device.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            </div>

            {/* Description */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {device.description}
              </p>
            </div>

            {/* Price */}
            <div className="text-center">
              <span className="text-xl font-bold text-primary">{device.price}</span>
            </div>

            {/* Key Specifications */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1 justify-center">
                {device.specifications.slice(0, 2).map((spec, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 border-0 rounded-md"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 h-9 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 transition-colors rounded-md"
                onClick={() => setShowDetails(true)}
              >
                <Eye className="h-3 w-3 mr-1" />
                Details
              </Button>
              {device.status === "available" && (
                <Button 
                  size="sm" 
                  className="flex-1 h-9 bg-primary hover:bg-primary/90 text-white transition-colors rounded-md"
                  onClick={() => onAddToCart?.(device)}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Device Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center p-2">
                    <img 
                      src={device.image} 
                      alt={device.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold">{device.name}</span>
                </DialogTitle>
            <DialogDescription>
              {device.manufacturer} • {device.model} • {device.category}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Device Image */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center p-8 shadow-lg">
                <img 
                  src={device.image} 
                  alt={device.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{device.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h4 className="font-medium mb-2">Specifications</h4>
              <ul className="space-y-1">
                {device.specifications.map((spec, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Manufacturer</h4>
                <p className="text-sm text-muted-foreground">{device.manufacturer}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Model</h4>
                <p className="text-sm text-muted-foreground">{device.model}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Warranty</h4>
                <p className="text-sm text-muted-foreground">{device.warranty}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Category</h4>
                <p className="text-sm text-muted-foreground">{device.category}</p>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-medium mb-2">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {device.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-primary">{device.price}</span>
                <Badge className={getStatusColor(device.status)}>
                  {device.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </Button>
                {device.status === "available" && (
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      onAddToCart?.(device)
                      setShowDetails(false)
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 