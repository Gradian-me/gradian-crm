"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Calendar,
  AlertTriangle,
  Building,
  Shield,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  Bell,
  Award,
  Settings,
  Zap,
  Target,
  TrendingUp,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/MainLayout"
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
import FormBuilder from "@/components/form-builder"
import { contractFormSchema } from "@/lib/form-schemas"

const contractTypes = [
  { value: "supply", label: "Supply Contract", icon: Building },
  { value: "service", label: "Service Contract", icon: Settings },
  { value: "maintenance", label: "Maintenance Contract", icon: Zap },
  { value: "distribution", label: "Distribution Agreement", icon: Target },
  { value: "regulatory", label: "Regulatory Agreement", icon: Shield },
]

const contractStatuses = [
  { value: "draft", label: "Draft", color: "bg-gray-100 text-gray-800" },
  { value: "review", label: "Under Review", color: "bg-yellow-100 text-yellow-800" },
  { value: "approval", label: "Pending Approval", color: "bg-blue-100 text-blue-800" },
  { value: "active", label: "Active", color: "bg-green-100 text-green-800" },
  { value: "expired", label: "Expired", color: "bg-red-100 text-red-800" },
  { value: "terminated", label: "Terminated", color: "bg-gray-100 text-gray-800" },
]

const mockContracts = [
  {
    id: 1,
    title: "CardioStent Pro Supply Agreement",
    organization: "Metro Health System",
    type: "supply",
    status: "active",
    value: 2500000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    renewalDate: "2024-10-01",
    lastReview: "2024-01-15",
    approvalStage: "approved",
    stakeholders: ["Dr. Sarah Johnson", "Procurement Manager", "Legal Team"],
    documents: ["Supply_Agreement.pdf", "Technical_Specs.pdf", "Compliance_Certificate.pdf"],
    deliveryTerms: "FOB Destination, Net 30",
    complianceStatus: "Compliant",
    isoStandards: ["ISO 13485", "ISO 14971"],
    regulatoryDocs: ["FDA 510(k)", "CE Mark"],
    alerts: [],
    notes: "Annual supply contract with automatic renewal clause. Strong performance metrics.",
  },
  {
    id: 2,
    title: "OncoTarget Maintenance Service",
    organization: "Memorial Cancer Institute",
    type: "maintenance",
    status: "active",
    value: 150000,
    startDate: "2023-06-01",
    endDate: "2025-05-31",
    renewalDate: "2025-02-01",
    lastReview: "2024-01-10",
    approvalStage: "approved",
    stakeholders: ["Dr. Michael Chen", "Biomedical Engineering", "Service Manager"],
    documents: ["Maintenance_Agreement.pdf", "SLA_Terms.pdf", "Warranty_Info.pdf"],
    deliveryTerms: "24/7 Support, 4-hour response time",
    complianceStatus: "Compliant",
    isoStandards: ["ISO 13485"],
    regulatoryDocs: ["Service Certification"],
    alerts: [{ type: "calibration", message: "Quarterly calibration due in 15 days", severity: "medium" }],
    notes: "Comprehensive maintenance package with preventive care schedule.",
  },
  {
    id: 3,
    title: "BreathEasy Distribution Agreement",
    organization: "PharmaCare Distributors",
    type: "distribution",
    status: "review",
    value: 800000,
    startDate: "2024-03-01",
    endDate: "2026-02-28",
    renewalDate: "2025-12-01",
    lastReview: "2024-01-20",
    approvalStage: "legal-review",
    stakeholders: ["James Wilson", "Regional Manager", "Compliance Officer"],
    documents: ["Distribution_Draft.pdf", "Territory_Map.pdf"],
    deliveryTerms: "Ex Works, Payment on delivery",
    complianceStatus: "Under Review",
    isoStandards: ["ISO 9001"],
    regulatoryDocs: ["Distribution License"],
    alerts: [
      { type: "approval", message: "Legal review pending for 5 days", severity: "high" },
      { type: "document", message: "Missing regulatory compliance certificate", severity: "high" },
    ],
    notes: "New distribution partnership for respiratory products. Pending final legal review.",
  },
  {
    id: 4,
    title: "Research Device Supply - University",
    organization: "State University Medical Center",
    type: "supply",
    status: "active",
    value: 300000,
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    renewalDate: "2024-05-15",
    lastReview: "2024-01-15",
    approvalStage: "approved",
    stakeholders: ["Dr. Lisa Park", "Grant Administrator", "Research Coordinator"],
    documents: ["Research_Agreement.pdf", "Grant_Terms.pdf", "Device_Specs.pdf"],
    deliveryTerms: "Grant-funded, milestone-based delivery",
    complianceStatus: "Compliant",
    isoStandards: ["ISO 13485", "ISO 14155"],
    regulatoryDocs: ["Research Exemption", "IRB Approval"],
    alerts: [{ type: "renewal", message: "Contract renewal discussion needed in 30 days", severity: "low" }],
    notes: "Research collaboration with university medical center. Grant-funded project.",
  },
  {
    id: 5,
    title: "Regulatory Consulting Services",
    organization: "MedReg Consultants",
    type: "regulatory",
    status: "expired",
    value: 75000,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    renewalDate: "2023-10-01",
    lastReview: "2023-12-15",
    approvalStage: "expired",
    stakeholders: ["Regulatory Affairs Manager", "Quality Director"],
    documents: ["Consulting_Agreement.pdf", "Deliverables_List.pdf"],
    deliveryTerms: "Monthly retainer, deliverable-based",
    complianceStatus: "Expired",
    isoStandards: [],
    regulatoryDocs: ["Consultant Certification"],
    alerts: [
      { type: "expired", message: "Contract expired 25 days ago", severity: "high" },
      { type: "renewal", message: "Renewal discussion overdue", severity: "high" },
    ],
    notes: "Regulatory consulting services. Contract expired, renewal needed for ongoing projects.",
  },
]

