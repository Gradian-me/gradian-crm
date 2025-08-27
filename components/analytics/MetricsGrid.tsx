import { motion } from "framer-motion"
import MetricsCard, { MetricsCardProps } from "./MetricsCard"

interface MetricsGridProps {
  metrics: MetricsCardProps[]
  columns?: 2 | 3 | 4 | 5 | 6
  className?: string
  animate?: boolean
  delay?: number
}

const getGridColumns = (columns: number) => {
  switch (columns) {
    case 2:
      return "md:grid-cols-2"
    case 3:
      return "md:grid-cols-2 lg:grid-cols-3"
    case 4:
      return "md:grid-cols-2 lg:grid-cols-4"
    case 5:
      return "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
    case 6:
      return "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    default:
      return "md:grid-cols-2 lg:grid-cols-4"
  }
}

export default function MetricsGrid({
  metrics,
  columns = 4,
  className = "",
  animate = true,
  delay = 0.1,
}: MetricsGridProps) {
  const gridColumns = getGridColumns(columns)

  return (
    <div className={`grid gap-4 ${gridColumns} ${className}`}>
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={animate ? { opacity: 1, y: 0 } : false}
          transition={{ delay: animate ? index * delay : 0 }}
        >
          <MetricsCard {...metric} />
        </motion.div>
      ))}
    </div>
  )
}

// Specialized grid layouts
export function KPIGrid({ metrics, ...props }: Omit<MetricsGridProps, "columns">) {
  return <MetricsGrid {...props} metrics={metrics} columns={4} />
}

export function CompactGrid({ metrics, ...props }: Omit<MetricsGridProps, "columns">) {
  return <MetricsGrid {...props} metrics={metrics} columns={6} />
}

export function WideGrid({ metrics, ...props }: Omit<MetricsGridProps, "columns">) {
  return <MetricsGrid {...props} metrics={metrics} columns={3} />
}

export function TwoColumnGrid({ metrics, ...props }: Omit<MetricsGridProps, "columns">) {
  return <MetricsGrid {...props} metrics={metrics} columns={2} />
} 