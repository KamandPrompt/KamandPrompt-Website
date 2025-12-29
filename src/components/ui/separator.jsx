import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef(
    ({ className, orientation = "horizontal", decorative = true, variant = "default", ...props }, ref) => {
        const variants = {
            default: "bg-border",
            gradient: "bg-gradient-to-r from-transparent via-white/20 to-transparent",
            glow: "bg-primary/50 shadow-[0_0_10px_rgba(139,92,246,0.3)]",
        }

        return (
            <SeparatorPrimitive.Root
                ref={ref}
                decorative={decorative}
                orientation={orientation}
                className={cn(
                    "shrink-0",
                    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                    variants[variant],
                    className
                )}
                {...props}
            />
        )
    }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
