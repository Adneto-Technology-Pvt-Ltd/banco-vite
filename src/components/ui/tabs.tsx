"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-gray-100 text-gray-700 inline-flex h-auto w-full sm:w-fit items-center justify-center rounded-lg p-1",
        "flex-wrap sm:flex-nowrap gap-1 sm:gap-0",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
         "inline-flex h-auto min-h-[36px] sm:min-h-[36px] items-center justify-center gap-1.5 rounded-md border border-transparent px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ease-in-out",
        "text-center whitespace-normal sm:whitespace-nowrap",
        "flex-1 min-w-0 sm:min-w-fit",
        "leading-tight sm:leading-normal",
        "text-gray-700 bg-transparent hover:bg-white hover:text-gray-900 hover:border-gray-200",
        "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-gray-300 data-[state=active]:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#97144D]/30 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      style={{ fontStyle: "normal" }}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };