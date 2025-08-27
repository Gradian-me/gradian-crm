"use client"

import { useState } from "react"
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

const specialtyIcons: Record<string, React.ComponentType<any>> = {
  Cardiology: Heart,
  Oncology: Zap,
  Pulmonology: Brain,
  Neurology: Brain,
  Orthopedics: User,
  Pharmacy: Pill,
  General: Stethoscope,
}

const hcpTypes = [
  { value: "doctor", label: "Doctor", icon: Stethoscope },
  { value: "pharmacist", label: "Pharmacist", icon: Pill },
  { value: "hospital", label: "Hospital", icon: Building },
  { value: "distributor", label: "Distributor", icon: Building },
  { value: "regulator", label: "Regulator", icon: FileText },
]

const mockHCPs = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    type: "doctor",
    specialty: "Cardiology",
    institution: "City General Hospital",
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    email: "s.johnson@citygeneral.com",
    prescribingPotential: "High",
    productInterest: ["CardioStent Pro", "HeartGuard Plus"],
    lastVisit: "2024-01-15",
    nextVisit: "2024-02-15",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 2,
      samples: 15,
      sponsorships: 1,
    },
    engagementScore: 85,
    avatar: "/caring-doctor.png",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    type: "doctor",
    specialty: "Oncology",
    institution: "Memorial Cancer Center",
    location: "Boston, MA",
    phone: "+1 (555) 234-5678",
    email: "m.chen@memorial.com",
    prescribingPotential: "Very High",
    productInterest: ["OncoTarget", "ImmunoPlex"],
    lastVisit: "2024-01-20",
    nextVisit: "2024-02-20",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 1,
      samples: 8,
      sponsorships: 0,
    },
    engagementScore: 92,
    avatar: "/caring-doctor.png",
  },
  {
    id: 3,
    name: "PharmaCare Distributors",
    type: "distributor",
    specialty: "Distribution",
    institution: "PharmaCare Inc.",
    location: "Chicago, IL",
    phone: "+1 (555) 345-6789",
    email: "orders@pharmacare.com",
    prescribingPotential: "N/A",
    productInterest: ["Bulk Orders", "Generic Alternatives"],
    lastVisit: "2024-01-10",
    nextVisit: "2024-02-10",
    complianceStatus: "Review Required",
    sunshineAct: {
      gifts: 0,
      samples: 0,
      sponsorships: 0,
    },
    engagementScore: 78,
    avatar: "/modern-city-building.png",
  },
  {
    id: 4,
    name: "Dr. Emily Rodriguez",
    type: "doctor",
    specialty: "Pulmonology",
    institution: "Respiratory Health Clinic",
    location: "Los Angeles, CA",
    phone: "+1 (555) 456-7890",
    email: "e.rodriguez@resphealth.com",
    prescribingPotential: "Medium",
    productInterest: ["BreathEasy Inhaler", "PulmoMax"],
    lastVisit: "2024-01-25",
    nextVisit: "2024-02-25",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 3,
      samples: 12,
      sponsorships: 2,
    },
    engagementScore: 88,
    avatar: "/caring-doctor.png",
  },
]

interface HCP {
  id: number
  name: string
  type: string
  specialty: string
  institution: string
  location: string
  phone: string
  email: string
  prescribingPotential: string
  productInterest: string[]
  lastVisit: string
  nextVisit: string
  complianceStatus: string
  sunshineAct: {
    gifts: number
    samples: number
    sponsorships: number
  }
  engagementScore: number
  avatar: string
}

