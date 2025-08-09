import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "src/utilities/cn";

const buttonVariants = cva(
  "twp inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        clear: "",
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
        lg: "h-11 rounded px-8",
        sm: "h-9 rounded px-3",
      },
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "hover:bg-card hover:text-accent-foreground",
        link: "text-primary items-start justify-start underline-offset-4 hover:underline",
        outline: "border border-border bg-background hover:bg-card hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        tailwind:
          "flex w-full justify-center rounded-md bg-main-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-main-500 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600",
        tailwindOutline:
          "flex w-full justify-center rounded-md border-main-600 border px-3 bg-white py-1.5 text-sm/6 font-semibold text-main-600 shadow-xs hover:bg-gray-50 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600",
      },
    },
  },
);

export type ButtonProps = {
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