const contractStats = {
  totalContracts: 45,
  activeContracts: 32,
  totalValue: 8500000,
  expiringContracts: 5,
  pendingApprovals: 3,
  complianceScore: 92,
}

export default function ContractManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedContract, setSelectedContract] = useState<typeof mockContracts[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || contract.type === selectedType
    const matchesStatus = selectedStatus === "all" || contract.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    const statusInfo = contractStatuses.find((s) => s.value === status)
    return statusInfo ? statusInfo.color : "bg-gray-100 text-gray-800"
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getDaysUntilExpiry = (endDate: string) => {
    const today = new Date()
    const expiry = new Date(endDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <MainLayout 
      headerTitle="Contract Management"
      headerSubtitle="Manage contracts, compliance, and regulatory documentation"
    >
      <div className="p-6">
        <div className="space-y-6">
          {/* New Contract Button */}
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Contract
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle>Create New Contract</DialogTitle>
                  <DialogDescription>Add a new contract to your management system</DialogDescription>
                </DialogHeader>
                <FormBuilder 
                  schema={{
                    ...contractFormSchema,
                    onSubmit: async (data) => {
                      console.log('New contract created:', data)
                      // API call would go here
                      alert('Contract created successfully!')
                    }
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contractStats.totalContracts}</div>
                  <div className="text-xs text-muted-foreground">{contractStats.activeContracts} active</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(contractStats.totalValue)}</div>
                  <div className="text-xs text-green-600">+12% from last year</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{contractStats.expiringContracts}</div>
                  <div className="text-xs text-muted-foreground">Next 90 days</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{contractStats.complianceScore}%</div>
                  <div className="text-xs text-muted-foreground">Overall rating</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Contract Status Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Contract Status Overview
                    </CardTitle>
                    <CardDescription>Distribution of contracts by status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contractStatuses.map((status) => {
                        const count = mockContracts.filter((c) => c.status === status.value).length
                        const percentage = (count / mockContracts.length) * 100

                        return (
                          <div key={status.value} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2">
                                <Badge className={status.color}>{status.label}</Badge>
                              </span>
                              <span className="font-medium">{count} contracts</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Renewals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Renewals
                    </CardTitle>
                    <CardDescription>Contracts requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockContracts
                        .filter((contract) => {
                          const daysUntil = getDaysUntilExpiry(contract.renewalDate)
                          return daysUntil <= 90 && daysUntil > 0
                        })
                        .slice(0, 4)
                        .map((contract) => {
                          const daysUntil = getDaysUntilExpiry(contract.renewalDate)
                          return (
                            <div
                              key={contract.id}
                              className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50"
                              onClick={() => setSelectedContract(contract)}
                            >
                              <div>
                                <p className="font-medium text-sm">{contract.title}</p>
                                <p className="text-xs text-muted-foreground">{contract.organization}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-yellow-600">{daysUntil} days</p>
                                <p className="text-xs text-muted-foreground">{contract.renewalDate}</p>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Contract Activity</CardTitle>
                  <CardDescription>Latest updates and changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "Contract Signed",
                        contract: "CardioStent Pro Supply Agreement",
                        time: "2 hours ago",
                        status: "completed",
                      },
                      {
                        action: "Compliance Review",
                        contract: "BreathEasy Distribution Agreement",
                        time: "4 hours ago",
                        status: "pending",
                      },
                      {
                        action: "Renewal Reminder",
                        contract: "OncoTarget Maintenance Service",
                        time: "1 day ago",
                        status: "alert",
                      },
                      {
                        action: "Document Upload",
                        contract: "Research Device Supply",
                        time: "2 days ago",
                        status: "completed",
                      },
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-3 rounded-lg border border-border"
                      >
                        <div
                          className={`h-2 w-2 rounded-full mt-2 ${
                            activity.status === "completed"
                              ? "bg-green-500"
                              : activity.status === "pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.contract}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contracts" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search contracts..."
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
                          {contractTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          {contractStatuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
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

              {/* Contracts List */}
              <div className="space-y-4">
                {filteredContracts.map((contract, index) => (
                  <motion.div
                    key={contract.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className="cursor-pointer transition-all hover:shadow-md"
                      onClick={() => setSelectedContract(contract)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{contract.title}</h3>
                              <Badge className={getStatusColor(contract.status)}>
                                {contractStatuses.find((s) => s.value === contract.status)?.label}
                              </Badge>
                              {contract.alerts.length > 0 && (
                                <Badge variant="outline" className="text-red-600 border-red-200">
                                  <Bell className="h-3 w-3 mr-1" />
                                  {contract.alerts.length}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {contract.organization}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {contract.startDate} - {contract.endDate}
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="h-4 w-4" />
                                {formatCurrency(contract.value)}
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-sm">
                                <span className="text-muted-foreground">Type: </span>
                                <span className="font-medium">
                                  {contractTypes.find((t) => t.value === contract.type)?.label}
                                </span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Renewal: </span>
                                <span className="font-medium">{contract.renewalDate}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Compliance: </span>
                                <span
                                  className={`font-medium ${
                                    contract.complianceStatus === "Compliant" ? "text-green-600" : "text-yellow-600"
                                  }`}
                                >
                                  {contract.complianceStatus}
                                </span>
                              </div>
                            </div>

                            {contract.alerts.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {contract.alerts.slice(0, 2).map((alert, alertIndex) => (
                                  <div
                                    key={alertIndex}
                                    className={`text-xs px-2 py-1 rounded ${
                                      alert.severity === "high"
                                        ? "bg-red-50 text-red-700"
                                        : alert.severity === "medium"
                                          ? "bg-yellow-50 text-yellow-700"
                                          : "bg-blue-50 text-blue-700"
                                    }`}
                                  >
                                    {alert.message}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Regulatory Compliance
                    </CardTitle>
                    <CardDescription>ISO standards and regulatory documentation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { standard: "ISO 13485", status: "Valid", expiry: "2024-12-31", contracts: 15 },
                        { standard: "ISO 14971", status: "Valid", expiry: "2024-10-15", contracts: 8 },
                        { standard: "ISO 9001", status: "Expiring", expiry: "2024-03-01", contracts: 12 },
                        { standard: "FDA 510(k)", status: "Valid", expiry: "2025-06-30", contracts: 6 },
                        { standard: "CE Mark", status: "Valid", expiry: "2025-01-15", contracts: 10 },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.standard}</p>
                            <p className="text-sm text-muted-foreground">{item.contracts} contracts affected</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={
                                item.status === "Valid"
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "Expiring"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {item.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">Expires: {item.expiry}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Score Breakdown</CardTitle>
                    <CardDescription>Detailed compliance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { category: "Documentation", score: 95, description: "Contract documents complete" },
                        { category: "Regulatory", score: 88, description: "Certifications up to date" },
                        { category: "Delivery Terms", score: 92, description: "Terms compliance rate" },
                        { category: "Quality Standards", score: 94, description: "ISO standards adherence" },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{item.category}</span>
                            <span className="text-green-600 font-medium">{item.score}%</span>
                          </div>
                          <Progress value={item.score} className="h-2" />
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Contract Alerts & Notifications
                  </CardTitle>
                  <CardDescription>Important contract-related alerts requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockContracts
                      .filter((contract) => contract.alerts.length > 0)
                      .flatMap((contract) =>
                        contract.alerts.map((alert, index) => ({
                          ...alert,
                          contractTitle: contract.title,
                          contractId: contract.id,
                          organization: contract.organization,
                        })),
                      )
                      .map((alert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-lg border-l-4 ${
                            alert.severity === "high"
                              ? "border-red-500 bg-red-50"
                              : alert.severity === "medium"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-blue-500 bg-blue-50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className={`h-4 w-4 ${getAlertColor(alert.severity)}`} />
                                <span className="font-medium">{alert.type.toUpperCase()}</span>
                                <Badge
                                  variant="outline"
                                  className={
                                    alert.severity === "high"
                                      ? "border-red-200 text-red-700"
                                      : alert.severity === "medium"
                                        ? "border-yellow-200 text-yellow-700"
                                        : "border-blue-200 text-blue-700"
                                  }
                                >
                                  {alert.severity}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium mb-1">{alert.message}</p>
                              <p className="text-xs text-muted-foreground">
                                {alert.contractTitle} • {alert.organization}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                View Contract
                              </Button>
                              <Button size="sm">Resolve</Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Contract Templates
                    </CardTitle>
                    <CardDescription>Pre-approved contract templates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 min-w-0">
                      {[
                        { name: "Supply Agreement Template", type: "supply", version: "v2.1" },
                        { name: "Maintenance Contract Template", type: "maintenance", version: "v1.8" },
                        { name: "Distribution Agreement Template", type: "distribution", version: "v3.0" },
                        { name: "Service Contract Template", type: "service", version: "v2.3" },
                        { name: "Regulatory Agreement Template", type: "regulatory", version: "v1.5" },
                      ].map((template, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border rounded-lg gap-3 min-w-0 overflow-hidden"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium text-sm break-words">{template.name}</p>
                              <p className="text-xs text-muted-foreground">Version {template.version}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Approval Workflows</CardTitle>
                    <CardDescription>Contract approval process templates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 min-w-0">
                      {[
                        {
                          workflow: "Standard Supply Contract",
                          steps: ["Legal Review", "Procurement Approval", "Executive Sign-off"],
                          duration: "5-7 days",
                        },
                        {
                          workflow: "High-Value Contract (>$1M)",
                          steps: ["Legal Review", "Risk Assessment", "Board Approval", "Executive Sign-off"],
                          duration: "10-14 days",
                        },
                        {
                          workflow: "Regulatory Agreement",
                          steps: ["Compliance Review", "Legal Review", "Regulatory Approval"],
                          duration: "7-10 days",
                        },
                      ].map((workflow, index) => (
                        <div key={index} className="p-3 border border-border rounded-lg min-w-0 overflow-hidden">
                          <h4 className="font-medium text-sm mb-2 break-words leading-tight">{workflow.workflow}</h4>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                            {workflow.steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="flex items-center gap-1 min-w-0">
                                <Badge variant="outline" className="text-xs whitespace-nowrap px-2 py-1 max-w-[120px] truncate" title={step}>
                                  {step}
                                </Badge>
                                {stepIndex < workflow.steps.length - 1 && (
                                  <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                )}
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground break-words leading-relaxed">Typical duration: {workflow.duration}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Contract Detail Modal */}
          {selectedContract && (
            <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {selectedContract.title}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedContract.organization} • {formatCurrency(selectedContract.value)}
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="details" className="mt-6">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Contract Type</label>
                          <div className="mt-1">
                            <Badge variant="outline">
                              {contractTypes.find((t) => t.value === selectedContract.type)?.label}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Status</label>
                          <div className="mt-1">
                            <Badge className={getStatusColor(selectedContract.status)}>
                              {contractStatuses.find((s) => s.value === selectedContract.status)?.label}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Contract Period</label>
                          <div className="mt-1">
                            {selectedContract.startDate} - {selectedContract.endDate}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Renewal Date</label>
                          <div className="mt-1">{selectedContract.renewalDate}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Contract Value</label>
                          <div className="mt-1 text-lg font-semibold">{formatCurrency(selectedContract.value)}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Delivery Terms</label>
                          <div className="mt-1">{selectedContract.deliveryTerms}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Compliance Status</label>
                          <div className="mt-1">
                            <Badge
                              className={
                                selectedContract.complianceStatus === "Compliant"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {selectedContract.complianceStatus}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Last Review</label>
                          <div className="mt-1">{selectedContract.lastReview}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea className="mt-1" value={selectedContract.notes} rows={3} readOnly />
                    </div>
                  </TabsContent>

                  <TabsContent value="stakeholders" className="space-y-4">
                    <div className="space-y-3">
                      {selectedContract.stakeholders.map((stakeholder, index) => (
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
                            <p className="text-sm text-muted-foreground">Key Stakeholder</p>
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
                      {selectedContract.documents.map((doc, index) => (
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
                      <Button className="w-full bg-transparent" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="compliance" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">ISO Standards</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedContract.isoStandards.map((standard) => (
                            <Badge key={standard} variant="outline">
                              {standard}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Regulatory Documentation</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedContract.regulatoryDocs.map((doc) => (
                            <Badge key={doc} variant="outline">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {selectedContract.alerts.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Active Alerts</h4>
                          <div className="space-y-2">
                            {selectedContract.alerts.map((alert, index) => (
                              <div
                                key={index}
                                className={`p-2 rounded text-sm ${
                                  alert.severity === "high"
                                    ? "bg-red-50 text-red-700"
                                    : alert.severity === "medium"
                                      ? "bg-yellow-50 text-yellow-700"
                                      : "bg-blue-50 text-blue-700"
                                }`}
                              >
                                {alert.message}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Contract Activated</span>
                          <span className="text-sm text-muted-foreground">{selectedContract.startDate}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Contract officially activated and became effective.
                        </p>
                      </div>
                      <div className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Compliance Review Completed</span>
                          <span className="text-sm text-muted-foreground">{selectedContract.lastReview}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Annual compliance review completed with satisfactory results.
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
