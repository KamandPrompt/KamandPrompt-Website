import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center border px-3 py-1 text-xs font-bold uppercase tracking-wider font-mono transition-colors",
    {
        variants: {
            variant: {
                default:
                    "border-white bg-white text-black",
                secondary:
                    "border-white/50 bg-transparent text-white",
                outline:
                    "border-white/30 bg-transparent text-white hover:border-white",
                terminal:
                    "border-white bg-black text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function Badge({ className, variant, ...props }) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
