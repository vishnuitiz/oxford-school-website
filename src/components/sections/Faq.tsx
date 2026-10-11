"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-sand border-y border-sand">
      {items.map((item) => (
        <Accordion.Item key={item.q} value={item.q}>
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-serif text-[1.3rem] leading-snug text-ink transition-colors hover:text-accent">
              {item.q}
              <Plus
                aria-hidden="true"
                className="size-5 shrink-0 text-accent transition-transform duration-300 group-data-[state=open]:rotate-45"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[acc-up_250ms_ease-out] data-[state=open]:animate-[acc-down_300ms_ease-out]">
            <p className="max-w-2xl pb-7 text-muted">{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
