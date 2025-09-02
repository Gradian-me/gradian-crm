"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Phone, Square, AlertCircle } from "lucide-react"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false })
const Circle = dynamic(() => import("react-leaflet").then((mod) => mod.Circle), { ssr: false })

// Fix Leaflet default icon issue in Next.js
const initializeLeafletIcons = () => {
  if (typeof window !== 'undefined' && window.L) {
    // Fix the default icons path issue
    delete (window.L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl
    window.L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }
}

interface Visit {
  id: number
  hcp: string
  institution: string
  address: string
  type: string
  status: string
  checkIn: string | null
  checkOut: string | null
  duration: string
  purpose: string
  notes: string
  coordinates: { lat: number; lng: number }
  distance: string
  specialty: string
}

interface LeafletMapProps {
  visits: Visit[]
  currentLocation: { lat: number; lng: number }
  isTracking: boolean
  onVisitSelect: (visit: Visit) => void
  onCheckIn?: (visitId: number) => void
  onCheckOut?: (visitId: number) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500"
    case "in-progress":
      return "bg-blue-500"
    case "scheduled":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

export default function LeafletMap({
  visits,
  currentLocation,
  isTracking,
  onVisitSelect,
  onCheckIn,
  onCheckOut,
}: LeafletMapProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  // Debug logging
  console.log('LeafletMap render:', { currentLocation, visits: visits.length, isTracking })

  // Initialize Leaflet icons when component mounts
  useEffect(() => {
    const setupLeafletIcons = () => {
      if (typeof window !== 'undefined') {
        // Wait for Leaflet to be available
        const checkLeaflet = () => {
          if (window.L) {
            console.log('Leaflet is available, initializing icons...')
            initializeLeafletIcons()
            return true
          }
          return false
        }
        
        // Try immediately
        if (!checkLeaflet()) {
          // If not available, retry with intervals
          const interval = setInterval(() => {
            if (checkLeaflet()) {
              clearInterval(interval)
            }
          }, 100)
          
          // Clear interval after 5 seconds to prevent infinite checking
          setTimeout(() => clearInterval(interval), 5000)
        }
      }
    }
    
    setupLeafletIcons()
  }, [])

  // Generate route coordinates for visualization
  const routeCoordinates: [number, number][] = [
    [currentLocation.lat, currentLocation.lng],
    ...visits.map(visit => [visit.coordinates.lat, visit.coordinates.lng] as [number, number]),
  ]

  const handleMarkerClick = (visit: Visit) => {
    onVisitSelect(visit)
  }

  const handleCheckIn = (visitId: number) => {
    onCheckIn?.(visitId)
  }

  const handleCheckOut = (visitId: number) => {
    onCheckOut?.(visitId)
  }

  useEffect(() => {
    if (mapRef.current && visits.length > 0) {
      // Fit bounds when component mounts or visits change
      const bounds: [number, number][] = [
        [currentLocation.lat, currentLocation.lng],
        ...visits.map(visit => [visit.coordinates.lat, visit.coordinates.lng] as [number, number])
      ]
      mapRef.current.fitBounds(bounds, { padding: [20, 20] })
    }
  }, [visits, currentLocation])

  // Additional effect to ensure map is properly initialized
  useEffect(() => {
    console.log('Map container ref:', mapRef.current)
    if (mapRef.current) {
      console.log('Map container is available')
    }
    
    // Set a timeout to show error if map doesn't load
    const timeout = setTimeout(() => {
      if (!isMapLoaded) {
        console.warn('Map failed to load within timeout')
        setMapError('Map failed to load within 10 seconds. Please refresh the page.')
      }
    }, 10000)
    
    return () => clearTimeout(timeout)
  }, [isMapLoaded])

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Live GPS Tracking
          </CardTitle>
          <CardDescription>Real-time location and visit status</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="relative h-[500px] rounded-lg overflow-hidden border bg-gray-100"
            style={{ minHeight: '500px', position: 'relative' }}
          >
            {!isMapLoaded && !mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Loading map...</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Current: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Visits: {visits.length} | Tracking: {isTracking ? 'Active' : 'Paused'}
                  </p>
                </div>
              </div>
            )}
            
            {mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-red-600 font-medium">Map Error</p>
                  <p className="text-xs text-red-500 mt-1">{mapError}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Current: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => {
                      setMapError(null)
                      setIsMapLoaded(false)
                    }}
                  >
                    Retry
                  </Button>
                </div>
              </div>
            )}
            <MapContainer
              center={[currentLocation.lat, currentLocation.lng]}
              zoom={13}
              style={{ 
                height: "100%", 
                width: "100%", 
                minHeight: "500px",
                position: "relative",
                zIndex: 1
              }}
              ref={mapRef}
              className="h-full w-full"
              whenReady={() => {
                console.log('Map is ready')
                initializeLeafletIcons() // Ensure icons are initialized when map is ready
                setIsMapLoaded(true)
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                errorTileUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              />

              {/* Current Location Marker */}
              <Circle
                center={[currentLocation.lat, currentLocation.lng]}
                radius={100}
                pathOptions={{
                  color: isTracking ? "#10b981" : "#6b7280",
                  fillColor: isTracking ? "#10b981" : "#6b7280",
                  fillOpacity: 0.2,
                }}
              >
                <Popup>
                  <div className="text-center">
                    <div className="font-medium">Current Location</div>
                    <div className="text-sm text-muted-foreground">
                      {isTracking ? "Tracking Active" : "Tracking Paused"}
                    </div>
                  </div>
                </Popup>
              </Circle>

              {/* Visit Markers */}
              {visits.map((visit) => (
                <Marker
                  key={visit.id}
                  position={[visit.coordinates.lat, visit.coordinates.lng]}
                  eventHandlers={{
                    click: () => handleMarkerClick(visit),
                  }}
                >
                  <Popup>
                    <div className="min-w-[200px] space-y-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(visit.status)}`} />
                        <span className="font-medium">{visit.hcp}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {visit.institution}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {visit.address}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Purpose:</span> {visit.purpose}
                      </div>
                      {visit.notes && (
                        <div className="text-sm text-muted-foreground italic">
                          {visit.notes}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkerClick(visit)}
                        >
                          View Details
                        </Button>
                        {visit.status === "scheduled" && onCheckIn && (
                          <Button
                            size="sm"
                            onClick={() => handleCheckIn(visit.id)}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            Check In
                          </Button>
                        )}
                        {visit.status === "in-progress" && onCheckOut && (
                          <Button
                            size="sm"
                            onClick={() => handleCheckOut(visit.id)}
                          >
                            <Square className="h-3 w-3 mr-1" />
                            Check Out
                          </Button>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Route Line */}
              {routeCoordinates.length > 1 && (
                <Polyline
                  positions={routeCoordinates}
                  pathOptions={{
                    color: "#6366f1",
                    weight: 3,
                    opacity: 0.8,
                    dashArray: "10, 5",
                  }}
                />
              )}
            </MapContainer>
          </div>
        </CardContent>
      </Card>

      {/* Current Visit Info */}
      <Card>
        <CardHeader>
          <CardTitle>Current Visit</CardTitle>
          <CardDescription>Active visit details</CardDescription>
        </CardHeader>
        <CardContent>
          {visits.find((v) => v.status === "in-progress") ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Dr. Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Memorial Cancer Center</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Check-in Time</span>
                  <span className="font-medium">11:00 AM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Duration</span>
                  <span className="font-medium">45 minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Purpose</span>
                  <span className="font-medium text-right">OncoTarget trial</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-transparent" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call HCP
                </Button>
                <Button className="w-full">
                  <Square className="h-4 w-4 mr-2" />
                  Check Out
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No active visits</p>
              <p className="text-sm text-muted-foreground">Next visit at 2:00 PM</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 