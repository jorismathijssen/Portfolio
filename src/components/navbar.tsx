"use client"

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { useViewMode } from '@/context/view-mode-context';
import { Code, LayoutTemplate, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from '@/context/command-palette-context';

export function Navbar() {
  const t = useTranslations('HomePage');
  const { isApiMode, toggleApiMode } = useViewMode();
  const { toggle: toggleCommandPalette } = useCommandPalette();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
            onClick={toggleCommandPalette}
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors hidden md:block"
            aria-label="Search (Cmd+K)"
            title="Search (Cmd+K)"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={toggleApiMode}
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors hidden md:block"
            aria-label="Toggle API View"
            title="Toggle API View"
          >
            {isApiMode ? <LayoutTemplate className="h-5 w-5" /> : <Code className="h-5 w-5" />}
          </button>
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2" 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border/40 bg-background"
          >
            <div className="container px-4 py-4 space-y-4 flex flex-col">
              <Link href="#about" onClick={toggleMenu} className="text-sm font-medium py-2">
                {t('about')}
              </Link>
              <Link href="#work" onClick={toggleMenu} className="text-sm font-medium py-2">
                {t('work')}
              </Link>
              <Link href="#contact" onClick={toggleMenu} className="text-sm font-medium py-2">
                {t('contact')}
              </Link>
              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <button
                  onClick={() => { toggleApiMode(); toggleMenu(); }}
                  className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 text-sm"
                >
                  {isApiMode ? <LayoutTemplate className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                  <span>API View</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
