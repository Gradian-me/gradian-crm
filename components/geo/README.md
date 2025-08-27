# Geo Components

This directory contains geographic and mapping components for the Gradian CRM system.

## Components

### LeafletMap

A React component that provides an interactive map interface using Leaflet.js for field tracking and visit management.

#### Features

- **Real-time GPS Tracking**: Shows current location with animated tracking indicator
- **Visit Markers**: Interactive markers for each HCP visit with status-based colors
- **Route Visualization**: Displays optimized routes between visits
- **Visit Information**: Popup details for each visit with quick actions
- **Status Indicators**: Color-coded markers for completed, in-progress, and scheduled visits
- **Responsive Design**: Adapts to different screen sizes and orientations

#### Props

```typescript
interface LeafletMapProps {
  visits: Visit[]                    // Array of visit data
  currentLocation: {                 // Current GPS coordinates
    lat: number
    lng: number
  }
  isTracking: boolean               // Whether GPS tracking is active
  onVisitSelect: (visit: Visit) => void  // Callback when visit is selected
  onCheckIn?: (visitId: number) => void  // Optional check-in handler
  onCheckOut?: (visitId: number) => void // Optional check-out handler
}
```

#### Usage

```tsx
import LeafletMap from "@/components/geo/LeafletMap"

<LeafletMap
  currentLocation={currentLocation}
  visits={mockVisits}
  isTracking={isTracking}
  onVisitSelect={(visit) => setSelectedVisit(visit)}
  onCheckIn={(visitId) => handleCheckIn(visitId)}
  onCheckOut={(visitId) => handleCheckOut(visitId)}
/>
```

#### Visit Data Structure

```typescript
interface Visit {
  id: number
  hcp: string                    // Healthcare professional name
  institution: string            // Hospital/clinic name
  address: string               // Full address
  type: string                  // Visit type (hospital, clinic, distributor)
  status: string                // Visit status (completed, in-progress, scheduled)
  checkIn: string | null        // Check-in time
  checkOut: string | null       // Check-out time
  duration: string              // Visit duration
  purpose: string               // Visit purpose
  notes: string                 // Additional notes
  coordinates: {                // GPS coordinates
    lat: number
    lng: number
  }
  distance: string              // Distance from current location
  specialty: string             // Medical specialty
}
```

#### Styling

The component uses custom CSS for consistent styling with the CRM theme:

- **Markers**: Status-based colors (green for completed, blue for in-progress, yellow for scheduled)
- **Route Lines**: Purple dashed lines with arrows
- **Current Location**: Animated circle with tracking status
- **Popups**: Consistent with CRM design system
- **Responsive**: Adapts to different screen sizes

#### Dependencies

- `react-leaflet`: React wrapper for Leaflet.js
- `leaflet`: Core mapping library
- `@types/leaflet`: TypeScript definitions

#### Browser Support

- Modern browsers with ES6+ support
- Mobile-responsive design
- Touch-friendly interactions for mobile devices

#### Performance

- Dynamic imports to avoid SSR issues
- Efficient marker rendering
- Optimized route calculations
- Lazy loading of map tiles

## Future Enhancements

- **Offline Support**: Cache map tiles for offline use
- **Real-time Updates**: WebSocket integration for live visit updates
- **Advanced Routing**: Integration with external routing services
- **Geofencing**: Automatic check-in/out based on location
- **Analytics**: Visit pattern analysis and optimization suggestions 