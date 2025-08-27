"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Navigation,
  Clock,
  CheckCircle,
  AlertCircle,
  Route,
  Calendar,
  Phone,
  Car,
  Building,
  Users,
  Timer,
  Target,
  Zap,
  Play,
  Pause,
  Square,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MainLayout } from "@/components/layout/MainLayout"

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

const mockVisits: Visit[] = [
  {
    id: 1,
    hcp: "Dr. Sarah Johnson",
    institution: "City General Hospital",
    address: "123 Medical Center Dr, New York, NY",
    type: "hospital",
    status: "completed",
    checkIn: "09:15 AM",
    checkOut: "10:30 AM",
    duration: "1h 15m",
    purpose: "Product presentation - CardioStent Pro",
    notes: "Positive reception, requested samples",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    distance: "2.3 miles",
    specialty: "Cardiology",
  },
  {
    id: 2,
    hcp: "Dr. Michael Chen",
    institution: "Memorial Cancer Center",
    address: "456 Oncology Way, Boston, MA",
    type: "hospital",
    status: "in-progress",
    checkIn: "11:00 AM",
    checkOut: null,
    duration: "45m",
    purpose: "Follow-up meeting - OncoTarget trial",
    notes: "",
    coordinates: { lat: 42.3601, lng: -71.0589 },
    distance: "15.7 miles",
    specialty: "Oncology",
  },
  {
    id: 3,
    hcp: "PharmaCare Distributors",
    institution: "PharmaCare Inc.",
    address: "789 Distribution Blvd, Chicago, IL",
    type: "distributor",
    status: "scheduled",
    checkIn: null,
    checkOut: null,
    duration: "30m",
    purpose: "Contract renewal discussion",
    notes: "",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    distance: "8.1 miles",
    specialty: "Distribution",
  },
  {
    id: 4,
    hcp: "Dr. Emily Rodriguez",
    institution: "Respiratory Health Clinic",
    address: "321 Lung Care Ave, Los Angeles, CA",
    type: "clinic",
    status: "scheduled",
    checkIn: null,
    checkOut: null,
    duration: "1h",
    purpose: "New product introduction - BreathEasy",
    notes: "",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    distance: "12.4 miles",
    specialty: "Pulmonology",
  },
]

const todayStats = {
  totalVisits: 4,
  completedVisits: 1,
  inProgress: 1,
  scheduled: 2,
  totalDistance: "38.5 miles",
  totalTime: "4h 30m",
  efficiency: 87,
}

