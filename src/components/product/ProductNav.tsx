"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

type ProductNavMode = "default" | "product";
type ProductNavSection = "details" | "payments" | "shipping";

const DEFAULT_NAV_LINKS = ["Shop", "About", "Blog", "Account", "Bag"];
export function ProductNav({ mode = "default" }: { mode?: ProductNavMode }) {
  const { t } = useLanguage();

  const PRODUCT_NAV_LINKS: Array<{ label: string; value: ProductNavSection }> = [
    { label: t("details"), value: "details" },
    { label: t("payments"), value: "payments" },
    { label: t("shipping"), value: "shipping" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-base font-bruno font-semibold tracking-tight text-gray-900 hover:opacity-70 transition-opacity"
        >
          Nexel
        </Link>

        {/* Nav links */}
        {mode === "product" ? (
          <>
            <ul className="hidden sm:flex items-center gap-5 md:gap-8">
              {PRODUCT_NAV_LINKS.map((item) => (
                <li key={item.value}>
                  <Link
                    href={`#${item.value}`}
                    className="relative text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                  >
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="sm:hidden flex items-center gap-5">
              {PRODUCT_NAV_LINKS.map((item) => (
                <Link
                  key={item.value}
                  href={`#${item.value}`}
                  className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            <ul className="hidden sm:flex items-center gap-5 md:gap-8">
              {DEFAULT_NAV_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href={link === "Shop" ? "/" : "#"}
                    className="relative text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                  >
                    {link}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/"
              className="sm:hidden text-xs font-semibold uppercase tracking-[0.24em] text-gray-500"
            >
              Shop
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
