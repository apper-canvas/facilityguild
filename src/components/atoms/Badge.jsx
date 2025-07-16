import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default", 
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const variants = {
    default: "bg-slate-100 text-slate-800",
    success: "status-completed",
    warning: "status-in-progress",
    error: "priority-high",
    info: "status-new",
    secondary: "bg-slate-100 text-slate-600",
    // Priority variants
    "priority-high": "priority-high",
    "priority-medium": "priority-medium",
    "priority-low": "priority-low",
    // Status variants
    "status-new": "status-new",
    "status-in-progress": "status-in-progress",
    "status-completed": "status-completed",
    "status-on-hold": "status-on-hold"
  };
  
  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;