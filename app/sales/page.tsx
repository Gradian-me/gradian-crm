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

const funnelStages = [
  { id: "awareness", name: "Awareness", color: "bg-gray-100 text-gray-800", count: 12 },
  { id: "education", name: "Education", color: "bg-blue-100 text-blue-800", count: 8 },
  { id: "proposal", name: "Proposal", color: "bg-yellow-100 text-yellow-800", count: 5 },
  { id: "tender", name: "Tender", color: "bg-purple-100 text-purple-800", count: 3 },
  { id: "compliance", name: "Compliance Review", color: "bg-orange-100 text-orange-800", count: 2 },
  { id: "won", name: "Won", color: "bg-green-100 text-green-800", count: 4 },
  { id: "lost", name: "Lost", color: "bg-red-100 text-red-800", count: 1 },
]

const mockOpportunities = [
  {
    id: 1,
    title: "Regional Hospital Network - CardioStent Pro",
    organization: "Metro Health System",
    value: 500000,
    stage: "tender",
    probability: 75,
    closeDate: "2024-03-15",
    lastActivity: "2024-01-20",
    source: "Hospital Tender",
    contact: "Dr. Sarah Johnson",
    products: ["CardioStent Pro", "HeartGuard Plus"],
    documents: ["RFP_Metro_Health.pdf", "Proposal_CardioStent.pdf"],
    notes: "Strong interest in bulk pricing. Compliance review in progress.",
    stakeholders: ["Dr. Johnson", "Procurement Manager", "CFO"],
  },
  {
    id: 2,
    title: "Cancer Center - OncoTarget Trial",
    organization: "Memorial Cancer Institute",
    value: 750000,
    stage: "proposal",
    probability: 60,
    closeDate: "2024-04-01",
    lastActivity: "2024-01-18",
    source: "Clinical Trial",
    contact: "Dr. Michael Chen",
    products: ["OncoTarget", "ImmunoPlex"],
    documents: ["Clinical_Protocol.pdf", "Budget_Proposal.pdf"],
    notes: "Awaiting IRB approval. Strong clinical data presentation scheduled.",
    stakeholders: ["Dr. Chen", "Research Director", "Clinical Coordinator"],
  },
  {
    id: 3,
    title: "Respiratory Clinic - BreathEasy Rollout",
    organization: "Pulmonary Care Associates",
    value: 250000,
    stage: "education",
    probability: 40,
    closeDate: "2024-05-15",
    lastActivity: "2024-01-15",
    source: "Conference",
    contact: "Dr. Emily Rodriguez",
    products: ["BreathEasy Inhaler", "PulmoMax"],
    documents: ["Product_Brochure.pdf"],
    notes: "Initial interest shown at respiratory conference. Follow-up scheduled.",
    stakeholders: ["Dr. Rodriguez", "Practice Manager"],
  },
  {
    id: 4,
    title: "Distributor Partnership - Northeast Region",
    organization: "MedSupply Distributors",
    value: 1200000,
    stage: "compliance",
    probability: 85,
    closeDate: "2024-02-28",
    lastActivity: "2024-01-22",
    source: "Distributor",
    contact: "James Wilson",
    products: ["Multiple Product Lines"],
    documents: ["Distribution_Agreement.pdf", "Compliance_Checklist.pdf"],
    notes: "Final compliance review. Contract terms agreed upon.",
    stakeholders: ["James Wilson", "Legal Team", "Regional Manager"],
  },
  {
    id: 5,
    title: "University Hospital - Research Grant",
    organization: "State University Medical Center",
    value: 300000,
    stage: "won",
    probability: 100,
    closeDate: "2024-01-10",
    lastActivity: "2024-01-10",
    source: "Clinical Trial",
    contact: "Dr. Lisa Park",
    products: ["Research Devices"],
    documents: ["Grant_Award.pdf", "Research_Agreement.pdf"],
    notes: "Grant awarded. Implementation phase starting.",
    stakeholders: ["Dr. Park", "Grant Administrator", "Research Team"],
  },
]

