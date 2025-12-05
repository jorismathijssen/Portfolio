"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { useViewMode } from "@/context/view-mode-context";
import { Code, LayoutTemplate, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommandPalette } from "@/context/command-palette-context";

export function Navbar() {
  const t = useTranslations("HomePage");
  const { isApiMode, toggleApiMode } = useViewMode();
  const { toggle: toggleCommandPalette } = useCommandPalette();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-mono text-lg font-bold tracking-tight">
            JM<span className="text-primary">.</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link
              href="#about"
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              {t("about")}
            </Link>
            <Link
              href="#work"
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              {t("work")}
            </Link>
            <Link
              href="#contact"
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              {t("contact")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCommandPalette}
            className="hover:bg-accent hover:text-accent-foreground hidden rounded-md p-2 transition-colors md:block"
            aria-label="Search (Cmd+K)"
            title="Search (Cmd+K)"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={toggleApiMode}
            className="hover:bg-accent hover:text-accent-foreground hidden rounded-md p-2 transition-colors md:block"
            aria-label="Toggle API View"
            title="Toggle API View"
          >
            {isApiMode ? (
              <LayoutTemplate className="h-5 w-5" />
            ) : (
              <Code className="h-5 w-5" />
            )}
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="p-2 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
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
            className="border-border/40 bg-background border-b md:hidden"
          >
            <div className="container flex flex-col space-y-4 px-4 py-4">
              <Link
                href="#about"
                onClick={toggleMenu}
                className="py-2 text-sm font-medium"
              >
                {t("about")}
              </Link>
              <Link
                href="#work"
                onClick={toggleMenu}
                className="py-2 text-sm font-medium"
              >
                {t("work")}
              </Link>
              <Link
                href="#contact"
                onClick={toggleMenu}
                className="py-2 text-sm font-medium"
              >
                {t("contact")}
              </Link>
              <div className="border-border/40 flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <button
                  onClick={() => {
                    toggleApiMode();
                    toggleMenu();
                  }}
                  className="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md p-2 text-sm transition-colors"
                >
                  {isApiMode ? (
                    <LayoutTemplate className="h-4 w-4" />
                  ) : (
                    <Code className="h-4 w-4" />
                  )}
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
