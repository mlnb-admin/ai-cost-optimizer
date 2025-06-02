import * as React from "react";
import { cn } from "../../utils/cn.js";

// Chart Container Component
const ChartContainer = React.forwardRef(({ className, config, children, ...props }, ref) => {
  const cssVars = React.useMemo(() => {
    const vars = {};
    if (config) {
      Object.entries(config).forEach(([key, value]) => {
        if (value.color) {
          vars[`--color-${key}`] = value.color;
        }
      });
    }
    return vars;
  }, [config]);

  return (
    <div
      ref={ref}
      className={cn("flex aspect-video justify-center text-xs", className)}
      style={cssVars}
      {...props}
    >
      {children}
    </div>
  );
});
ChartContainer.displayName = "ChartContainer";

// Chart Tooltip Component
const ChartTooltip = ({ cursor, content, ...props }) => {
  return <div {...props}>{content}</div>;
};

// Chart Tooltip Content Component
const ChartTooltipContent = React.forwardRef(({ 
  active, 
  payload, 
  label, 
  hideLabel = false,
  className,
  ...props 
}, ref) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-background p-2 shadow-md",
        "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    >
      {!hideLabel && label && (
        <div className="font-medium text-foreground">{label}</div>
      )}
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-sm"
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
}; 