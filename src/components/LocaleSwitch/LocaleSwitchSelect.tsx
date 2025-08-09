"use client";

import { useParams, useSearchParams } from "next/navigation";
import { type ReactNode, useTransition } from "react";

import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Locale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export function LocaleSwitchSelect({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  async function onSelectChange(locale: Locale) {
    startTransition(() => {
      const query = {
        ...Object.fromEntries(searchParams.entries()),
      };

      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params, query },
        { scroll: false, locale },
      );
    });
  }

  return (
    <Select value={defaultValue} disabled={isPending} onValueChange={onSelectChange}>
      <SelectTrigger
        aria-label="Select a theme"
        className="w-auto gap-2 border-none bg-transparent pl-0 md:pl-3"
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}
