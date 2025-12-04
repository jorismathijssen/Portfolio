"use client"

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ChangeEvent, useTransition } from 'react';

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
        defaultValue={locale}
        onChange={onSelectChange}
        disabled={isPending}
        className="appearance-none bg-transparent py-1 pl-2 pr-6 text-sm font-medium focus:outline-none cursor-pointer"
      >
        <option value="en">EN</option>
        <option value="nl">NL</option>
      </select>
      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs pointer-events-none">
        ▼
      </span>
    </div>
  );
}