const pipelineStats = {
  totalValue: 3000000,
  weightedValue: 1875000,
  averageDealSize: 600000,
  conversionRate: 68,
  averageCycleTime: 120,
  activeOpportunities: 28,
}

export default function SalesFunnel() {
  const [activeTab, setActiveTab] = useState("funnel")
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStage, setSelectedStage] = useState("all")

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = selectedStage === "all" || opp.stage === selectedStage
    return matchesSearch && matchesStage
  })

  const getStageColor = (stage) => {
    const stageInfo = funnelStages.find((s) => s.id === stage)
    return stageInfo ? stageInfo.color : "bg-gray-100 text-gray-800"
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return "text-green-600"
    if (probability >= 60) return "text-blue-600"
    if (probability >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <MainLayout 
      headerTitle="Sales Funnel & Tenders"
      headerSubtitle="Manage your sales pipeline and tender opportunities"
    >
      <div className="flex-1 p-6">
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
              <DialogContent className="max-w-5xl max-h-[90vh]">
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
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pipeline</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(pipelineStats.totalValue)}</div>
                  <div className="text-xs text-muted-foreground">
                    Weighted: {formatCurrency(pipelineStats.weightedValue)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Opportunities</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pipelineStats.activeOpportunities}</div>
                  <div className="text-xs text-muted-foreground">
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
                  <div className="text-xs text-green-600">+5% from last quarter</div>
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
                    <CardDescription>Visual representation of your sales pipeline</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {funnelStages.map((stage, index) => {
                        const stageOpportunities = mockOpportunities.filter((opp) => opp.stage === stage.id)
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
                            placeholder="Search opportunities..."
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
                      <CardDescription>Current tender opportunities and bids</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockOpportunities
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
                        <div className="flex items-center justify-between p-2 border border-border rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">RFP_Metro_Health.pdf</span>
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

                        <div className="flex items-center justify-between p-2 border border-border rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Proposal_CardioStent.pdf</span>
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
                      <CardDescription>Conversion rates by stage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {funnelStages.slice(0, -2).map((stage, index) => {
                          const conversionRate = Math.max(20, 90 - index * 15)
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
                      <CardTitle>Source Performance</CardTitle>
                      <CardDescription>Lead sources and conversion</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { source: "Hospital Tenders", count: 12, value: 2400000, conversion: 75 },
                          { source: "Clinical Trials", count: 8, value: 1800000, conversion: 68 },
                          { source: "Conferences", count: 6, value: 900000, conversion: 45 },
                          { source: "Distributors", count: 4, value: 1200000, conversion: 85 },
                        ].map((item) => (
                          <div
                            key={item.source}
                            className="flex items-center justify-between p-3 border border-border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{item.source}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.count} opportunities • {formatCurrency(item.value)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-green-600">{item.conversion}%</p>
                              <p className="text-xs text-muted-foreground">conversion</p>
                            </div>
                          </div>
                        ))}
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
                    {selectedOpportunity.organization} • {formatCurrency(selectedOpportunity.value)}
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="details" className="mt-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
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
                            {selectedOpportunity.products.map((product) => (
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
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea className="mt-1" value={selectedOpportunity.notes} rows={3} readOnly />
                    </div>
                  </TabsContent>

                  <TabsContent value="stakeholders" className="space-y-4">
                    <div className="space-y-3">
                      {selectedOpportunity.stakeholders.map((stakeholder, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                          <Avatar>
                            <AvatarFallback>
                              {stakeholder
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{stakeholder}</p>
                            <p className="text-sm text-muted-foreground">Key Decision Maker</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Contact
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="space-y-3">
                      {selectedOpportunity.documents.map((doc, index) => (
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
                          <span className="font-medium">Proposal Submitted</span>
                          <span className="text-sm text-muted-foreground">2024-01-20</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive proposal submitted including technical specifications and pricing.
                        </p>
                      </div>
                      <div className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Meeting Scheduled</span>
                          <span className="text-sm text-muted-foreground">2024-01-18</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Follow-up meeting scheduled with procurement team for next week.
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
