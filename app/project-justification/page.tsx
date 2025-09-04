"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  XCircle,
  FileText,
  Activity,
  Target,
  ChevronRight,
  ChevronDown,
  Beaker,
  Microscope,
  Shield,
  Zap,
  Settings,
  User,
  Calendar,
  AlertCircle,
  BarChart3,
  Filter,
  Search,
  Download,
  Eye,
  Edit
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/MainLayout"
import { NoSSR } from "@/components/ui/no-ssr"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { projectATestResults, testsByEffect, TestResult, TestCategory } from "@/lib/test-results"

// Category icons mapping
const categoryIcons = {
  "Pharmacokinetics/Pharmacodynamics": Zap,
  "Stability": Shield,
  "Half-life / Clearance": Activity,
  "Immunogenicity": User,
  "Efficacy / Mechanism of Action": Target,
  "Safety / Toxicology": AlertTriangle,
  "Manufacturability / Quality Control": Settings,
}

// Category colors
const categoryColors = {
  "Pharmacokinetics/Pharmacodynamics": "bg-blue-100 text-blue-800 border-blue-300",
  "Stability": "bg-green-100 text-green-800 border-green-300",
  "Half-life / Clearance": "bg-purple-100 text-purple-800 border-purple-300",
  "Immunogenicity": "bg-orange-100 text-orange-800 border-orange-300",
  "Efficacy / Mechanism of Action": "bg-red-100 text-red-800 border-red-300",
  "Safety / Toxicology": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "Manufacturability / Quality Control": "bg-indigo-100 text-indigo-800 border-indigo-300",
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Pass":
      return CheckCircle
    case "Fail":
      return XCircle
    case "Warning":
      return AlertTriangle
    case "Pending":
    case "In Progress":
      return Clock
    default:
      return AlertCircle
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pass":
      return "text-green-600"
    case "Fail":
      return "text-red-600"
    case "Warning":
      return "text-yellow-600"
    case "Pending":
    case "In Progress":
      return "text-blue-600"
    default:
      return "text-gray-600"
  }
}

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "Pass":
      return "bg-green-100 text-green-800 border-green-300"
    case "Fail":
      return "bg-red-100 text-red-800 border-red-300"
    case "Warning":
      return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case "Pending":
    case "In Progress":
      return "bg-blue-100 text-blue-800 border-blue-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

