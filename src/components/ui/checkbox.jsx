import React from "react";

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className="h-4 w-4 rounded border border-input bg-background shadow-sm focus:ring-ring"
      {...props}
    />
  );
});
