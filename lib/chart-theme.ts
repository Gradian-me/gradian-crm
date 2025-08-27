// Centralized ECharts theme configuration
export const chartTheme = {
  // Primary color palette
  colors: {
    primary: "#8b5cf6",      // Purple
    secondary: "#3b82f6",    // Blue
    accent: "#06b6d4",       // Cyan
    highlight: "#f97316",    // Orange
  },
  
  // Chart-specific color schemes
  schemes: {
    // 4-color scheme for most charts
    default: ["#8b5cf6", "#3b82f6", "#06b6d4", "#f97316"],
    
    // 5-color scheme for pie charts and complex visualizations
    extended: ["#8b5cf6", "#3b82f6", "#06b6d4", "#f97316", "#10b981"],
    
    // 6-color scheme for extended pie charts
    extended6: ["#8b5cf6", "#3b82f6", "#06b6d4", "#f97316", "#10b981", "#f59e0b"],
    
    // 7-color scheme for comprehensive pie charts
    extended7: ["#8b5cf6", "#3b82f6", "#06b6d4", "#f97316", "#10b981", "#f59e0b", "#ef4444"],
    
    // Sequential schemes for different chart types
    sequential: {
      purple: ["#8b5cf6", "#a855f7", "#c084fc", "#d8b4fe"],
      blue: ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"],
      cyan: ["#06b6d4", "#22d3ee", "#67e8f9", "#a5f3fc"],
      orange: ["#f97316", "#fb923c", "#fdba74", "#fed7aa"],
    },
    
    // Diverging schemes for performance indicators
    diverging: ["#8b5cf6", "#3b82f6", "#06b6d4", "#f97316", "#10b981"],
  },
  
  // Common chart options
  common: {
    title: {
      textStyle: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#374151",
      },
      left: "center",
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "#8b5cf6",
      borderWidth: 1,
      textStyle: {
        color: "#ffffff",
      },
    },
    legend: {
      textStyle: {
        color: "#6b7280",
      },
      bottom: 0,
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: "#d1d5db",
        },
      },
      axisLabel: {
        color: "#6b7280",
      },
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: "#d1d5db",
        },
      },
      axisLabel: {
        color: "#6b7280",
      },
      splitLine: {
        lineStyle: {
          color: "#f3f4f6",
        },
      },
    },
  },
  
  // Chart-specific configurations
  charts: {
    line: {
      symbol: "circle",
      symbolSize: 6,
      lineStyle: { width: 3 },
    },
    bar: {
      barWidth: "40%",
    },
    pie: {
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "16",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
    },
    area: {
      areaStyle: {
        opacity: 0.3,
      },
    },
  },
}

// Helper function to apply theme to chart options
export function applyChartTheme(options: any, colorScheme: string[] = chartTheme.schemes.default) {
  const themedOptions = { ...options }
  
  // Apply common theme
  if (themedOptions.title) {
    themedOptions.title = { ...chartTheme.common.title, ...themedOptions.title }
  }
  
  if (themedOptions.tooltip) {
    themedOptions.tooltip = { ...chartTheme.common.tooltip, ...themedOptions.tooltip }
  }
  
  if (themedOptions.legend) {
    themedOptions.legend = { ...chartTheme.common.legend, ...themedOptions.legend }
  }
  
  if (themedOptions.xAxis) {
    if (Array.isArray(themedOptions.xAxis)) {
      themedOptions.xAxis = themedOptions.xAxis.map((axis: any) => ({
        ...chartTheme.common.xAxis,
        ...axis,
      }))
    } else {
      themedOptions.xAxis = { ...chartTheme.common.xAxis, ...themedOptions.xAxis }
    }
  }
  
  if (themedOptions.yAxis) {
    if (Array.isArray(themedOptions.yAxis)) {
      themedOptions.yAxis = themedOptions.yAxis.map((axis: any) => ({
        ...chartTheme.common.yAxis,
        ...axis,
      }))
    } else {
      themedOptions.yAxis = { ...chartTheme.common.yAxis, ...themedOptions.yAxis }
    }
  }
  
  // Apply colors to series
  if (themedOptions.series && Array.isArray(themedOptions.series)) {
    themedOptions.series = themedOptions.series.map((series: any, index: number) => {
      const themedSeries = { ...series }
      
      // Apply chart-specific theme
      if (series.type && chartTheme.charts[series.type as keyof typeof chartTheme.charts]) {
        Object.assign(themedSeries, chartTheme.charts[series.type as keyof typeof chartTheme.charts])
      }
      
      // Special handling for pie charts - assign individual colors to each data item
      if (series.type === 'pie' && series.data && Array.isArray(series.data)) {
        themedSeries.data = series.data.map((item: any, dataIndex: number) => ({
          ...item,
          itemStyle: {
            color: colorScheme[dataIndex % colorScheme.length]
          }
        }))
      } else {
        // Apply colors to series for other chart types
        if (!themedSeries.itemStyle) {
          themedSeries.itemStyle = {}
        }
        
        if (!themedSeries.itemStyle.color) {
          themedSeries.itemStyle.color = colorScheme[index % colorScheme.length]
        }
        
        // Apply line color for line charts
        if (series.type === 'line' && !themedSeries.lineStyle) {
          themedSeries.lineStyle = {}
        }
        if (series.type === 'line' && !themedSeries.lineStyle.color) {
          themedSeries.lineStyle.color = colorScheme[index % colorScheme.length]
        }
        
        // Apply area color for area charts
        if (series.type === 'line' && series.areaStyle && !series.areaStyle.color) {
          const baseColor = colorScheme[index % colorScheme.length]
          themedSeries.areaStyle.color = {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${baseColor}4D` }, // 30% opacity
              { offset: 1, color: `${baseColor}1A` }, // 10% opacity
            ],
          }
        }
      }
      
      return themedSeries
    })
  }
  
  return themedOptions
} 