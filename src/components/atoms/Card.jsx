import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  hover = false,
  children,
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-lg shadow-card border border-slate-200";
  
  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        hover && "card-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;