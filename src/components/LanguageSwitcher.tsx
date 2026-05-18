"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  const options: { value: Locale; label: string }[] = [
    { value: "uz", label: "UZ" },
    { value: "ru", label: "RU" },
  ];

  return (
    <div
      className={cn(
        "flex items-center rounded-full bg-gray-100 p-0.5 gap-0.5",
        className
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLocale(opt.value)}
          className={cn(
            "text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full transition-all duration-200",
            locale === opt.value
              ? "bg-[#043927] text-white shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          )}
          aria-label={`Switch language to ${opt.label}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
