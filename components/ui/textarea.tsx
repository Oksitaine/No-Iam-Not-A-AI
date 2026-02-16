import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full border border-input bg-transparent shadow-none transition-colors hover:border-border-l2 focus-visible:border-foreground focus-visible:ring-[0.5px] focus-visible:ring-ring/50 focus-visible:ring-offset-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-xl px-control-px py-2 text-base md:text-sm placeholder:text-muted-foreground field-sizing-content min-h-16 outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
