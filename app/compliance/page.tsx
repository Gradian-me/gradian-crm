"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Download,
  Plus,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/MainLayout"
import { NoSSR } from "@/components/ui/no-ssr"
import dynamic from "next/dynamic"
import { applyChartTheme, chartTheme } from "@/lib/chart-theme"
import { KPIGrid } from "@/components/analytics"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

// Compliance data
const complianceData = [
  {
    id: "C001",
    title: "FDA 510(k) Submission",
    type: "Regulatory",
    status: "approved",
    priority: "high",
    dueDate: "2025-03-15",
    assignedTo: "Dr. Sarah Johnson",
    department: "Regulatory Affairs",
    lastUpdated: "2024-12-10",
    riskLevel: "low",
    description: "Medical device clearance application for new cardiac stent",
  },
  {
    id: "C002",
    title: "ISO 13485 Audit",
    type: "Quality System",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-01-20",
    assignedTo: "Mike Chen",
    department: "Quality Assurance",
    lastUpdated: "2024-12-09",
    riskLevel: "medium",
    description: "Annual quality management system audit",
  },
  {
    id: "C003",
    title: "HIPAA Compliance Review",
    type: "Privacy",
    status: "pending",
    priority: "medium",
    dueDate: "2025-02-28",
    assignedTo: "Emily Rodriguez",
    department: "Legal",
    lastUpdated: "2024-12-08",
    riskLevel: "high",
    description: "Patient data protection compliance assessment",
  },
  {
    id: "C004",
    title: "GCP Training Completion",
    type: "Training",
    status: "overdue",
    priority: "low",
    dueDate: "2024-11-30",
    assignedTo: "John Smith",
    department: "Clinical",
    lastUpdated: "2024-12-07",
    riskLevel: "medium",
    description: "Good Clinical Practice training for research team",
  },
]

const auditLogs = [
  {
    id: 1,
    action: "Document Review",
    user: "Dr. Sarah Johnson",
    timestamp: "2024-12-10 14:30:00",
    details: "Reviewed FDA submission documents",
    status: "completed",
    category: "Regulatory",
  },
  {
    id: 2,
    action: "Risk Assessment",
    user: "Mike Chen",
    timestamp: "2024-12-10 11:15:00",
    details: "Updated risk matrix for ISO audit",
    status: "in-progress",
    category: "Quality",
  },
  {
    id: 3,
    action: "Training Verification",
    user: "Emily Rodriguez",
    timestamp: "2024-12-09 16:45:00",
    details: "Verified HIPAA training completion",
    status: "completed",
    category: "Privacy",
  },
]

// ECharts options
const getComplianceStatusOption = () => applyChartTheme({
  title: {
    text: "Compliance Status Overview",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    top: "middle",
  },
  series: [
    {
      name: "Status",
      type: "pie",
      data: [
        { value: 1, name: "Approved" },
        { value: 1, name: "In Progress" },
        { value: 1, name: "Pending" },
        { value: 1, name: "Overdue" },
      ],
    },
  ],
}, chartTheme.schemes.extended)

const getRiskAssessmentOption = () => applyChartTheme({
  title: {
    text: "Risk Assessment Matrix",
  },
  tooltip: {
    trigger: "axis",
    formatter: function (params: any) {
      return `${params[0].name}<br/>Risk Level: ${params[0].value}`;
    },
  },
  xAxis: {
    type: "category",
    data: ["FDA 510(k)", "ISO 13485", "HIPAA", "GCP Training"],
  },
  yAxis: {
    type: "value",
    name: "Risk Level",
    max: 3,
    min: 1,
  },
  series: [
    {
      name: "Risk Level",
      type: "bar",
      data: [1, 2, 3, 2],
    },
  ],
})

