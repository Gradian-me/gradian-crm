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
  variant?: "default" | "success" | "warning" | "info" | "danger" | "gradient" | "purple" | "featured"
  size?: "sm" | "md" | "lg"
  className?: string
}

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case "success":
      return {
        card: "bg-green-50 border-green-200",
        icon: "text-green-600",
        value: "text-green-600",
        change: "text-green-600",
        title: "text-green-800",
        description: "text-green-600",
      }
    case "warning":
      return {
        card: "bg-yellow-50 border-yellow-200",
        icon: "text-yellow-600",
        value: "text-yellow-600",
        change: "text-yellow-600",
        title: "text-yellow-800",
        description: "text-yellow-600",
      }
    case "info":
      return {
        card: "bg-blue-50 border-blue-200",
        icon: "text-blue-600",
        value: "text-blue-600",
        change: "text-blue-600",
        title: "text-blue-800",
        description: "text-blue-600",
      }
    case "danger":
      return {
        card: "bg-red-50 border-red-200",
        icon: "text-red-600",
        value: "text-red-600",
        change: "text-red-600",
        title: "text-red-800",
        description: "text-red-600",
      }
    case "gradient":
      return {
        card: "card-important",
        icon: "text-white/90",
        value: "text-white",
        change: "text-white/80",
        title: "text-white",
        description: "text-white/70",
      }
    case "purple":
      return {
        card: "card-featured",
        icon: "text-white/90",
        value: "text-white",
        change: "text-white/80",
        title: "text-white",
        description: "text-white/70",
      }
    case "featured":
      return {
        card: "card-highlight",
        icon: "text-white/90",
        value: "text-white",
        change: "text-white/80",
        title: "text-white",
        description: "text-white/70",
      }
    default:
      return {
        card: "card-minimal",
        icon: "text-muted-foreground",
        value: "text-foreground",
        change: "text-muted-foreground",
        title: "text-foreground",
        description: "text-muted-foreground",
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
  const isGradientVariant = ["gradient", "purple", "featured"].includes(variant)

  return (
    <Card className={`h-full ${variantStyles.card} ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`${sizeStyles.title} ${variantStyles.title}`}>{title}</CardTitle>
        <Icon className={`h-4 w-4 ${variantStyles.icon}`} />
      </CardHeader>
      <CardContent>
        <div className={`${sizeStyles.value} ${variantStyles.value}`}>{value}</div>
        {(change || trend) && (
          <div className="flex items-center gap-1 mt-1">
            {change && (
              <span
                className={`font-medium ${sizeStyles.change} ${
                  isGradientVariant 
                    ? variantStyles.change
                    : trend === "up" 
                      ? "text-green-600" 
                      : trend === "down" 
                        ? "text-red-600" 
                        : "text-muted-foreground"
                }`}
              >
                {change}
              </span>
            )}
            {period && (
              <span className={`${sizeStyles.change} ${
                isGradientVariant ? "text-white/60" : "text-muted-foreground"
              }`}>
                {period}
              </span>
            )}
            {trend && (
              <Badge
                variant="outline"
                className={`ml-1 ${
                  isGradientVariant 
                    ? "border-white/30 text-white/90 bg-white/10"
                    : trend === "up" 
                      ? "border-green-200 text-green-700" 
                      : "border-red-200 text-red-700"
                }`}
              >
                {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
              </Badge>
            )}
          </div>
        )}
        {description && (
          <p className={`mt-1 ${sizeStyles.description} ${variantStyles.description}`}>
            {description}
          </p>
        )}
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

export function GradientMetricsCard(props: Omit<MetricsCardProps, "variant">) {
  return <MetricsCard {...props} variant="gradient" />
}

export function PurpleMetricsCard(props: Omit<MetricsCardProps, "variant">) {
  return <MetricsCard {...props} variant="purple" />
}

export function FeaturedMetricsCard(props: Omit<MetricsCardProps, "variant">) {
  return <MetricsCard {...props} variant="featured" />
}

// Compact metrics card for smaller spaces
export function CompactMetricsCard(props: Omit<MetricsCardProps, "size">) {
  return <MetricsCard {...props} size="sm" />
}

// Large metrics card for prominent displays
export function LargeMetricsCard(props: Omit<MetricsCardProps, "size">) {
  return <MetricsCard {...props} size="lg" />
} 