export default function ProjectJustification() {
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | null>(null)
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [expandedTestPreviews, setExpandedTestPreviews] = useState<Set<string>>(new Set())

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName)
    } else {
      newExpanded.add(categoryName)
    }
    setExpandedCategories(newExpanded)
  }

  const toggleTestPreview = (categoryName: string) => {
    const newExpanded = new Set(expandedTestPreviews)
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName)
    } else {
      newExpanded.add(categoryName)
    }
    setExpandedTestPreviews(newExpanded)
  }

  const filteredCategories = projectATestResults.test_categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.tests.some(test => test.test_name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || category.overall_status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getOverallStats = () => {
    const totalTests = projectATestResults.test_categories.reduce((sum, cat) => sum + cat.tests.length, 0)
    const passedTests = projectATestResults.test_categories.reduce((sum, cat) => 
      sum + cat.tests.filter(test => test.acceptance_status === "Pass").length, 0)
    const failedTests = projectATestResults.test_categories.reduce((sum, cat) => 
      sum + cat.tests.filter(test => test.acceptance_status === "Fail").length, 0)
    const warningTests = projectATestResults.test_categories.reduce((sum, cat) => 
      sum + cat.tests.filter(test => test.acceptance_status === "Warning").length, 0)
    const pendingTests = projectATestResults.test_categories.reduce((sum, cat) => 
      sum + cat.tests.filter(test => test.acceptance_status === "Pending").length, 0)

    return {
      total: totalTests,
      passed: passedTests,
      failed: failedTests,
      warning: warningTests,
      pending: pendingTests,
      passRate: totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0
    }
  }

  const stats = getOverallStats()

  return (
    <MainLayout 
      headerTitle="Project Justification"
      headerSubtitle="mAb Project A - Comprehensive Testing & Validation Dashboard"
    >
      <div className="p-1 sm:p-2 md:p-4 lg:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Project Header */}
          <Card className="card-important overflow-hidden">
            <CardHeader className=" text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold">{projectATestResults.project_name}</CardTitle>
                  <CardDescription className="text-blue-100 mt-2">
                    Project ID: {projectATestResults.project_id} | Phase: {projectATestResults.project_phase}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{projectATestResults.overall_completion}%</div>
                  <div className="text-sm text-blue-100">Overall Completion</div>
                  <Badge className={`mt-2 ${getStatusBadgeColor(projectATestResults.overall_status)}`}>
                    {projectATestResults.overall_status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Tests</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.passed}</div>
                  <div className="text-sm text-muted-foreground">Passed</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{stats.warning}</div>
                  <div className="text-sm text-muted-foreground">Warning</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg col-span-2 sm:col-span-4 lg:col-span-1">
                  <div className="text-2xl font-bold text-purple-600">{stats.passRate}%</div>
                  <div className="text-sm text-muted-foreground">Pass Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <NoSSR>
            <Tabs key={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-[600px]">
                <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
                <TabsTrigger value="funnel" className="text-xs sm:text-sm">Test Funnel</TabsTrigger>
                <TabsTrigger value="details" className="text-xs sm:text-sm">Test Details</TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Hierarchical Funnel View */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      Test Categories Hierarchical Overview
                    </CardTitle>
                    <CardDescription>Visual representation of testing progress across all categories</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="space-y-4 sm:space-y-6">
                      {projectATestResults.test_categories.map((category, index) => {
                        const CategoryIcon = categoryIcons[category.name as keyof typeof categoryIcons] || Beaker
                        const categoryColor = categoryColors[category.name as keyof typeof categoryColors]
                        
                        // Funnel shape calculation
                        const mobileWidth = Math.max(80, 100 - index * 3)
                        const desktopWidth = Math.max(50, 100 - index * 8)
                        
                        return (
                          <motion.div
                            key={category.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                          >
                            <div
                              className={`relative p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:border-solid ${categoryColor} bg-gradient-to-r from-white to-gray-50/50 shadow-sm`}
                              style={{ 
                                '--mobile-width': `${mobileWidth}%`,
                                '--desktop-width': `${desktopWidth}%`,
                                width: `var(--mobile-width)`,
                                margin: "0 auto",
                              } as React.CSSProperties}
                            >
                              {/* Category Header */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${categoryColor.split(' ')[0]} flex items-center justify-center`}>
                                    <CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-base sm:text-lg">{category.name}</h3>
                                    <p className="text-xs text-muted-foreground">Category {index + 1} of {projectATestResults.test_categories.length}</p>
                                  </div>
                                </div>
                                <div className="text-left sm:text-right">
                                  <Badge className={getStatusBadgeColor(category.overall_status)} variant="outline">
                                    {category.overall_status}
                                  </Badge>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {category.completion_percentage}% complete
                                  </div>
                                </div>
                              </div>

                              {/* Progress Bar */}
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                  <span>Progress</span>
                                  <span>{category.completion_percentage}%</span>
                                </div>
                                <Progress value={category.completion_percentage} className="h-3" />
                              </div>

                              {/* Test Summary */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                <div className="text-center p-2 bg-white/70 rounded-lg">
                                  <p className="text-xs text-muted-foreground">Total Tests</p>
                                  <p className="font-bold text-sm">{category.tests.length}</p>
                                </div>
                                <div className="text-center p-2 bg-green-50 rounded-lg">
                                  <p className="text-xs text-muted-foreground">Passed</p>
                                  <p className="font-bold text-sm text-green-600">
                                    {category.tests.filter(t => t.acceptance_status === "Pass").length}
                                  </p>
                                </div>
                                <div className="text-center p-2 bg-yellow-50 rounded-lg">
                                  <p className="text-xs text-muted-foreground">Warning</p>
                                  <p className="font-bold text-sm text-yellow-600">
                                    {category.tests.filter(t => t.acceptance_status === "Warning").length}
                                  </p>
                                </div>
                                <div className="text-center p-2 bg-blue-50 rounded-lg">
                                  <p className="text-xs text-muted-foreground">Pending</p>
                                  <p className="font-bold text-sm text-blue-600">
                                    {category.tests.filter(t => t.acceptance_status === "Pending").length}
                                  </p>
                                </div>
                              </div>

                              {/* Test Preview */}
                              <div className="space-y-2">
                                {(expandedTestPreviews.has(category.name) ? category.tests : category.tests.slice(0, 3)).map((test) => {
                                  const StatusIcon = getStatusIcon(test.acceptance_status)
                                  return (
                                    <div
                                      key={test.test_name}
                                      className="p-2 sm:p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200"
                                      onClick={() => setSelectedTest(test)}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <StatusIcon className={`h-4 w-4 ${getStatusColor(test.acceptance_status)}`} />
                                            <span className="text-xs sm:text-sm font-semibold truncate">{test.test_name}</span>
                                          </div>
                                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            <span>{test.completion_date}</span>
                                            <User className="h-3 w-3" />
                                            <span className="truncate">{test.operator}</span>
                                          </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                          <Badge className={getStatusBadgeColor(test.acceptance_status)} variant="outline">
                                            {test.acceptance_status}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                                {category.tests.length > 3 && (
                                  <div 
                                    className="text-center p-2 text-sm text-muted-foreground bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => toggleTestPreview(category.name)}
                                  >
                                    {expandedTestPreviews.has(category.name) 
                                      ? "Show less tests" 
                                      : `+${category.tests.length - 3} more tests`
                                    }
                                  </div>
                                )}
                              </div>

                              {/* Action Button */}
                              <div className="mt-4 text-center">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedCategory(category)}
                                  className="w-full sm:w-auto"
                                >
                                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </div>
                            </div>

                            {/* Flow Arrow */}
                            {index < projectATestResults.test_categories.length - 1 && (
                              <div className="flex justify-center my-3 sm:my-4">
                                <ChevronDown className="h-4 w-4 sm:h-6 sm:w-6 text-blue-500" />
                              </div>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="funnel" className="space-y-6">
                {/* Test Categories as Funnel Stages */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Testing Progress Funnel
                    </CardTitle>
                    <CardDescription>Flow-based visualization of testing completion stages</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="space-y-6">
                      {projectATestResults.test_categories
                        .sort((a, b) => b.completion_percentage - a.completion_percentage)
                        .map((category, index) => {
                          const CategoryIcon = categoryIcons[category.name as keyof typeof categoryIcons] || Beaker
                          const categoryColor = categoryColors[category.name as keyof typeof categoryColors]
                          
                          // Enhanced funnel shape for better visual hierarchy
                          const funnelWidth = Math.max(30, 95 - index * 12)
                          
                          return (
                            <motion.div
                              key={category.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.15 }}
                              className="relative"
                            >
                              <div
                                className={`relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${categoryColor} bg-gradient-to-br from-white via-white to-gray-50/80 shadow-md`}
                                style={{ 
                                  width: `${funnelWidth}%`,
                                  margin: "0 auto",
                                } as React.CSSProperties}
                              >
                                <div className="text-center mb-4">
                                  <div className={`w-12 h-12 rounded-full ${categoryColor.split(' ')[0]} mx-auto flex items-center justify-center mb-3`}>
                                    <CategoryIcon className="h-6 w-6" />
                                  </div>
                                  <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                                  <div className="text-3xl font-bold mb-2">{category.completion_percentage}%</div>
                                  <Badge className={getStatusBadgeColor(category.overall_status)}>
                                    {category.overall_status}
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="text-center p-3 bg-white/70 rounded-lg">
                                    <div className="text-lg font-bold text-green-600">
                                      {category.tests.filter(t => t.acceptance_status === "Pass").length}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Passed</div>
                                  </div>
                                  <div className="text-center p-3 bg-white/70 rounded-lg">
                                    <div className="text-lg font-bold text-blue-600">
                                      {category.tests.filter(t => t.acceptance_status === "Pending").length}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Pending</div>
                                  </div>
                                </div>

                                <Progress value={category.completion_percentage} className="h-3 mb-4" />
                                
                                <div className="text-center">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                  >
                                    View Tests <Eye className="h-4 w-4 ml-1" />
                                  </Button>
                                </div>
                              </div>

                              {index < projectATestResults.test_categories.length - 1 && (
                                <div className="flex justify-center my-4">
                                  <ChevronDown className="h-6 w-6 text-blue-500" />
                                </div>
                              )}
                            </motion.div>
                          )
                        })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                {/* Filters */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Search tests or categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Pass">Pass</SelectItem>
                            <SelectItem value="Warning">Warning</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Test Categories List */}
                <div className="space-y-4">
                  {filteredCategories.map((category, index) => {
                    const isExpanded = expandedCategories.has(category.name)
                    const CategoryIcon = categoryIcons[category.name as keyof typeof categoryIcons] || Beaker
                    const categoryColor = categoryColors[category.name as keyof typeof categoryColors]

                    return (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden">
                          <CardHeader 
                            className={`cursor-pointer transition-all hover:bg-gray-50 ${categoryColor.split(' ')[0]}/10`}
                            onClick={() => toggleCategory(category.name)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CategoryIcon className="h-5 w-5" />
                                <div>
                                  <CardTitle className="text-lg">{category.name}</CardTitle>
                                  <CardDescription>{category.tests.length} tests total</CardDescription>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge className={getStatusBadgeColor(category.overall_status)}>
                                  {category.overall_status}
                                </Badge>
                                <div className="text-right mr-2">
                                  <div className="font-bold">{category.completion_percentage}%</div>
                                  <div className="text-xs text-muted-foreground">complete</div>
                                </div>
                                {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                              </div>
                            </div>
                          </CardHeader>
                          
                          {isExpanded && (
                            <CardContent className="pt-0">
                              <div className="mb-4">
                                <Progress value={category.completion_percentage} className="h-2" />
                              </div>
                              <div className="space-y-3">
                                {category.tests.map((test) => {
                                  const StatusIcon = getStatusIcon(test.acceptance_status)
                                  return (
                                    <div
                                      key={test.test_name}
                                      className="p-3 border border-border rounded-lg cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
                                      onClick={() => setSelectedTest(test)}
                                    >
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-2">
                                            <StatusIcon className={`h-4 w-4 ${getStatusColor(test.acceptance_status)}`} />
                                            <h4 className="font-semibold">{test.test_name}</h4>
                                            <Badge className={getStatusBadgeColor(test.acceptance_status)} variant="outline">
                                              {test.acceptance_status}
                                            </Badge>
                                          </div>
                                          
                                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                            <div>
                                              <span className="text-muted-foreground">Result: </span>
                                              <span className="font-medium">{test.actual_result} {test.unit}</span>
                                            </div>
                                            <div>
                                              <span className="text-muted-foreground">Range: </span>
                                              <span className="font-medium">{test.lower_limit} - {test.upper_limit} {test.unit}</span>
                                            </div>
                                            <div>
                                              <span className="text-muted-foreground">Date: </span>
                                              <span className="font-medium">{test.completion_date}</span>
                                            </div>
                                          </div>
                                          
                                          <div className="mt-2 text-sm text-muted-foreground">
                                            Method: {test.method} | Operator: {test.operator}
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 ml-4">
                                          <Button size="sm" variant="outline">
                                            <Edit className="h-3 w-3" />
                                          </Button>
                                          <Button size="sm" variant="ghost">
                                            <ChevronRight className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Category Performance</CardTitle>
                      <CardDescription>Completion rates by test category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {projectATestResults.test_categories.map((category) => (
                          <div key={category.name} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="truncate">{category.name}</span>
                              <span className="font-medium">{category.completion_percentage}%</span>
                            </div>
                            <Progress value={category.completion_percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Test Status Distribution</CardTitle>
                      <CardDescription>Overview of test results across all categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{stats.passed}</div>
                            <div className="text-sm text-muted-foreground">Passed Tests</div>
                          </div>
                          <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-600">{stats.warning}</div>
                            <div className="text-sm text-muted-foreground">Warning Tests</div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
                            <div className="text-sm text-muted-foreground">Pending Tests</div>
                          </div>
                          <div className="text-center p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                            <div className="text-sm text-muted-foreground">Failed Tests</div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Overall Pass Rate</span>
                            <span className="font-medium">{stats.passRate}%</span>
                          </div>
                          <Progress value={stats.passRate} className="h-3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </NoSSR>

          {/* Test Detail Modal */}
          {selectedTest && (
            <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Microscope className="h-5 w-5" />
                    {selectedTest.test_name}
                  </DialogTitle>
                  <DialogDescription>
                    Test Details and Results Analysis
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Test Status</label>
                        <div className="mt-1">
                          <Badge className={getStatusBadgeColor(selectedTest.acceptance_status)}>
                            {selectedTest.acceptance_status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Actual Result</label>
                        <div className="mt-1 text-lg font-semibold">{selectedTest.actual_result} {selectedTest.unit}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Acceptable Range</label>
                        <div className="mt-1">{selectedTest.lower_limit} - {selectedTest.upper_limit} {selectedTest.unit}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Method</label>
                        <div className="mt-1">{selectedTest.method}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Completion Date</label>
                        <div className="mt-1">{selectedTest.completion_date}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Operator</label>
                        <div className="mt-1">{selectedTest.operator}</div>
                      </div>
                      {selectedTest.notes && (
                        <div>
                          <label className="text-sm font-medium">Notes</label>
                          <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">{selectedTest.notes}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Test
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Category Detail Modal */}
          {selectedCategory && (
            <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {React.createElement(categoryIcons[selectedCategory.name as keyof typeof categoryIcons] || Beaker, { className: "h-5 w-5" })}
                    {selectedCategory.name}
                  </DialogTitle>
                  <DialogDescription>
                    Detailed view of all tests in this category
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{selectedCategory.tests.length}</div>
                      <div className="text-sm text-muted-foreground">Total Tests</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedCategory.tests.filter(t => t.acceptance_status === "Pass").length}
                      </div>
                      <div className="text-sm text-muted-foreground">Passed</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{selectedCategory.completion_percentage}%</div>
                      <div className="text-sm text-muted-foreground">Completion</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedCategory.tests.map((test) => {
                      const StatusIcon = getStatusIcon(test.acceptance_status)
                      return (
                        <div
                          key={test.test_name}
                          className="p-4 border border-border rounded-lg hover:shadow-md transition-all cursor-pointer"
                          onClick={() => {
                            setSelectedCategory(null)
                            setSelectedTest(test)
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <StatusIcon className={`h-4 w-4 ${getStatusColor(test.acceptance_status)}`} />
                                <h4 className="font-semibold">{test.test_name}</h4>
                                <Badge className={getStatusBadgeColor(test.acceptance_status)} variant="outline">
                                  {test.acceptance_status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Result: </span>
                                  <span className="font-medium">{test.actual_result} {test.unit}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Range: </span>
                                  <span className="font-medium">{test.lower_limit} - {test.upper_limit} {test.unit}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Date: </span>
                                  <span className="font-medium">{test.completion_date}</span>
                                </div>
                              </div>
                            </div>
                            
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                      )
                    })}
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