export default function HCPManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedHCP, setSelectedHCP] = useState<HCP | null>(null)

  const filteredHCPs = mockHCPs.filter((hcp) => {
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

  return (
    <MainLayout 
      headerTitle="HCP Management"
      headerSubtitle="Manage your healthcare professional relationships"
    >
      <div className="flex-1 p-6">
        <div className="space-y-6">
          {/* Add HCP Button */}
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add HCP
                </Button>
              </DialogTrigger>
                            <DialogContent className="max-w-5xl max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle>Add New Healthcare Professional</DialogTitle>
                  <DialogDescription>
                    Create a new HCP profile with contact information and specialties
                  </DialogDescription>
                </DialogHeader>
                <FormBuilder 
                  schema={{
                    ...hcpFormSchema,
                    onSubmit: async (data) => {
                      console.log('New HCP created:', data)
                      // API call would go here
                      alert('HCP created successfully!')
                    }
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search HCPs, institutions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Type" />
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
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Oncology">Oncology</SelectItem>
                      <SelectItem value="Pulmonology">Pulmonology</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                      <SelectItem value="Distribution">Distribution</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* HCP Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredHCPs.map((hcp, index) => {
              const SpecialtyIcon = specialtyIcons[hcp.specialty as keyof typeof specialtyIcons] || Stethoscope
              return (
                <motion.div
                  key={hcp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="cursor-pointer transition-all hover:shadow-md" onClick={() => setSelectedHCP(hcp)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={hcp.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {hcp.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{hcp.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <SpecialtyIcon className="h-3 w-3" />
                              {hcp.specialty}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={getComplianceColor(hcp.complianceStatus)}>{hcp.complianceStatus}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="h-4 w-4" />
                        {hcp.institution}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {hcp.location}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Engagement Score</span>
                          <span className={`font-medium ${getEngagementColor(hcp.engagementScore)}`}>
                            {hcp.engagementScore}%
                          </span>
                        </div>
                        <Progress value={hcp.engagementScore} className="h-2" />
                      </div>

                      {hcp.prescribingPotential !== "N/A" && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Prescribing Potential</span>
                          <Badge variant="outline">{hcp.prescribingPotential}</Badge>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span>Last Visit</span>
                        <span className="text-muted-foreground">{hcp.lastVisit}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button size="sm" variant="ghost">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* HCP Detail Modal */}
          {selectedHCP && (
            <Dialog open={!!selectedHCP} onOpenChange={() => setSelectedHCP(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedHCP.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {selectedHCP.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="text-2xl">{selectedHCP.name}</DialogTitle>
                      <DialogDescription className="text-base">
                        {selectedHCP.specialty} • {selectedHCP.institution}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <Tabs defaultValue="profile" className="mt-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="interactions">Interactions</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedHCP.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedHCP.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedHCP.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedHCP.institution}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Professional Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Type</span>
                            <Badge variant="outline">{selectedHCP.type}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Specialty</span>
                            <Badge variant="outline">{selectedHCP.specialty}</Badge>
                          </div>
                          {selectedHCP.prescribingPotential !== "N/A" && (
                            <div className="flex items-center justify-between">
                              <span>Prescribing Potential</span>
                              <Badge variant="outline">{selectedHCP.prescribingPotential}</Badge>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span>Engagement Score</span>
                            <span className={`font-medium ${getEngagementColor(selectedHCP.engagementScore)}`}>
                              {selectedHCP.engagementScore}%
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="interactions" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Visit History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                            <div>
                              <p className="font-medium">Product Presentation</p>
                              <p className="text-sm text-muted-foreground">Discussed CardioStent Pro features</p>
                            </div>
                            <span className="text-sm text-muted-foreground">{selectedHCP.lastVisit}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                            <div>
                              <p className="font-medium">Sample Delivery</p>
                              <p className="text-sm text-muted-foreground">Delivered 5 units for trial</p>
                            </div>
                            <span className="text-sm text-muted-foreground">2024-01-10</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="compliance" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Sunshine Act Compliance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="text-center p-4 border border-border rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{selectedHCP.sunshineAct.gifts}</div>
                            <div className="text-sm text-muted-foreground">Gifts</div>
                          </div>
                          <div className="text-center p-4 border border-border rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{selectedHCP.sunshineAct.samples}</div>
                            <div className="text-sm text-muted-foreground">Samples</div>
                          </div>
                          <div className="text-center p-4 border border-border rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">
                              {selectedHCP.sunshineAct.sponsorships}
                            </div>
                            <div className="text-sm text-muted-foreground">Sponsorships</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="products" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Product Interest</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedHCP.productInterest.map((product) => (
                            <Badge key={product} variant="secondary">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
