import React from 'react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart.jsx";
import { Clock, Users, Zap, AlertTriangle } from 'lucide-react';

const ImplementationComplexityChart = ({ 
  complexityData, 
  className = "",
  size = "medium" // small, medium, large
}) => {
  // Extract complexity score from data
  const complexityScore = complexityData?.overallComplexity === 'Low' ? 30 : 
                         complexityData?.overallComplexity === 'Medium' ? 60 : 90;
  
  // Create data for the main complexity score
  const chartData = [
    {
      name: "complexity",
      value: complexityScore,
      fill: complexityScore < 40 ? "#10B981" : complexityScore < 70 ? "#F59E0B" : "#EF4444"
    }
  ];

  // Sub-metrics data for progress bars
  const subMetrics = [
    {
      name: "integration",
      value: Math.min((complexityData?.integrationEffort || 4) * 10, 100),
      fill: "#3B82F6",
      label: "Integration Effort"
    },
    {
      name: "timeline", 
      value: Math.min((complexityData?.timelineMonths || 6) * 8, 100),
      fill: "#8B5CF6",
      label: "Timeline Impact"
    },
    {
      name: "resources",
      value: Math.min((complexityData?.resourcesRequired || 5) * 12, 100),
      fill: "#F59E0B",
      label: "Resource Requirements"
    }
  ];

  // Size configurations
  const sizeConfig = {
    small: { width: 200, height: 200, innerRadius: 40, outerRadius: 70 },
    medium: { width: 300, height: 300, innerRadius: 60, outerRadius: 100 },
    large: { width: 400, height: 400, innerRadius: 80, outerRadius: 130 }
  };

  const config = sizeConfig[size];

  const chartConfig = {
    complexity: {
      label: "Complexity Score",
      color: chartData[0].fill,
    },
  };

  // Complexity level text and icon
  const getComplexityLevel = (score) => {
    if (score < 40) return { level: "Low", icon: Zap, color: "text-green-600" };
    if (score < 70) return { level: "Medium", icon: Clock, color: "text-yellow-600" };
    return { level: "High", icon: AlertTriangle, color: "text-red-600" };
  };

  const complexityLevel = getComplexityLevel(complexityScore);
  const IconComponent = complexityLevel.icon;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Radial Chart */}
      <div className="flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="aspect-square"
          style={{ width: `${config.width}px`, height: `${config.height}px` }}
        >
          <RadialBarChart
            width={config.width}
            height={config.height}
            data={chartData}
            startAngle={90}
            endAngle={450}
            innerRadius={config.innerRadius}
            outerRadius={config.outerRadius}
          >
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
                      <p className="font-medium">Complexity Score</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Score: {data.value}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <g>
                        <circle
                          cx={viewBox.cx}
                          cy={viewBox.cy}
                          r={config.innerRadius - 5}
                          fill="transparent"
                          className="stroke-gray-200 dark:stroke-gray-700"
                          strokeWidth={1}
                          strokeDasharray="2,2"
                        />
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 15}
                            className="fill-gray-900 dark:fill-white text-3xl font-bold"
                          >
                            {complexityScore}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 5}
                            className="fill-gray-600 dark:fill-gray-300 text-sm"
                          >
                            Complexity
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className={`text-sm font-medium fill-current ${complexityLevel.color}`}
                          >
                            {complexityLevel.level}
                          </tspan>
                        </text>
                      </g>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            
            <RadialBar
              dataKey="value"
              cornerRadius={8}
              fill="var(--color-complexity)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </div>

      {/* Complexity Level Indicator */}
      <div className="flex items-center justify-center space-x-2">
        <IconComponent className={`h-5 w-5 ${complexityLevel.color}`} />
        <span className={`font-medium ${complexityLevel.color}`}>
          {complexityLevel.level} Complexity
        </span>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300 flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Integration Effort:</span>
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {complexityData?.integrationEffort || 0} weeks
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300 flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Resources:</span>
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {complexityData?.resourcesRequired || 0} FTE
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Timeline:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {complexityData?.timelineEstimate || 'TBD'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Risk Level:</span>
            <span className={`font-medium px-2 py-1 rounded-full text-xs ${
              complexityScore < 40 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : complexityScore < 70
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {complexityLevel.level}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bars for Sub-metrics */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Complexity Breakdown</h4>
        {subMetrics.map((metric, index) => (
          <div key={metric.name} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-300">
                {metric.label}
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {metric.value}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${metric.value}%`,
                  backgroundColor: metric.fill 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImplementationComplexityChart; 