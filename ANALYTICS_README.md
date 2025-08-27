# Analytics & Management Features Documentation

## Overview

This document describes the comprehensive analytics and management features implemented in the Gradian CRM platform, including Samples Management, Compliance Management, and Analytics Dashboard with full ECharts integration.

## Features Implemented

### 1. Samples Management (`/samples`)

#### Overview Tab
- **Summary Cards**: Total samples, distributed, remaining, and expiring soon counts
- **Inventory Distribution Chart**: Pie chart showing sample quantities by category
- **Distribution vs Remaining Chart**: Bar chart comparing distributed vs remaining stock

#### Inventory Tab
- **Search & Filter**: Advanced search and filtering capabilities
- **Sample List**: Comprehensive table with sample details including:
  - Sample ID, name, batch number
  - Quantity, distributed, and remaining counts
  - Expiry date and status
  - Category and location
  - Action buttons (view, edit, delete)

#### Distribution Tab
- **Distribution History**: Complete tracking of sample distributions
- **HCP Information**: Healthcare professional details and hospital information
- **Status Tracking**: Delivery status and timestamps

#### Analytics Tab
- **Expiry Timeline**: Line chart showing days until samples expire
- **Distribution Metrics**: Key performance indicators including:
  - Distribution rate
  - Coverage percentage
  - Average delivery time
  - Active recipients count

### 2. Compliance Management (`/compliance`)

#### Overview Tab
- **Compliance Score**: Overall compliance rating with trend indicators
- **Status Distribution**: Pie chart showing compliance items by status
- **Risk Assessment**: Bar chart displaying risk levels across different areas
- **Recent Updates**: Latest compliance activities and changes

#### Compliance Items Tab
- **Item Management**: Comprehensive compliance requirement tracking
- **Advanced Filtering**: Search by title, type, department, or assigned person
- **Status Tracking**: Approved, in-progress, pending, and overdue statuses
- **Priority & Risk**: High/medium/low priority and risk level indicators
- **Due Date Management**: Deadline tracking and alerts

#### Audit Log Tab
- **Activity History**: Complete audit trail of all compliance activities
- **User Tracking**: Who performed what action and when
- **Category Classification**: Regulatory, quality, privacy, and training activities
- **Status Monitoring**: Completed and in-progress activities

#### Analytics Tab
- **Compliance Trends**: Monthly compliance score progression
- **Performance Metrics**: Key indicators including:
  - Regulatory score
  - Quality score
  - Risk assessment
  - On-time completion rate

### 3. Analytics Dashboard (`/analytics`)

#### Overview Tab
- **Performance Metrics**: Revenue, growth, HCP engagement, and territory coverage
- **Revenue Performance**: Quarterly revenue trends visualization
- **HCP Engagement**: Engagement rates by medical specialty
- **Top Performers**: Highest revenue-generating healthcare professionals

#### Performance Tab
- **Sales Funnel**: Conversion rates through sales stages
- **Performance Trends**: Monthly performance indicators
- **Performance Breakdown**: Analysis by product category, region, and key metrics
- **Advanced Metrics**: Deal size, conversion rates, sales cycle, and customer lifetime value

#### Territory Tab
- **Performance Heatmap**: Geographic visualization of territory performance
- **Coverage Analysis**: Territory coverage and performance metrics
- **Regional Insights**: Performance analysis by geographic regions
- **Resource Allocation**: Recommendations for field resource distribution

#### Insights Tab
- **Predictive Analytics**: AI-powered revenue forecasts and risk assessment
- **Actionable Recommendations**: Specific suggestions for improvement
- **Advanced Metrics**: Year-over-year growth, customer satisfaction, active HCPs, response times

## Technical Implementation

### ECharts Integration

All charts are implemented using ECharts for React (`echarts-for-react`) with the following chart types:

- **Pie Charts**: Status distribution, inventory categories, HCP engagement
- **Bar Charts**: Revenue performance, distribution trends, risk assessment
- **Line Charts**: Compliance trends, performance progression, expiry timelines
- **Funnel Charts**: Sales funnel analysis
- **Custom Visualizations**: Territory heatmaps and performance matrices

### Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Grid Layouts**: Responsive grid systems for optimal chart display
- **Interactive Elements**: Hover effects, tooltips, and responsive interactions
- **Loading States**: Skeleton UI components for better user experience

### Data Management

- **Mock Data**: Comprehensive sample datasets for demonstration
- **Real-time Updates**: Dynamic data loading and updates
- **Search & Filter**: Advanced filtering capabilities across all pages
- **Export Functionality**: Data export capabilities for reporting

## Navigation Integration

The new pages are fully integrated into the existing navigation system:

- **Sidebar Navigation**: Added to MainSidebar component
- **Breadcrumb Support**: Proper routing and navigation
- **Consistent Layout**: Uses MainLayout wrapper for consistency
- **Loading States**: Proper loading components for each page

## Usage Examples

### Samples Management
```typescript
// Navigate to samples page
// View inventory overview with charts
// Search for specific samples
// Track distribution history
// Monitor expiry dates
```

### Compliance Management
```typescript
// Monitor compliance scores
// Track regulatory requirements
// Review audit logs
// Assess risk levels
// Manage deadlines
```

### Analytics Dashboard
```typescript
// View performance metrics
// Analyze territory performance
// Track HCP engagement
// Generate insights
// Export reports
```

## Dependencies

- **echarts**: Core charting library
- **echarts-for-react**: React wrapper for ECharts
- **framer-motion**: Animation and transitions
- **lucide-react**: Icon library
- **radix-ui**: UI component primitives

## Performance Considerations

- **Lazy Loading**: ECharts components loaded dynamically
- **SSR Compatibility**: Proper NoSSR wrapping for chart components
- **Responsive Charts**: Charts adapt to container sizes
- **Optimized Rendering**: Efficient chart updates and re-renders

## Future Enhancements

- **Real-time Data**: Integration with backend APIs
- **Advanced Filtering**: More sophisticated search and filter options
- **Custom Dashboards**: User-configurable dashboard layouts
- **Data Export**: PDF and Excel export capabilities
- **Notifications**: Alert system for compliance and expiry dates
- **Mobile App**: Native mobile application support

## Troubleshooting

### Common Issues

1. **Charts Not Loading**: Ensure ECharts dependencies are installed
2. **SSR Errors**: Verify NoSSR wrapping is in place
3. **Responsive Issues**: Check container sizing and CSS classes
4. **Performance**: Monitor chart complexity and data size

### Debug Mode

Enable debug mode by setting environment variables:
```bash
NEXT_PUBLIC_DEBUG=true
```

## Support

For technical support or feature requests, please refer to the main project documentation or create an issue in the project repository. 