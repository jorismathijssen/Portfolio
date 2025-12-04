"use client"

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { useViewMode } from '@/context/view-mode-context';
import { Code, LayoutTemplate } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('HomePage');
  const { isApiMode, toggleApiMode } = useViewMode();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold font-mono text-lg tracking-tight">
            JM<span className="text-primary">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#about" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t('about')}
            </Link>
            <Link href="#work" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t('work')}
            </Link>
            <Link href="#contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t('contact')}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleApiMode}
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle API View"
            title="Toggle API View"
          >
            {isApiMode ? <LayoutTemplate className="h-5 w-5" /> : <Code className="h-5 w-5" />}
          </button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
