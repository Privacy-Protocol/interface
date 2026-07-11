"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group/accordion-item relative bg-card/30 transition-colors duration-300 hover:bg-card/40",
        className
      )}
      {...props}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute -top-2 left-5 text-lg text-muted-primary">
          ___
        </span>
        <span className="absolute inset-x-0 top-0 h-px bg-muted-primary/50" />
        <span className="absolute inset-x-0 bottom-0 h-px bg-muted-primary/50" />
        <span className="absolute inset-y-0 left-0 w-px bg-muted-primary/50" />
        <span className="absolute inset-y-0 right-0 w-px bg-muted-primary/50" />

        <span className="absolute top-0 -left-1 h-px w-2 bg-muted-primary" />
        <span className="absolute top-0 -right-1 h-px w-2 bg-muted-primary" />
        <span className="absolute bottom-0 -left-1 h-px w-2 bg-muted-primary" />
        <span className="absolute -right-1 bottom-0 h-px w-2 bg-muted-primary" />

        <span className="absolute -top-1 left-0 h-2 w-px bg-muted-primary" />
        <span className="absolute -top-1 right-0 h-2 w-px bg-muted-primary" />
        <span className="absolute -bottom-1 left-0 h-2 w-px bg-muted-primary" />
        <span className="absolute right-0 -bottom-1 h-2 w-px bg-muted-primary" />
      </div>

      {children}
    </AccordionPrimitive.Item>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between gap-4 rounded-none border border-transparent px-5 py-5 text-left text-sm font-medium text-foreground transition-all outline-none hover:text-primary focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:mt-0.5 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-primary sm:px-6",
          className
        )}
        {...props}
      >
        {children}
        <CaretDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <CaretUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) px-5 pt-0 pb-5 leading-relaxed text-foreground/90 sm:px-6 sm:pb-6 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
