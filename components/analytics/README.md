# Analytics Components

This directory contains reusable analytics and metrics components for displaying KPI data across the Gradian CRM system.

## Components

### MetricsCard

A flexible card component for displaying individual metrics with various styling options.

#### Features

- **Multiple Variants**: Default, success, warning, info, and danger variants
- **Size Options**: Small, medium, and large sizes
- **Trend Indicators**: Up/down/neutral trend arrows with color coding
- **Icon Support**: Lucide React icons for visual representation
- **Responsive Design**: Adapts to different screen sizes

#### Props

```typescript
interface MetricsCardProps {
  title: string                    // Metric title
  value: string | number          // Metric value
  change?: string                 // Change indicator (e.g., "+12%")
  trend?: "up" | "down" | "neutral"  // Trend direction
  period?: string                 // Time period (e.g., "from last month")
  icon: LucideIcon               // Icon component
  description?: string            // Additional description text
  variant?: "default" | "success" | "warning" | "info" | "danger"
  size?: "sm" | "md" | "lg"
  className?: string              // Additional CSS classes
}
```

#### Usage

```tsx
import { MetricsCard, TrendingUp } from "@/components/analytics"

<MetricsCard
  title="Revenue Growth"
  value="$2.4M"
  change="+15%"
  trend="up"
  period="from last month"
  icon={TrendingUp}
  variant="success"
/>
```

#### Specialized Variants

```tsx
import { 
  SuccessMetricsCard, 
  WarningMetricsCard, 
  InfoMetricsCard, 
  DangerMetricsCard,
  CompactMetricsCard,
  LargeMetricsCard
} from "@/components/analytics"

// Pre-configured variants
<SuccessMetricsCard
  title="Conversion Rate"
  value="24.3%"
  icon={TrendingUp}
/>

<WarningMetricsCard
  title="Risk Level"
  value="Medium"
  icon={AlertTriangle}
/>

<CompactMetricsCard
  title="Quick Metric"
  value="42"
  icon={Target}
/>
```

### MetricsGrid

A responsive grid component for displaying multiple metrics in organized layouts.

#### Features

- **Flexible Columns**: Configurable 2-6 column layouts
- **Responsive Design**: Automatic column adjustment for different screen sizes
- **Animation Support**: Built-in Framer Motion animations
- **Customizable Spacing**: Configurable gaps and delays

#### Props

```typescript
interface MetricsGridProps {
  metrics: MetricsCardProps[]     // Array of metric configurations
  columns?: 2 | 3 | 4 | 5 | 6    // Number of columns
  className?: string              // Additional CSS classes
  animate?: boolean               // Enable/disable animations
  delay?: number                  // Animation delay between items
}
```

#### Usage

```tsx
import { MetricsGrid } from "@/components/analytics"

<MetricsGrid
  metrics={[
    {
      title: "Total Revenue",
      value: "$4.2M",
      change: "+18.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    // ... more metrics
  ]}
  columns={4}
  animate={true}
  delay={0.1}
/>
```

#### Specialized Grid Layouts

```tsx
import { 
  KPIGrid,        // 4 columns - standard KPI layout
  CompactGrid,    // 6 columns - compact display
  WideGrid,       // 3 columns - wider cards
  TwoColumnGrid   // 2 columns - large cards
} from "@/components/analytics"

// Pre-configured layouts
<KPIGrid metrics={kpiMetrics} />
<CompactGrid metrics={manyMetrics} />
<WideGrid metrics={detailedMetrics} />
<TwoColumnGrid metrics={prominentMetrics} />
```

## Usage Examples

### Basic KPI Dashboard

```tsx
import { KPIGrid } from "@/components/analytics"

const dashboardMetrics = [
  {
    title: "Total Revenue",
    value: "$4.2M",
    change: "+18.5%",
    trend: "up",
    period: "vs last quarter",
    icon: DollarSign,
  },
  {
    title: "Sales Growth",
    value: "24.3%",
    change: "+5.2%",
    trend: "up",
    period: "vs last quarter",
    icon: TrendingUp,
  },
  // ... more metrics
]

<KPIGrid metrics={dashboardMetrics} />
```

### Status-Based Metrics

```tsx
import { MetricsGrid } from "@/components/analytics"

const statusMetrics = [
  {
    title: "Overall Score",
    value: "97%",
    change: "+3%",
    trend: "up",
    period: "from last month",
    icon: Shield,
    variant: "success",
  },
  {
    title: "Overdue Items",
    value: "1",
    description: "Requires attention",
    icon: AlertTriangle,
    variant: "danger",
  },
  // ... more metrics
]

<MetricsGrid metrics={statusMetrics} columns={4} />
```

### Compact Metrics Display

```tsx
import { CompactGrid } from "@/components/analytics"

const quickMetrics = [
  { title: "Visits", value: "89", icon: MapPin },
  { title: "Samples", value: "380", icon: Package },
  { title: "HCPs", value: "1,247", icon: Users },
  { title: "Efficiency", value: "87%", icon: Target },
  { title: "Distance", value: "38.5 mi", icon: Car },
  { title: "Time", value: "4h 30m", icon: Timer },
]

<CompactGrid metrics={quickMetrics} />
```

## Styling

### Variant Colors

- **Default**: Gray theme with muted colors
- **Success**: Green theme for positive metrics
- **Warning**: Yellow theme for attention metrics
- **Info**: Blue theme for informational metrics
- **Danger**: Red theme for critical metrics

### Responsive Breakpoints

- **Mobile**: 1 column (default)
- **Tablet**: 2 columns (md: breakpoint)
- **Desktop**: 4+ columns (lg: breakpoint)
- **Large Desktop**: 5-6 columns (xl: breakpoint)

### Animation

- **Entrance**: Fade in with upward movement
- **Stagger**: Sequential animation with configurable delays
- **Performance**: Optimized animations with reduced motion support

## Best Practices

1. **Consistent Naming**: Use clear, descriptive titles for metrics
2. **Appropriate Variants**: Choose variant colors that match the metric context
3. **Icon Selection**: Use relevant icons that enhance understanding
4. **Responsive Design**: Test layouts on different screen sizes
5. **Performance**: Limit the number of animated metrics for better performance

## Future Enhancements

- **Real-time Updates**: WebSocket integration for live metric updates
- **Interactive Metrics**: Clickable metrics with drill-down capabilities
- **Custom Themes**: User-configurable color schemes
- **Export Options**: PDF/Excel export functionality
- **Advanced Animations**: More sophisticated animation patterns 