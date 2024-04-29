import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[136px] w-full rounded-md border-2 border-[#FAC0D3] bg-transparent px-3 py-2 text-xl leading-6 shadow-sm placeholder:text-primary1-blue placeholder:text-xl placeholder:leading-6 placeholder:raleway-regular focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FAC0D3] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
