'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Stethoscope, 
  MapPin, 
  BarChart3, 
  Shield, 
  Users, 
  Smartphone,
  ChevronRight,
  CheckCircle2,
  Heart,
  Target,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Clock,
  Database,
  Workflow,
  UserCheck
} from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Stethoscope,
    title: "Healthcare Professional Management",
    description: "Comprehensive HCP profiles with specialty categorization, engagement scoring, and territory management",
    color: "text-purple-600"
  },
  {
    icon: MapPin,
    title: "GPS Field Tracking",
    description: "Real-time location tracking, visit management, and route optimization for field representatives",
    color: "text-blue-600"
  },
  {
    icon: Database,
    title: "Medical Sample Management",
    description: "Complete sample lifecycle tracking from distribution to expiry with compliance reporting",
    color: "text-cyan-600"
  },
  {
    icon: TrendingUp,
    title: "Sales Pipeline Management",
    description: "Multi-stage pipeline with tender tracking, conversion analytics, and opportunity management",
    color: "text-orange-600"
  },
  {
    icon: Shield,
    title: "Compliance & Documentation",
    description: "Regulatory tracking, audit logs, risk assessment, and automated compliance monitoring",
    color: "text-green-600"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time dashboards, territory analysis, performance metrics, and predictive insights",
    color: "text-red-600"
  },
  {
    icon: Workflow,
    title: "Project Management Integration",
    description: "Task management, resource allocation, and seamless integration with popular PM tools",
    color: "text-violet-600"
  },
  {
    icon: UserCheck,
    title: "Performance Management",
    description: "360-degree reviews, OKR tracking, competency assessment, and automated incentive management",
    color: "text-indigo-600"
  }
]

const useCases = [
  {
    title: "Medical Device Companies",
    description: "Manage device demonstrations, track equipment placements, and monitor service schedules",
    icon: Heart,
    benefits: ["Equipment tracking", "Service scheduling", "Demo management", "Warranty monitoring"]
  },
  {
    title: "Pharmaceutical Sales",
    description: "Track sample distribution, manage HCP relationships, and ensure regulatory compliance",
    icon: Target,
    benefits: ["Sample tracking", "HCP engagement", "Compliance monitoring", "Territory coverage"]
  },
  {
    title: "Field Operations",
    description: "Optimize routes, track visits, and manage territory coverage with GPS integration",
    icon: Zap,
    benefits: ["Route optimization", "Visit tracking", "Territory management", "Real-time updates"]
  },
  {
    title: "Regulatory Affairs",
    description: "Maintain compliance documentation, track audit requirements, and manage risk assessment",
    icon: Globe,
    benefits: ["Audit trails", "Risk assessment", "Documentation", "Compliance scoring"]
  }
]

const benefits = [
  "Increase sales productivity by 40%",
  "Reduce compliance risks by 60%",
  "Improve territory coverage by 35%",
  "Streamline sample management by 50%",
  "Enhance HCP engagement by 45%",
  "Optimize field routes by 30%"
]

const stats = [
  { number: "500+", label: "Healthcare Facilities", icon: Stethoscope },
  { number: "50K+", label: "HCPs Managed", icon: Users },
  { number: "99.9%", label: "Uptime Guarantee", icon: Award },
  { number: "24/7", label: "Support Available", icon: Clock }
]

export default function IntroductionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-purple-100 text-purple-700 border-purple-200">
              Next-Generation Healthcare CRM
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="text-gradient bg-gradient-to-r from-purple-600 to-blue-600">
                Gradian CRM
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate Customer Relationship Management platform designed specifically for 
              <span className="font-semibold text-purple-600"> medical device</span> and 
              <span className="font-semibold text-blue-600"> pharmaceutical</span> sales teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="btn-gradient px-8 py-3 text-lg">
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-purple-200 hover:bg-purple-50">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Healthcare Sales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage healthcare professional relationships, track field operations, 
              and ensure regulatory compliance in one comprehensive platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-glass h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className={`p-3 rounded-lg w-fit ${feature.color} bg-gradient-to-br from-current/10 to-current/20`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Your Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored solutions for different segments of the healthcare industry, 
              from medical devices to pharmaceutical sales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="card-featured h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
                        <useCase.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">{useCase.title}</CardTitle>
                        <CardDescription className="text-purple-100 text-base">
                          {useCase.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {useCase.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2 text-white/90">
                          <CheckCircle2 className="h-4 w-4 text-green-300" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Measurable Results You Can Count On
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our platform delivers proven results across key performance indicators 
                that matter most to healthcare sales organizations.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute top-8 left-8 right-8 bottom-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">40%</div>
                      <div className="text-purple-100">Productivity Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">60%</div>
                      <div className="text-purple-100">Risk Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">35%</div>
                      <div className="text-purple-100">Coverage Improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">50%</div>
                      <div className="text-purple-100">Process Streamlining</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by cutting-edge web technologies for performance, security, and scalability.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: "React 19", desc: "Frontend Framework" },
              { name: "Next.js 15", desc: "Full-Stack Framework" },
              { name: "TypeScript", desc: "Type Safety" },
              { name: "Tailwind CSS", desc: "Modern Styling" },
              { name: "Framer Motion", desc: "Smooth Animations" },
              { name: "PostgreSQL", desc: "Reliable Database" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-600">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Healthcare Sales?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of healthcare organizations already using Gradian CRM 
              to streamline operations and boost performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Start Free Trial <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 