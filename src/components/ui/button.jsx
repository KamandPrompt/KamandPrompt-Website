import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-wider ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-mono",
    {
        variants: {
            variant: {
                default:
                    "bg-white text-black border-2 border-white hover:bg-black hover:text-white",
                destructive:
                    "bg-white text-black border-2 border-white hover:bg-black hover:text-white",
                outline:
                    "border-2 border-white/50 bg-transparent text-white hover:bg-white hover:text-black",
                secondary:
                    "bg-white/10 text-white border border-white/30 hover:bg-white/20",
                ghost: "hover:bg-white/10 text-white",
                link: "text-white underline-offset-4 hover:underline",
                terminal:
                    "bg-black text-white border-2 border-white hover:bg-white hover:text-black",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-9 px-4",
                lg: "h-12 px-8 text-base",
                xl: "h-14 px-10 text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
