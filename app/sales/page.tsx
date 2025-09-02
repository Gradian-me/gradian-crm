"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  FileText,
  DollarSign,
  Clock,
  Users,
  Building,
  Calendar,
  Upload,
  Download,
  Eye,
  Edit,
  Plus,
  Filter,
  Search,
  Target,
  Briefcase,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/MainLayout"
import { NoSSR } from "@/components/ui/no-ssr"
import FormBuilder from "@/components/form-builder"
import { salesLeadFormSchema } from "@/lib/form-schemas"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { hcpList, HCP } from "@/lib/hcp-list"

const funnelStages = [
  { id: "awareness", name: "Awareness", color: "bg-gray-100 text-gray-800", count: 0 },
  { id: "education", name: "Education", color: "bg-blue-100 text-blue-800", count: 0 },
  { id: "proposal", name: "Proposal", color: "bg-yellow-100 text-yellow-800", count: 0 },
  { id: "tender", name: "Tender", color: "bg-purple-100 text-purple-800", count: 0 },
  { id: "compliance", name: "Compliance Review", color: "bg-orange-100 text-orange-800", count: 0 },
  { id: "won", name: "Won", color: "bg-green-100 text-green-800", count: 0 },
  { id: "lost", name: "Lost", color: "bg-red-100 text-red-800", count: 0 },
]

type Opportunity = {
  id: number
  title: string
  organization: string
  value: number
  stage: string
  probability: number
  closeDate: string
  lastActivity: string
  source: string
  contact: string
  products: string[]
  documents: string[]
  notes: string
  stakeholders: string[]
  hcp: HCP // Add reference to HCP data
}

// Generate opportunities based on HCP data
const generateOpportunities = (): Opportunity[] => {
  const opportunities: Opportunity[] = []
  const stages = ["awareness", "education", "proposal", "tender", "compliance", "won", "lost"]
  
  hcpList.forEach((hcp, index) => {
    // Generate 1-2 opportunities per HCP based on their engagement score
    const numOpportunities = hcp.engagementScore && hcp.engagementScore > 80 ? 2 : 1
    
    for (let i = 0; i < numOpportunities; i++) {
      const stageIndex = Math.floor((hcp.engagementScore || 50) / 15) // Distribute based on engagement
      const stage = stages[Math.min(stageIndex, stages.length - 1)]
      
      // Base value on facility type and prescribing potential
      let baseValue = 100000
      if (hcp.facilityType === "Private") baseValue *= 1.5
      if (hcp.prescribingPotential === "Very High") baseValue *= 2
      else if (hcp.prescribingPotential === "High") baseValue *= 1.5
      else if (hcp.prescribingPotential === "Medium") baseValue *= 1.2
      
      // Add some variation
      const variation = (Math.random() * 0.6 + 0.7) // 0.7 to 1.3 multiplier
      const value = Math.round(baseValue * variation)
      
      // Set probability based on stage and engagement score
      let probability = 30
      if (stage === "won") probability = 100
      else if (stage === "compliance") probability = 85
      else if (stage === "tender") probability = 70
      else if (stage === "proposal") probability = 60
      else if (stage === "education") probability = 40
      else if (stage === "awareness") probability = 25
      else if (stage === "lost") probability = 0
      
      // Adjust probability based on engagement score
      if (hcp.engagementScore) {
        probability = Math.min(95, probability + (hcp.engagementScore - 75) / 2)
      }
      
      // Generate close date (next 3-6 months)
      const futureDate = new Date()
      futureDate.setMonth(futureDate.getMonth() + Math.floor(Math.random() * 4) + 3)
      
      // Generate last activity date (within last 30 days)
      const lastActivityDate = new Date()
      lastActivityDate.setDate(lastActivityDate.getDate() - Math.floor(Math.random() * 30))
      
      const opportunity: Opportunity = {
        id: opportunities.length + 1,
        title: `${hcp.institution} - ${hcp.productInterest?.[0] || hcp.specialty || 'Medical Equipment'} Initiative`,
        organization: hcp.institution,
        value: value,
        stage: stage,
        probability: Math.max(0, Math.min(100, probability)),
        closeDate: futureDate.toISOString().split('T')[0],
        lastActivity: lastActivityDate.toISOString().split('T')[0],
        source: hcp.type === "hospital" ? "Hospital Tender" : hcp.type === "distributor" ? "Distributor" : "Clinical Trial",
        contact: hcp.name,
        products: hcp.productInterest || [hcp.specialty || "General Medical Equipment"],
        documents: [
          `${hcp.institution.replace(/\s+/g, '_')}_RFP.pdf`,
          `Proposal_${hcp.productInterest?.[0]?.replace(/\s+/g, '_') || 'Equipment'}.pdf`
        ],
        notes: hcp.notes || `${hcp.prescribingPotential || 'Medium'} potential opportunity. ${hcp.complianceStatus === 'Compliant' ? 'Compliant facility.' : 'Compliance review required.'}`,
        stakeholders: [hcp.name, "Procurement Manager", "Medical Director"],
        hcp: hcp
      }
      
      opportunities.push(opportunity)
    }
  })
  
  return opportunities
}

