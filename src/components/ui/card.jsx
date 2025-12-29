import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
    const variants = {
        default: "border border-white/30 bg-black text-white",
        terminal: "border-2 border-white bg-black text-white font-mono",
        ghost: "border border-white/10 bg-white/5 text-white hover:border-white/30 transition-all",
    }

    return (
        <div
            ref={ref}
            className={cn(variants[variant], className)}
            {...props}
        />
    )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-xl font-bold leading-none tracking-tight uppercase",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-white/60", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
