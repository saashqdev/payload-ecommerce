"use client";

import {
  spacingTopClasses,
  spacingBottomClasses,
  paddingBottomClasses,
  paddingTopClasses,
} from "@/blocks/globals";
import RichText from "@/components/RichText";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/utilities/cn";

import type { AccordionBlock as AccordionBlockProps } from "@/payload-types";

export const AccordionBlock = ({
  spacingBottom,
  spacingTop,
  title,
  items,
  paddingBottom,
  paddingTop,
}: AccordionBlockProps) => {
  return (
    <section
      className={cn(
        "container",
        spacingTopClasses[spacingTop ?? "medium"],
        spacingBottomClasses[spacingBottom ?? "medium"],
        paddingTopClasses[paddingTop ?? "medium"],
        paddingBottomClasses[paddingBottom ?? "medium"],
      )}
    >
      {title && <RichText data={title} className="mb-6" />}
      <Accordion type="single" collapsible>
        {items.map((item, index) => (
          <AccordionItem key={item.id ?? index} value={item.id ?? index.toString()}>
            <AccordionTrigger className="text-base">{item.title}</AccordionTrigger>
            <AccordionContent>
              <RichText data={item.content} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
