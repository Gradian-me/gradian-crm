# Medical Representatives (Med Reps) Module

## Overview
The Medical Representatives module provides comprehensive tracking and analytics for medical sales representatives, including performance monitoring, activity tracking, routing optimization, and achievement recognition.

## Features

### 🎯 **Performance Tracking**
- Individual performance metrics (percentage-based scoring)
- Sales volume tracking with currency formatting
- Activity count monitoring
- Route completion statistics
- Performance trend analysis

### 📍 **Routing & Field Management**
- Route planning and optimization
- Distance and duration tracking
- Stop count management
- Route efficiency scoring
- Status tracking (planned, in-progress, completed)

### 📊 **Analytics & Insights**
- Team performance overview
- Sales trend analysis
- Activity metrics dashboard
- Regional performance comparison
- Growth rate calculations

### 🏆 **Champions & Achievements**
- Top performer recognition
- Achievement badge system
- Performance leaderboards
- Route champion identification
- Sales leader tracking

### 📱 **Modern UI Components**
- Responsive grid layouts
- Interactive tabs for organization
- Progress bars and metrics cards
- Avatar and badge components
- Skeleton loading states

## Page Structure

### Main Page (`/med-reps`)
- **Header Section**: Title, description, and action buttons
- **Key Metrics**: 4-card overview of team statistics
- **Tabbed Interface**: 5 main sections for different aspects

### Tab Organization
1. **Overview**: Rep performance summary and recent activities
2. **Performance**: Detailed performance metrics and top products
3. **Routing**: Route management and efficiency analytics
4. **Analytics**: Sales trends and activity metrics
5. **Champions**: Top performers and achievements

## Data Structure

### Med Rep Data Model
```typescript
interface MedRep {
  id: number
  name: string
  avatar: string
  region: string
  performance: number
  activities: number
  routes: number
  sales: number
  status: 'active' | 'inactive'
  lastActivity: string
  topProducts: string[]
  achievements: string[]
}
```

### Route Data Model
```typescript
interface Route {
  id: number
  name: string
  rep: string
  stops: number
  distance: string
  duration: string
  efficiency: number
  status: 'planned' | 'in-progress' | 'completed'
}
```

## Components Used

### UI Components
- `Card`, `CardHeader`, `CardContent`, `CardTitle`
- `Badge` for status and achievement indicators
- `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`
- `Progress` for performance visualization
- `Avatar`, `AvatarFallback`, `AvatarImage`
- `Button` for actions
- `Separator` for visual organization
- `Skeleton` for loading states

### Icons
- `Activity`, `Award`, `Calendar`, `Clock`
- `MapPin`, `TrendingUp`, `Users`, `Target`
- `Star`, `Route`, `BarChart3`, `Trophy`
- `CheckCircle`, `Navigation`, `DollarSign`

## Responsive Design

### Grid Layouts
- **Mobile**: Single column layout
- **Tablet**: 2-column grid for medium screens
- **Desktop**: 4-column metrics, 2-column content

### Breakpoints
- `md:grid-cols-2` for tablet layouts
- `lg:grid-cols-4` for desktop metrics
- `lg:grid-cols-2` for desktop content

## Performance Features

### Loading States
- Skeleton components for all major sections
- Progressive loading of data
- Optimized rendering with React hooks

### Data Management
- Mock data structure for development
- Easy integration with real APIs
- Efficient state management with useState

## Navigation Integration

### Sidebar Addition
- New "Med Reps" menu item
- Positioned after "HCP Management"
- Uses `UserCheck` icon for clear identification

### Routing
- Accessible at `/med-reps`
- Integrated with existing navigation structure
- Consistent with other module patterns

## Future Enhancements

### Planned Features
- Real-time activity updates
- Advanced route optimization algorithms
- Performance prediction models
- Integration with GPS tracking
- Automated reporting generation

### Analytics Improvements
- Interactive charts and graphs
- Custom date range selection
- Export functionality for reports
- Comparative analysis tools

## Best Practices Implemented

### Code Organization
- Modular component structure
- Consistent naming conventions
- TypeScript interfaces for data
- Reusable UI components

### User Experience
- Intuitive tab navigation
- Clear visual hierarchy
- Consistent spacing and typography
- Accessible color schemes

### Performance
- Efficient rendering with React
- Optimized component structure
- Minimal re-renders
- Responsive design patterns

## Usage Examples

### Adding a New Med Rep
```typescript
const newRep = {
  id: 4,
  name: "Alex Thompson",
  avatar: "/api/placeholder/40/40",
  region: "Midwest",
  performance: 88,
  activities: 22,
  routes: 9,
  sales: 135000,
  status: "active",
  lastActivity: "1 hour ago",
  topProducts: ["CardioMax Pro", "VitalSigns"],
  achievements: ["Newcomer Award"]
}
```

### Customizing Performance Metrics
```typescript
const customMetrics = {
  totalReps: 30,
  activeReps: 28,
  avgPerformance: 92,
  totalSales: 4500000,
  growthRate: 15.2
}
```

## Integration Points

### Existing Modules
- **HCP Management**: Rep-to-HCP relationships
- **Field Tracking**: Route and location data
- **Sales Funnel**: Performance metrics
- **Analytics**: Cross-module insights

### External Systems
- CRM data integration
- GPS tracking services
- Sales reporting tools
- Performance management systems

## Maintenance

### Regular Updates
- Performance metric calculations
- Achievement system updates
- Route optimization algorithms
- Data visualization improvements

### Monitoring
- Performance metrics accuracy
- User engagement analytics
- System response times
- Data consistency checks

---

*This module provides a comprehensive solution for managing medical representatives, combining performance tracking, route optimization, and achievement recognition in a modern, user-friendly interface.* 