import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-['Lato'] font-semibold transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#97144D]/30",
  {
    variants: {
      variant: {
        default: "bg-[#97144D] text-white hover:bg-[#7d1041] active:bg-[#661234] shadow-sm hover:shadow-md",
        destructive:
          "bg-[#d4183d] text-white hover:bg-[#b81633] active:bg-[#9c142a] focus-visible:ring-[#d4183d]/30 shadow-sm hover:shadow-md",
        outline:
          "bg-transparent border border-[#97144D] text-[#97144D] hover:bg-[#97144D] hover:text-white active:bg-[#7d1041] focus-visible:ring-[#97144D]/30",
        secondary:
          "bg-[#ED1164] text-white hover:bg-[#C70D53] active:bg-[#A80A45] shadow-sm hover:shadow-md",
        ghost:
          "bg-transparent text-[#97144D] hover:bg-[#97144D]/10 active:bg-[#97144D]/20 focus-visible:ring-[#97144D]/30",
        link: "bg-transparent text-[#97144D] hover:text-[#7d1041] hover:underline focus-visible:ring-[#97144D]/30 focus-visible:ring-offset-0 p-0 shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm min-h-[40px]",
        sm: "h-8 px-3 py-1.5 text-sm min-h-[32px]",
        lg: "h-12 px-6 py-3 text-base min-h-[48px]",
        icon: "size-10 min-h-[40px] min-w-[40px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      style={{ fontStyle: "normal" }}
      {...props}
    />
  );
}

export { Button, buttonVariants };