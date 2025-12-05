"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { ChangeEvent, useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={onSelectChange}
        disabled={isPending}
        aria-label="Select language"
        className="cursor-pointer appearance-none bg-transparent py-1 pr-6 pl-2 text-sm font-medium focus:outline-none"
      >
        <option value="en">EN</option>
        <option value="nl">NL</option>
      </select>
      <span className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-xs">
        ▼
      </span>
    </div>
  );
}