const opportunities = generateOpportunities()

// Update funnel stage counts
funnelStages.forEach(stage => {
  stage.count = opportunities.filter(opp => opp.stage === stage.id).length
})

// Calculate pipeline stats from real data
const pipelineStats = {
  totalValue: opportunities.reduce((sum, opp) => sum + opp.value, 0),
  weightedValue: opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0),
  averageDealSize: opportunities.length > 0 ? Math.round(opportunities.reduce((sum, opp) => sum + opp.value, 0) / opportunities.length) : 0,
  conversionRate: opportunities.length > 0 ? Math.round((opportunities.filter(opp => opp.stage === "won").length / opportunities.length) * 100) : 0,
  averageCycleTime: 120, // Keep this as estimated
  activeOpportunities: opportunities.filter(opp => !["won", "lost"].includes(opp.stage)).length,
}

export default function SalesFunnel() {
  const [activeTab, setActiveTab] = useState<string>("funnel")
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedStage, setSelectedStage] = useState<string>("all")

  const filteredOpportunities = opportunities.filter((opp: Opportunity) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.hcp.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = selectedStage === "all" || opp.stage === selectedStage
    return matchesSearch && matchesStage
  })

  const getStageColor = (stage: string) => {
    const stageInfo = funnelStages.find((s: { id: string; color: string }) => s.id === stage)
    return stageInfo ? stageInfo.color : "bg-gray-100 text-gray-800"
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600"
    if (probability >= 60) return "text-blue-600"
    if (probability >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <MainLayout 
      headerTitle="Sales Funnel & Tenders"
      headerSubtitle="Manage your sales pipeline and tender opportunities based on HCP data"
    >
      <div className="p-2 md:p-4 lg:p-6">
        <div className="space-y-6">
          {/* New Opportunity Button */}
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Opportunity
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle>Create New Opportunity</DialogTitle>
                  <DialogDescription>Add a new sales opportunity to your pipeline</DialogDescription>
                </DialogHeader>
                <FormBuilder 
                  schema={{
                    ...salesLeadFormSchema,
                    onSubmit: async (data) => {
                      console.log('New opportunity created:', data)
                      // API call would go here
                      alert('Opportunity created successfully!')
                    }
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Pipeline Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="card-important">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Pipeline</CardTitle>
                  <DollarSign className="h-4 w-4 text-white/80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{formatCurrency(pipelineStats.totalValue)}</div>
                  <div className="text-xs text-white/70">
                    Weighted: {formatCurrency(pipelineStats.weightedValue)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="card-featured">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Active Opportunities</CardTitle>
                  <Target className="h-4 w-4 text-white/80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{pipelineStats.activeOpportunities}</div>
                  <div className="text-xs text-white/70">
                    Avg: {formatCurrency(pipelineStats.averageDealSize)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pipelineStats.conversionRate}%</div>
                  <div className="text-xs text-green-600">Based on HCP engagement</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Cycle Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pipelineStats.averageCycleTime}</div>
                  <div className="text-xs text-muted-foreground">days</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <NoSSR>
            <Tabs key={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
                <TabsTrigger value="funnel">Funnel View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="tenders">Tenders</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="funnel" className="space-y-6">
                {/* Funnel Visualization */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Sales Funnel
                    </CardTitle>
                    <CardDescription>Visual representation of your sales pipeline based on HCP data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {funnelStages.map((stage, index) => {
                        const stageOpportunities = opportunities.filter((opp) => opp.stage === stage.id)
                        const stageValue = stageOpportunities.reduce((sum, opp) => sum + opp.value, 0)
                        const maxWidth = 100 - index * 12 // Funnel shape

                        return (
                          <motion.div
                            key={stage.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                          >
                            <div
                              className={`p-4 rounded-lg border-2 border-dashed transition-all hover:border-solid ${stage.color.replace("text-", "border-").replace("bg-", "border-").replace("100", "200")}`}
                              style={{ width: `${maxWidth}%`, margin: "0 auto" }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{stage.name}</h3>
                                <Badge className={stage.color}>{stage.count} opportunities</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Total Value: {formatCurrency(stageValue)}
                              </div>

                              {/* Opportunity Cards in Stage */}
                              <div className="mt-3 space-y-2">
                                {stageOpportunities.slice(0, 2).map((opp) => (
                                  <div
                                    key={opp.id}
                                    className="p-2 bg-white rounded border cursor-pointer hover:shadow-sm transition-shadow"
                                    onClick={() => setSelectedOpportunity(opp)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium truncate">{opp.title}</span>
                                      <span className="text-xs text-muted-foreground">{formatCurrency(opp.value)}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{opp.organization}</div>
                                    <div className="text-xs text-blue-600">{opp.hcp.region}</div>
                                  </div>
                                ))}
                                {stageOpportunities.length > 2 && (
                                  <div className="text-xs text-center text-muted-foreground">
                                    +{stageOpportunities.length - 2} more
                                  </div>
                                )}
                              </div>
                            </div>

                            {index < funnelStages.length - 2 && (
                              <div className="flex justify-center mt-2">
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="list" className="space-y-6">
                {/* Filters */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Search opportunities, organizations, regions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Select value={selectedStage} onValueChange={setSelectedStage}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Stages</SelectItem>
                            {funnelStages.map((stage) => (
                              <SelectItem key={stage.id} value={stage.id}>
                                {stage.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Opportunities List */}
                <div className="space-y-4">
                  {filteredOpportunities.map((opportunity, index) => (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className="cursor-pointer transition-all hover:shadow-md"
                        onClick={() => setSelectedOpportunity(opportunity)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{opportunity.title}</h3>
                                <Badge className={getStageColor(opportunity.stage)}>
                                  {funnelStages.find((s) => s.id === opportunity.stage)?.name}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {opportunity.hcp.facilityType}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Building className="h-4 w-4" />
                                  {opportunity.organization}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {opportunity.contact}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {opportunity.closeDate}
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-muted-foreground">Region: </span>
                                <span className="font-medium text-blue-600">{opportunity.hcp.region}</span>
                                <span className="text-muted-foreground">Type: </span>
                                <span className="font-medium">{opportunity.hcp.type}</span>
                                <span className="text-muted-foreground">Specialty: </span>
                                <span className="font-medium">{opportunity.hcp.specialty}</span>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Value: </span>
                                  <span className="font-medium">{formatCurrency(opportunity.value)}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Probability: </span>
                                  <span className={`font-medium ${getProbabilityColor(opportunity.probability)}`}>
                                    {opportunity.probability}%
                                  </span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Source: </span>
                                  <span className="font-medium">{opportunity.source}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Engagement: </span>
                                  <span className="font-medium text-green-600">{opportunity.hcp.engagementScore}/100</span>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {opportunity.products.map((product) => (
                                  <Badge key={product} variant="outline" className="text-xs">
                                    {product}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tenders" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Active Tenders
                      </CardTitle>
                      <CardDescription>Current tender opportunities and bids from HCP partners</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {opportunities
                          .filter((opp) => opp.stage === "tender" || opp.stage === "compliance")
                          .map((tender) => (
                            <div key={tender.id} className="p-3 border border-border rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium">{tender.title}</h4>
                                <Badge className={getStageColor(tender.stage)}>
                                  {funnelStages.find((s) => s.id === tender.stage)?.name}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{tender.organization}</p>
                              <p className="text-xs text-blue-600 mb-2">{tender.hcp.region} • {tender.hcp.facilityType}</p>
                              <div className="flex items-center justify-between text-sm">
                                <span>Value: {formatCurrency(tender.value)}</span>
                                <span>Due: {tender.closeDate}</span>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Upload className="h-3 w-3 mr-1" />
                                  Upload
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tender Documents</CardTitle>
                      <CardDescription>Manage RFPs, proposals, and submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {opportunities
                          .filter(opp => opp.stage === "tender" || opp.stage === "compliance")
                          .slice(0, 5)
                          .map((opp) => opp.documents.map((doc, index) => (
                            <div key={`${opp.id}-${index}`} className="flex items-center justify-between p-2 border border-border rounded">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{doc}</span>
                              </div>
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost">
                                  <Download className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))).flat()}

                        <Button className="w-full bg-transparent" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Document
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pipeline Performance</CardTitle>
                      <CardDescription>Conversion rates by stage based on HCP data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {funnelStages.slice(0, -2).map((stage, index) => {
                          const stageCount = opportunities.filter(opp => opp.stage === stage.id).length
                          const totalActive = opportunities.filter(opp => !["won", "lost"].includes(opp.stage)).length
                          const conversionRate = totalActive > 0 ? Math.round((stageCount / totalActive) * 100) : 0
                          return (
                            <div key={stage.id} className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>{stage.name}</span>
                                <span className="font-medium">{conversionRate}%</span>
                              </div>
                              <Progress value={conversionRate} className="h-2" />
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Regional Performance</CardTitle>
                      <CardDescription>Opportunities by region and facility type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...new Set(hcpList.map(hcp => hcp.region))].map((region) => {
                          const regionOpps = opportunities.filter(opp => opp.hcp.region === region)
                          const regionValue = regionOpps.reduce((sum, opp) => sum + opp.value, 0)
                          const publicCount = regionOpps.filter(opp => opp.hcp.facilityType === "Public").length
                          const privateCount = regionOpps.filter(opp => opp.hcp.facilityType === "Private").length
                          
                          return (
                            <div
                              key={region}
                              className="flex items-center justify-between p-3 border border-border rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{region}</p>
                                <p className="text-sm text-muted-foreground">
                                  {regionOpps.length} opportunities • Public: {publicCount} | Private: {privateCount}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-green-600">{formatCurrency(regionValue)}</p>
                                <p className="text-xs text-muted-foreground">total value</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </NoSSR>

          {/* Opportunity Detail Modal */}
          {selectedOpportunity && (
            <Dialog open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {selectedOpportunity.title}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedOpportunity.organization} • {formatCurrency(selectedOpportunity.value)} • {selectedOpportunity.hcp.region}
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="details" className="mt-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="hcp">HCP Profile</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Stage</label>
                          <div className="mt-1">
                            <Badge className={getStageColor(selectedOpportunity.stage)}>
                              {funnelStages.find((s) => s.id === selectedOpportunity.stage)?.name}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Probability</label>
                          <div className="mt-1 text-lg font-semibold">{selectedOpportunity.probability}%</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Close Date</label>
                          <div className="mt-1">{selectedOpportunity.closeDate}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Source</label>
                          <div className="mt-1">{selectedOpportunity.source}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Primary Contact</label>
                          <div className="mt-1">{selectedOpportunity.contact}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Products</label>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {selectedOpportunity.products.map((product: string) => (
                              <Badge key={product} variant="outline">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Last Activity</label>
                          <div className="mt-1">{selectedOpportunity.lastActivity}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Engagement Score</label>
                          <div className="mt-1 text-lg font-semibold text-green-600">{selectedOpportunity.hcp.engagementScore}/100</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea className="mt-1" value={selectedOpportunity.notes} rows={3} readOnly />
                    </div>
                  </TabsContent>

                  <TabsContent value="hcp" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Institution</label>
                          <div className="mt-1 font-semibold">{selectedOpportunity.hcp.institution}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Region</label>
                          <div className="mt-1">{selectedOpportunity.hcp.region}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Facility Type</label>
                          <div className="mt-1">
                            <Badge variant="outline">{selectedOpportunity.hcp.facilityType}</Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Type</label>
                          <div className="mt-1 capitalize">{selectedOpportunity.hcp.type}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Specialty</label>
                          <div className="mt-1">{selectedOpportunity.hcp.specialty}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Contact Information</label>
                          <div className="mt-1 space-y-1">
                            <div className="text-sm">{selectedOpportunity.hcp.email}</div>
                            <div className="text-sm">{selectedOpportunity.hcp.telephone}</div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Address</label>
                          <div className="mt-1 text-sm">{selectedOpportunity.hcp.address}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Prescribing Potential</label>
                          <div className="mt-1">
                            <Badge variant={selectedOpportunity.hcp.prescribingPotential === "Very High" ? "default" : "secondary"}>
                              {selectedOpportunity.hcp.prescribingPotential}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Compliance Status</label>
                          <div className="mt-1">
                            <Badge variant={selectedOpportunity.hcp.complianceStatus === "Compliant" ? "default" : "destructive"}>
                              {selectedOpportunity.hcp.complianceStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="space-y-3">
                      {selectedOpportunity.documents.map((doc: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{doc}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Last Visit</span>
                          <span className="text-sm text-muted-foreground">{selectedOpportunity.hcp.lastVisit}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedOpportunity.hcp.purpose || "Regular follow-up visit completed"}
                        </p>
                      </div>
                      <div className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Next Scheduled Visit</span>
                          <span className="text-sm text-muted-foreground">{selectedOpportunity.hcp.nextVisit}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Follow-up meeting scheduled to discuss {selectedOpportunity.products[0]}.
                        </p>
                      </div>
                    </div>
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
