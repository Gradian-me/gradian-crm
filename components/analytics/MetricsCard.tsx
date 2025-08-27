import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface MetricsCardProps {
  title: string
  value: string | number
  change?: string
  trend?: string
  period?: string
  icon: LucideIcon
  description?: string
  variant?: "default" | "success" | "warning" | "info" | "danger"
  size?: "sm" | "md" | "lg"
  className?: string
}

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case "success":
      return {
        bg: "bg-green-50",
        icon: "text-green-600",
        value: "text-green-600",
        change: "text-green-600",
      }
    case "warning":
      return {
        bg: "bg-yellow-50",
        icon: "text-yellow-600",
        value: "text-yellow-600",
        change: "text-yellow-600",
      }
    case "info":
      return {
        bg: "bg-blue-50",
        icon: "text-blue-600",
        value: "text-blue-600",
        change: "text-blue-600",
      }
    case "danger":
      return {
        bg: "bg-red-50",
        icon: "text-red-600",
        value: "text-red-600",
        change: "text-red-600",
      }
    default:
      return {
        bg: "bg-gray-50",
        icon: "text-muted-foreground",
        value: "text-foreground",
        change: "text-muted-foreground",
      }
  }
}

const getSizeStyles = (size: string) => {
  switch (size) {
    case "sm":
      return {
        title: "text-xs font-medium",
        value: "text-lg font-bold",
        change: "text-xs",
        description: "text-xs",
      }
    case "lg":
      return {
        title: "text-sm font-medium",
        value: "text-3xl font-bold",
        change: "text-sm",
        description: "text-sm",
      }
    default:
      return {
        title: "text-sm font-medium",
        value: "text-2xl font-bold",
        change: "text-xs",
        description: "text-xs",
      }
  }
}

export default function MetricsCard({
  title,
  value,
  change,
  trend,
  period,
  icon: Icon,
  description,
  variant = "default",
  size = "md",
  className = "",
}: MetricsCardProps) {
  const variantStyles = getVariantStyles(variant)
  const sizeStyles = getSizeStyles(size)

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={sizeStyles.title}>{title}</CardTitle>
        <Icon className={`h-4 w-4 ${variantStyles.icon}`} />
      </CardHeader>
      <CardContent>
        <div className={sizeStyles.value}>{value}</div>
        {(change || trend) && (
          <div className="flex items-center gap-1 mt-1">
            {change && (
              <span
                className={`font-medium ${sizeStyles.change} ${
                  trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
                }`}
              >
                {change}
              </span>
            )}
            {period && <span className={`text-muted-foreground ${sizeStyles.change}`}>{period}</span>}
            {trend && (
              <Badge
                variant="outline"
                className={`ml-1 ${
                  trend === "up" ? "border-green-200 text-green-700" : "border-red-200 text-red-700"
                }`}
              >
                {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
              </Badge>
            )}
          </div>
        )}
        {description && <p className={`text-muted-foreground mt-1 ${sizeStyles.description}`}>{description}</p>}
      </CardContent>
    </Card>
  )
}

// Specialized metric card variants
export function SuccessMetricsCard(props: Omit<MetricsCardProps, "variant">) {
  return <MetricsCard {...props} variant="success" />
}

export function WarningMetricsCard(props: Omit<MetricsCardProps, "variant">) {
  return <MetricsCard {...props} variant="warning" />
}

export function InfoMetricsCard(props: Omit<MetricsCardProps, "variant">) {
  return <MetricsCard {...props} variant="info" />
}

export function DangerMetricsCard(props: Omit<MetricsCardProps, "variant">) {
  return <MetricsCard {...props} variant="danger" />
}

// Compact metrics card for smaller spaces
export function CompactMetricsCard(props: Omit<MetricsCardProps, "size">) {
  return <MetricsCard {...props} size="sm" />
}

// Large metrics card for prominent displays
export function LargeMetricsCard(props: Omit<MetricsCardProps, "size">) {
  return <MetricsCard {...props} size="lg" />
} 