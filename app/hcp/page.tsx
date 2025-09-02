"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Plus,
  Filter,
  MapPin,
  Phone,
  Mail,
  Building,
  User,
  Calendar,
  FileText,
  ChevronRight,
  Stethoscope,
  Pill,
  Heart,
  Brain,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MainLayout } from "@/components/layout/MainLayout"
import FormBuilder from "@/components/form-builder"
import { hcpFormSchema } from "@/lib/form-schemas"
import { hcpList, HCP, getSpecialties, getRegions, getFacilityTypes } from "@/lib/hcp-list"

const specialtyIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Cardiology: Heart,
  Oncology: Zap,
  Pulmonology: Brain,
  Neurology: Brain,
  Orthopedics: User,
  Pharmacy: Pill,
  General: Stethoscope,
  "General Medicine": Stethoscope,
  "Emergency Medicine": Zap,
  "General Surgery": Stethoscope,
  Pediatrics: Heart,
  "Teaching Hospital": Building,
  "Emergency Services": Zap,
}

const hcpTypes = [
  { value: "doctor", label: "Doctor", icon: Stethoscope },
  { value: "pharmacist", label: "Pharmacist", icon: Pill },
  { value: "hospital", label: "Hospital", icon: Building },
  { value: "distributor", label: "Distributor", icon: Building },
  { value: "regulator", label: "Regulator", icon: FileText },
]

export default function HCPManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedHCP, setSelectedHCP] = useState<HCP | null>(null)

  const filteredHCPs = hcpList.filter((hcp) => {
    const matchesSearch =
      hcp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hcp.institution.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || hcp.type === selectedType
    const matchesSpecialty = selectedSpecialty === "all" || hcp.specialty === selectedSpecialty

    return matchesSearch && matchesType && matchesSpecialty
  })

  const getEngagementColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "Compliant":
        return "bg-green-100 text-green-800"
      case "Review Required":
        return "bg-yellow-100 text-yellow-800"
      case "Non-Compliant":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrescribingPotentialColor = (potential: string) => {
    switch (potential) {
      case "Very High":
        return "bg-purple-100 text-purple-800"
      case "High":
        return "bg-blue-100 text-blue-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSpecialtyIcon = (specialty: string) => {
    return specialtyIcons[specialty] || Stethoscope
  }

  const getFacilityTypeColor = (type: string) => {
    return type === "Public" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">HCP Management</h1>
            <p className="text-muted-foreground">
              Manage healthcare professionals, hospitals, and distributors
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add HCP
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Healthcare Professional</DialogTitle>
                <DialogDescription>
                  Create a new HCP profile with all necessary information
                </DialogDescription>
              </DialogHeader>
              <FormBuilder schema={hcpFormSchema} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search HCPs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {hcpTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialty</label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {getSpecialties().filter((specialty): specialty is string => Boolean(specialty)).map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {getRegions().map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HCP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHCPs.map((hcp, index) => {
            const SpecialtyIcon = getSpecialtyIcon(hcp.specialty || "General")
            return (
              <motion.div
                key={hcp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
                      onClick={() => setSelectedHCP(hcp)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={hcp.avatar} />
                          <AvatarFallback>
                            <SpecialtyIcon className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{hcp.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {hcp.location}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getFacilityTypeColor(hcp.facilityType)}>
                        {hcp.facilityType}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span>{hcp.institution}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <SpecialtyIcon className="h-4 w-4 text-gray-500" />
                        <span>{hcp.specialty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{hcp.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm min-h-[20px]">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="truncate">{hcp.email || "No email provided"}</span>
                      </div>
                    </div>

                    <div className="space-y-3 flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Engagement</span>
                        <span className={`text-sm font-semibold ${getEngagementColor(hcp.engagementScore || 0)}`}>
                          {hcp.engagementScore}%
                        </span>
                      </div>
                      <Progress value={hcp.engagementScore} className="h-2" />
                      
                      <div className="flex items-center justify-between min-h-[24px]">
                        <span className="text-sm font-medium">Prescribing Potential</span>
                        {hcp.prescribingPotential !== "N/A" ? (
                          <Badge className={getPrescribingPotentialColor(hcp.prescribingPotential || "Low")}>
                            {hcp.prescribingPotential}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            N/A
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge className={getComplianceColor(hcp.complianceStatus || "Review Required")}>
                        {hcp.complianceStatus}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* HCP Detail Dialog */}
        <Dialog open={!!selectedHCP} onOpenChange={() => setSelectedHCP(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedHCP && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedHCP.avatar} />
                      <AvatarFallback>
                        {React.createElement(getSpecialtyIcon(selectedHCP.specialty || "General"), { className: "h-6 w-6" })}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xl font-bold">{selectedHCP.name}</div>
                      <div className="text-sm text-muted-foreground">{selectedHCP.institution}</div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Type</label>
                          <p className="text-sm">{selectedHCP.type}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Specialty</label>
                          <p className="text-sm">{selectedHCP.specialty}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Location</label>
                          <p className="text-sm">{selectedHCP.location}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Region</label>
                          <p className="text-sm">{selectedHCP.region}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone</label>
                          <p className="text-sm">{selectedHCP.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <p className="text-sm">{selectedHCP.email || "Not provided"}</p>
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-gray-500">Address</label>
                          <p className="text-sm">{selectedHCP.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Engagement & Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement & Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Engagement Score</span>
                            <span className={`text-sm font-semibold ${getEngagementColor(selectedHCP.engagementScore || 0)}`}>
                              {selectedHCP.engagementScore}%
                            </span>
                          </div>
                          <Progress value={selectedHCP.engagementScore} className="h-2" />
                        </div>
                        {selectedHCP.prescribingPotential !== "N/A" && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">Prescribing Potential</label>
                            <div className="mt-1">
                              <Badge className={getPrescribingPotentialColor(selectedHCP.prescribingPotential || "Low")}>
                                {selectedHCP.prescribingPotential}
                              </Badge>
                            </div>
                          </div>
                        )}
                        <div>
                          <label className="text-sm font-medium text-gray-500">Compliance Status</label>
                          <div className="mt-1">
                            <Badge className={getComplianceColor(selectedHCP.complianceStatus || "Review Required")}>
                              {selectedHCP.complianceStatus}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Facility Type</label>
                          <div className="mt-1">
                            <Badge className={getFacilityTypeColor(selectedHCP.facilityType)}>
                              {selectedHCP.facilityType}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Product Interest */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Interest</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedHCP.productInterest?.map((product) => (
                          <Badge key={product} variant="outline">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sunshine Act */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Sunshine Act Compliance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{selectedHCP.sunshineAct?.gifts}</div>
                          <div className="text-sm text-gray-500">Gifts</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{selectedHCP.sunshineAct?.samples}</div>
                          <div className="text-sm text-gray-500">Samples</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{selectedHCP.sunshineAct?.sponsorships}</div>
                          <div className="text-sm text-gray-500">Sponsorships</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Visit History */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Visit History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Last Visit</div>
                            <div className="text-sm text-gray-500">{selectedHCP.lastVisit}</div>
                          </div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Next Visit</div>
                            <div className="text-sm text-gray-500">{selectedHCP.nextVisit}</div>
                          </div>
                          <Badge variant="outline">Scheduled</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
