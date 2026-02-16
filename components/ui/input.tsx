import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full border border-input bg-transparent shadow-none transition-colors hover:border-border-l2 focus-visible:border-foreground focus-visible:ring-[0.5px] focus-visible:ring-ring/50 focus-visible:ring-offset-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-control-height rounded-xl px-control-px py-1 text-base md:text-sm file:h-7 file:text-sm file:font-medium file:text-foreground file:inline-flex file:border-0 file:bg-transparent placeholder:text-muted-foreground min-w-0 outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
