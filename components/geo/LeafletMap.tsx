"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Phone, Square } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false })
const Circle = dynamic(() => import("react-leaflet").then((mod) => mod.Circle), { ssr: false })

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
  const mapRef = useRef<any>(null)
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null)

  // Generate route coordinates for visualization
  const routeCoordinates = [
    [currentLocation.lat, currentLocation.lng],
    ...visits.map(visit => [visit.coordinates.lat, visit.coordinates.lng]),
  ]

  const handleMarkerClick = (visit: Visit) => {
    setSelectedVisit(visit)
    onVisitSelect(visit)
  }

  const handleCheckIn = (visitId: number) => {
    onCheckIn?.(visitId)
    setSelectedVisit(null)
  }

  const handleCheckOut = (visitId: number) => {
    onCheckOut?.(visitId)
    setSelectedVisit(null)
  }

  useEffect(() => {
    if (mapRef.current && visits.length > 0) {
      // Fit bounds when component mounts or visits change
      const bounds = [
        [currentLocation.lat, currentLocation.lng],
        ...visits.map(visit => [visit.coordinates.lat, visit.coordinates.lng])
      ]
      mapRef.current.fitBounds(bounds, { padding: [20, 20] })
    }
  }, [visits, currentLocation])

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
          <div className="relative h-[500px] rounded-lg overflow-hidden border">
            <MapContainer
              style={{ height: "100%", width: "100%" }}
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Current Location Marker */}
              <Circle
                center={[currentLocation.lat, currentLocation.lng]}
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