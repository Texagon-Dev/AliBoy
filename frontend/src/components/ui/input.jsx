import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, icon, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {icon}
        </span>
      )}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#FAC0D3]  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary1-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAC0D3] focus-visible:border-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
