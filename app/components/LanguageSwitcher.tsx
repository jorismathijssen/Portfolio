"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  const isDutch = i18n.language === 'nl';
  return (
    <button
      data-id="languageSwitcher"
      onClick={() => {
        const newLang = isDutch ? 'en' : 'nl';
        i18n.changeLanguage(newLang);
      }}
      aria-label={isDutch ? 'Switch to English' : 'Wissel naar Nederlands'}
      className="fixed top-4 right-20 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-lg tracking-wide transition text-gray-800 dark:text-gray-200 font-[family-name:var(--font-geist-sans)]"
      type="button"
    >
      <span className="sr-only">{isDutch ? 'Switch to English' : 'Wissel naar Nederlands'}</span>
      {isDutch ? 'EN' : 'NL'}
    </button>
  );
}