const getComplianceTrendOption = () => applyChartTheme({
  title: {
    text: "Compliance Score Trends",
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  yAxis: {
    type: "value",
    name: "Compliance Score (%)",
    max: 100,
  },
  series: [
    {
      name: "Overall Score",
      type: "line",
      data: [85, 87, 89, 91, 88, 92, 94, 93, 95, 96, 94, 97],
    },
  ],
})

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompliance = complianceData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { color: "bg-green-100 text-green-800", text: "Approved", icon: CheckCircle },
      "in-progress": { color: "bg-yellow-100 text-yellow-800", text: "In Progress", icon: Clock },
      pending: { color: "bg-blue-100 text-blue-800", text: "Pending", icon: Clock },
      overdue: { color: "bg-red-100 text-red-800", text: "Overdue", icon: AlertTriangle },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    return <Badge className={config.color}><Icon className="h-3 w-3 mr-1" />{config.text}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { color: "bg-red-100 text-red-800", text: "High" },
      medium: { color: "bg-yellow-100 text-yellow-800", text: "Medium" },
      low: { color: "bg-green-100 text-green-800", text: "Low" },
    }
    const config = priorityConfig[priority as keyof typeof priorityConfig]
    return <Badge className={config.color}>{config.text}</Badge>
  }

  const getRiskBadge = (risk: string) => {
    const riskConfig = {
      low: { color: "bg-green-100 text-green-800", text: "Low Risk" },
      medium: { color: "bg-yellow-100 text-yellow-800", text: "Medium Risk" },
      high: { color: "bg-red-100 text-red-800", text: "High Risk" },
    }
    const config = riskConfig[risk as keyof typeof riskConfig]
    return <Badge className={config.color}>{config.text}</Badge>
  }

  return (
    <MainLayout
      headerTitle="Compliance Management"
      headerSubtitle="Monitor regulatory compliance and risk management"
      customHeaderActions={
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Compliance Item
        </Button>
      }
    >
      <main className="flex-1 p-6">
        <NoSSR>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="items">Compliance Items</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Summary Cards */}
              <KPIGrid
                metrics={[
                  {
                    title: "Overall Score",
                    value: "97%",
                    change: "+3%",
                    trend: "up" as const,
                    period: "from last month",
                    icon: Shield,
                    variant: "success",
                  },
                  {
                    title: "Active Items",
                    value: "4",
                    description: "Compliance tasks",
                    icon: FileText,
                    variant: "info",
                  },
                  {
                    title: "Overdue",
                    value: "1",
                    description: "Requires attention",
                    icon: AlertTriangle,
                    variant: "danger",
                  },
                  {
                    title: "Risk Level",
                    value: "Medium",
                    description: "Overall risk assessment",
                    icon: BarChart3,
                    variant: "warning",
                  },
                ]}
              />

              {/* Charts Row */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Status</CardTitle>
                    <CardDescription>Distribution of compliance items by status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getComplianceStatusOption()} style={{ height: "300px" }} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment</CardTitle>
                    <CardDescription>Risk levels across different compliance areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getRiskAssessmentOption()} style={{ height: "300px" }} />
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Compliance Updates</CardTitle>
                  <CardDescription>Latest changes and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditLogs.slice(0, 3).map((log, index) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{log.action}</p>
                            <p className="text-xs text-muted-foreground">{log.details}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-100 text-blue-800">{log.category}</Badge>
                          <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="items" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Items</CardTitle>
                  <CardDescription>Manage all compliance requirements and deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search compliance items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {filteredCompliance.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium">{item.title}</h3>
                              {getStatusBadge(item.status)}
                              {getPriorityBadge(item.priority)}
                              {getRiskBadge(item.riskLevel)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Type: {item.type}</span>
                              <span>Department: {item.department}</span>
                              <span>Assigned: {item.assignedTo}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">Due: {item.dueDate}</span>
                            <span className="text-muted-foreground">Updated: {item.lastUpdated}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Log</CardTitle>
                  <CardDescription>Complete history of compliance activities and changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditLogs.map((log, index) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{log.action}</h3>
                            <p className="text-sm text-muted-foreground">{log.details}</p>
                            <p className="text-xs text-muted-foreground">by {log.user}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Badge className="bg-blue-100 text-blue-800">{log.category}</Badge>
                          <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                          <Badge
                            className={
                              log.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {log.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Trends</CardTitle>
                    <CardDescription>Monthly compliance score progression</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts option={getComplianceTrendOption()} style={{ height: "300px" }} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Metrics</CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Regulatory Score</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">98%</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Quality Score</span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">95%</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium">Risk Score</span>
                        </div>
                        <span className="text-lg font-bold text-yellow-600">Medium</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">On-Time Rate</span>
                        </div>
                        <span className="text-lg font-bold text-purple-600">92%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </NoSSR>
      </main>
    </MainLayout>
  )
} 