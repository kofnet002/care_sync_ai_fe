import * as React from "react";

import { cn } from "@/app/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex w-full min-w-0 bg-white dark:bg-gray-900",
        // Text and spacing
        "px-4 py-3 text-base md:text-sm",
        // Border and rounding
        "border border-gray-200 dark:border-gray-700 rounded-xl",
        // Placeholder
        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
        // Focus states
        "focus:outline-none focus:ring-1 focus:ring-[#3e888c] focus:border-[#3e888c]",
        // Transitions
        "transition-all duration-200 ease-in-out",
        // Selection
        "selection:bg-[#3e888c]/10 selection:text-[#3e888c]",
        // Disabled state
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-800",
        // Invalid state
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        // Shadow
        // "shadow-sm hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}

export { Input };
