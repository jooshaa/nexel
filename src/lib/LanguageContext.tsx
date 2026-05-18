"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, translations, TranslationKey } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "uz",
  setLocale: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || "uz");

  useEffect(() => {
    const saved = localStorage.getItem("nexel-locale") as Locale | null;
    if (saved === "uz" || saved === "ru") {
      setLocaleState(saved);
      document.cookie = `NEXT_LOCALE=${saved}; path=/; max-age=31536000`;
    } else {
      document.cookie = `NEXT_LOCALE=uz; path=/; max-age=31536000`;
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("nexel-locale", newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Update URL to the new locale
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const locales = ['uz', 'ru'];
    
    if (locales.includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    
    window.location.pathname = segments.join('/');
  };

  const t = (key: TranslationKey): string => {
    return translations[locale][key] ?? translations["uz"][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