export default function FieldTracking() {
  const [activeTab, setActiveTab] = useState("map")
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null)
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7589, lng: -73.9851 })
  const [isTracking, setIsTracking] = useState(true)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "in-progress":
        return Timer
      case "scheduled":
        return Clock
      default:
        return AlertCircle
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return Building
      case "clinic":
        return Building
      case "distributor":
        return Building
      default:
        return MapPin
    }
  }

  return (
    <MainLayout 
      headerTitle="Field Tracking"
      headerSubtitle="GPS tracking and visit management"
    >
      <div className="flex-1 p-6">
        <div className="space-y-6">
          {/* Tracking Controls */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <Badge variant={isTracking ? "default" : "secondary"} className="gap-1">
                <div className={`h-2 w-2 rounded-full ${isTracking ? "bg-green-500" : "bg-gray-500"}`} />
                {isTracking ? "Tracking Active" : "Tracking Paused"}
              </Badge>
              <Button variant={isTracking ? "outline" : "default"} onClick={() => setIsTracking(!isTracking)}>
                {isTracking ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isTracking ? "Pause" : "Start"} Tracking
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Visits</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.totalVisits}</div>
                  <div className="text-xs text-muted-foreground">
                    {todayStats.completedVisits} completed, {todayStats.inProgress} in progress
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Distance Traveled</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.totalDistance}</div>
                  <div className="text-xs text-muted-foreground">Across all visits today</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
                  <Timer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.totalTime}</div>
                  <div className="text-xs text-muted-foreground">Total visit duration</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Route Efficiency</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.efficiency}%</div>
                  <div className="text-xs text-muted-foreground">Optimized route performance</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="visits">Visit List</TabsTrigger>
              <TabsTrigger value="route">Route Plan</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
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
                    <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden">
                      {/* Simulated Map Interface */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                        <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-md">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            Current Location
                          </div>
                        </div>

                        {/* Visit Markers */}
                        {mockVisits.map((visit, index) => {
                          const StatusIcon = getStatusIcon(visit.status)
                          return (
                            <motion.div
                              key={visit.id}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.2 }}
                              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                              style={{
                                top: `${20 + index * 80}px`,
                                left: `${100 + index * 120}px`,
                              }}
                              onClick={() => setSelectedVisit(visit)}
                            >
                              <div
                                className={`p-2 rounded-full shadow-lg ${
                                  visit.status === "completed"
                                    ? "bg-green-500"
                                    : visit.status === "in-progress"
                                      ? "bg-blue-500"
                                      : "bg-yellow-500"
                                }`}
                              >
                                <StatusIcon className="h-4 w-4 text-white" />
                              </div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white rounded px-2 py-1 text-xs shadow-md whitespace-nowrap">
                                {visit.hcp}
                              </div>
                            </motion.div>
                          )
                        })}

                        {/* Route Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                              <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
                            </marker>
                          </defs>
                          <path
                            d="M 100 100 Q 200 150 320 180 Q 440 220 560 300"
                            stroke="#6366f1"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="5,5"
                            markerEnd="url(#arrowhead)"
                          />
                        </svg>
                      </div>
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
                    {mockVisits.find((v) => v.status === "in-progress") ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>MC</AvatarFallback>
                          </Avatar>
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
            </TabsContent>

            <TabsContent value="visits" className="space-y-6">
              <div className="space-y-4">
                {mockVisits.map((visit, index) => {
                  const StatusIcon = getStatusIcon(visit.status)
                  const TypeIcon = getTypeIcon(visit.type)

                  return (
                    <motion.div
                      key={visit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className="cursor-pointer transition-all hover:shadow-md"
                        onClick={() => setSelectedVisit(visit)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className={`p-2 rounded-full ${
                                    visit.status === "completed"
                                      ? "bg-green-100"
                                      : visit.status === "in-progress"
                                        ? "bg-blue-100"
                                        : "bg-yellow-100"
                                  }`}
                                >
                                  <StatusIcon
                                    className={`h-4 w-4 ${
                                      visit.status === "completed"
                                        ? "text-green-600"
                                        : visit.status === "in-progress"
                                          ? "text-blue-600"
                                          : "text-yellow-600"
                                    }`}
                                  />
                                </div>
                                <div className="text-xs text-muted-foreground">{visit.distance}</div>
                              </div>

                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{visit.hcp}</h3>
                                  <Badge className={getStatusColor(visit.status)}>{visit.status}</Badge>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <TypeIcon className="h-4 w-4" />
                                  {visit.institution}
                                </div>

                                <p className="text-sm text-muted-foreground">{visit.address}</p>
                                <p className="text-sm">{visit.purpose}</p>

                                {visit.notes && <p className="text-sm text-muted-foreground italic">{visit.notes}</p>}
                              </div>
                            </div>

                            <div className="text-right space-y-1">
                              {visit.checkIn && (
                                <div className="text-sm">
                                  <span className="text-muted-foreground">In: </span>
                                  <span className="font-medium">{visit.checkIn}</span>
                                </div>
                              )}
                              {visit.checkOut && (
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Out: </span>
                                  <span className="font-medium">{visit.checkOut}</span>
                                </div>
                              )}
                              <div className="text-sm text-muted-foreground">{visit.duration}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="route" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Route className="h-5 w-5" />
                      Route Optimization
                    </CardTitle>
                    <CardDescription>AI-optimized visit sequence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-green-800">Route Optimized</p>
                          <p className="text-sm text-green-600">Saved 12.3 miles and 45 minutes</p>
                        </div>
                        <Zap className="h-5 w-5 text-green-600" />
                      </div>

                      <div className="space-y-3">
                        {mockVisits.map((visit, index) => (
                          <div key={visit.id} className="flex items-center gap-3 p-2 border border-border rounded-lg">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{visit.hcp}</p>
                              <p className="text-xs text-muted-foreground">{visit.institution}</p>
                            </div>
                            <div className="text-xs text-muted-foreground">{visit.distance}</div>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full">
                        <Navigation className="h-4 w-4 mr-2" />
                        Start Navigation
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Route Statistics</CardTitle>
                    <CardDescription>Today's route performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Route Completion</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 border border-border rounded-lg">
                          <div className="text-lg font-bold text-blue-600">38.5</div>
                          <div className="text-xs text-muted-foreground">Total Miles</div>
                        </div>
                        <div className="p-3 border border-border rounded-lg">
                          <div className="text-lg font-bold text-green-600">4h 30m</div>
                          <div className="text-xs text-muted-foreground">Est. Time</div>
                        </div>
                        <div className="p-3 border border-border rounded-lg">
                          <div className="text-lg font-bold text-purple-600">$45</div>
                          <div className="text-xs text-muted-foreground">Fuel Cost</div>
                        </div>
                        <div className="p-3 border border-border rounded-lg">
                          <div className="text-lg font-bold text-orange-600">87%</div>
                          <div className="text-xs text-muted-foreground">Efficiency</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Visit Schedule
                    </CardTitle>
                    <CardDescription>Upcoming appointments and meetings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockVisits
                        .filter((v) => v.status === "scheduled")
                        .map((visit, index) => (
                          <div key={visit.id} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                            <div className="text-center">
                              <div className="text-lg font-bold">2:00</div>
                              <div className="text-xs text-muted-foreground">PM</div>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{visit.hcp}</p>
                              <p className="text-sm text-muted-foreground">{visit.institution}</p>
                              <p className="text-xs text-muted-foreground">{visit.purpose}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Phone className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <MapPin className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Schedule and manage visits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Visit
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Route className="h-4 w-4 mr-2" />
                      Plan Route
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <MapPin className="h-4 w-4 mr-2" />
                      Find Nearby HCPs
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Emergency Contact
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Visit Detail Modal */}
          {selectedVisit && (
            <Dialog open={!!selectedVisit} onOpenChange={() => setSelectedVisit(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Visit Details
                  </DialogTitle>
                  <DialogDescription>
                    {selectedVisit.hcp} • {selectedVisit.institution}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">HCP Name</label>
                      <Input value={selectedVisit.hcp} readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Institution</label>
                      <Input value={selectedVisit.institution} readOnly />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input value={selectedVisit.address} readOnly />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Check-in Time</label>
                      <Input value={selectedVisit.checkIn || "Not checked in"} readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration</label>
                      <Input value={selectedVisit.duration} readOnly />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Purpose</label>
                    <Input value={selectedVisit.purpose} readOnly />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Visit Notes</label>
                    <Textarea placeholder="Add visit notes..." value={selectedVisit.notes} rows={3} />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setSelectedVisit(null)}>
                      Close
                    </Button>
                    {selectedVisit.status === "scheduled" && (
                      <Button>
                        <Play className="h-4 w-4 mr-2" />
                        Check In
                      </Button>
                    )}
                    {selectedVisit.status === "in-progress" && (
                      <Button>
                        <Square className="h-4 w-4 mr-2" />
                        Check Out
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
