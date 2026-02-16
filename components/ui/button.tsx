import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border border-transparent bg-clip-padding transition-colors duration-100 disabled:opacity-60 disabled:cursor-not-allowed [&_svg:not([class*='size-'])]:size-icon [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 disabled:hover:bg-primary",
        outline: "border-border text-primary hover:bg-accent disabled:hover:bg-transparent aria-expanded:bg-accent",
        secondary: "border-primary/10 text-primary hover:bg-accent disabled:hover:bg-transparent aria-expanded:bg-accent",
        ghost: "text-primary hover:bg-accent disabled:hover:bg-transparent aria-expanded:bg-accent",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 disabled:hover:bg-destructive/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      radius: {
        full: "rounded-full",
        xl: "rounded-xl",
        lg: "rounded-lg",
        md: "rounded-md",
        sm: "rounded-sm",
        none: "rounded-none",
      },
      size: {
        default: "h-cta-height gap-cta-gap px-cta-px in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-cta-icon-px-adj has-data-[icon=inline-start]:pl-cta-icon-px-adj",
        xs: "h-cta-xs-height gap-cta-xs-gap px-cta-xs-px text-[12px] in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-cta-xs-icon-px-adj has-data-[icon=inline-start]:pl-cta-xs-icon-px-adj [&_svg:not([class*='size-'])]:size-icon-xs",
        sm: "h-cta-sm-height gap-cta-sm-gap px-cta-sm-px in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-cta-sm-icon-px-adj has-data-[icon=inline-start]:pl-cta-sm-icon-px-adj",
        lg: "h-cta-lg-height gap-cta-lg-gap px-cta-lg-px py-2 has-data-[icon=inline-end]:pr-cta-lg-icon-px-adj has-data-[icon=inline-start]:pl-cta-lg-icon-px-adj",
        icon: "size-cta-icon",
        "icon-xs": "size-cta-icon-xs in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-icon-xs",
        "icon-sm": "size-cta-icon-sm in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-cta-icon-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "full",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  radius = "full",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-radius={radius}
      className={cn(buttonVariants({ variant, size, radius, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
