"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Search, Menu as MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { MENU_DATA } from "@/lib/menuData";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (category: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (MENU_DATA[category]) {
      setActiveCategory(category);
    } else {
      setActiveCategory(null);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 200);
  };

  const handleMenuEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || activeCategory || isMobileMenuOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
            : "bg-white border-b border-gray-100 py-4"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 relative z-50 shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-2xl font-bold tracking-[3px] text-gray-900">NEXEL</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav
            className="hidden md:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 -translate-x-1/2"
            onMouseLeave={handleMouseLeave}
          >
            {Object.keys(MENU_DATA).map((item) => (
              <div
                key={item}
                className="py-2"
                onMouseEnter={() => handleMouseEnter(item)}
              >
                <Link
                  href="#"
                  className={`text-[16px] font-medium transition-colors relative group py-2 ${
                    activeCategory === item
                      ? "text-[#043927]"
                      : "text-gray-800 hover:text-[#043927]"
                  }`}
                >
                  {item}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-[2px] bg-[#043927] transition-all duration-300",
                      activeCategory === item ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center shrink-0">
            <div className="flex items-center space-x-4">
              <button
                className="text-gray-600 hover:text-black hover:scale-110 transition-all"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 relative z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mega Menu */}
        <MegaMenu
          activeCategory={activeCategory}
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg h-[calc(100vh-64px)] overflow-y-auto"
            >
              <div className="flex flex-col p-4 space-y-2">
                {Object.keys(MENU_DATA).map((item) => (
                  <div key={item} className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() =>
                        setMobileExpandedCat(
                          mobileExpandedCat === item ? null : item
                        )
                      }
                      className="flex items-center justify-between w-full py-3 text-lg font-medium text-gray-800"
                    >
                      {item}
                      <span className="text-gray-400">
                        {mobileExpandedCat === item ? "−" : "+"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {mobileExpandedCat === item && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="py-2 pl-4 space-y-3">
                            {MENU_DATA[item].subCategories.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  href="#"
                                  className="text-gray-600 hover:text-[#043927] text-sm font-medium"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Portal-based blur overlay
          Rendered directly on document.body — this is the key fix.
          backdrop-filter only blurs content BEHIND this element in the same
          stacking context. By escaping the header's stacking context via portal,
          backdrop-filter now correctly blurs the page content below the mega menu. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeCategory && (
              <motion.div
                key="page-blur-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed left-0 right-0 bottom-0 bg-black/10 backdrop-blur-md pointer-events-none"
                style={{ top: "64px", zIndex: 30 }}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
