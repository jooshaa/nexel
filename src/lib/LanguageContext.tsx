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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("uz");

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
    window.location.reload(); // Reload so Server Components refetch with new locale
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
