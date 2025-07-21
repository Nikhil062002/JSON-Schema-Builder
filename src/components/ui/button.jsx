import React from "react";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-primary/90 focus:outline-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
