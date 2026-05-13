"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu as MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { MENU_DATA } from "@/lib/menuData";
import { AnimatePresence, motion } from "framer-motion";
import { NavbarSection, Product } from "@/lib/cms/types";

interface HeaderClientProps {
  navbarSections: NavbarSection[];
}

export function HeaderClient({ navbarSections }: HeaderClientProps) {
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
    const section = navbarSections.find(s => s.title === category);
    if (section) {
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

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<(Product & { imageUrl: string })[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const { searchProducts, getMediaURL } = await import("@/lib/cms/api");
        const products = await searchProducts(searchQuery);
        setSearchResults(products.map(p => {
          let imageUrl = '';
          if (Array.isArray(p.images) && p.images[0]?.url) {
            imageUrl = getMediaURL(p.images[0].url);
          } else if (p.images && (p.images as any).url) {
            imageUrl = getMediaURL((p.images as any).url);
          }
          return {
            ...p,
            imageUrl
          };
        }));
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleMenuEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[55px] flex items-center",
          scrolled || activeCategory || isMobileMenuOpen || isSearchOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 relative z-50 shrink-0"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(false);
            }}
          >
            <Image
              src="/logo.svg"
              alt="Nexel"
              width={120}
              height={40}
              priority
              className="mix-blend-multiply"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          {!isSearchOpen && (
            <nav
              className="hidden md:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 -translate-x-1/2"
              onMouseLeave={handleMouseLeave}
            >
              {navbarSections.map((section) => (
                <div
                  key={section.id}
                  className="py-2"
                  onMouseEnter={() => handleMouseEnter(section.title)}
                >
                  <Link
                    href={section.category ? `/category/${section.category.slug}` : "#"}
                    className={`text-[16px] font-medium transition-colors relative group py-2 ${
                      activeCategory === section.title
                        ? "text-[#043927]"
                        : "text-gray-800 hover:text-[#043927]"
                    }`}
                  >
                    {section.title}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-[2px] bg-[#043927] transition-all duration-300",
                        activeCategory === section.title ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                </div>
              ))}
            </nav>
          )}

          {/* Search Bar - Replaces Nav when open */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%", maxWidth: "600px" }}
                exit={{ opacity: 0, width: 0 }}
                className="absolute left-1/2 -translate-x-1/2 flex items-center px-4"
                ref={searchRef}
              >
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#043927] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {/* Search Results Dropdown */}
                  <AnimatePresence>
                    {(searchResults.length > 0 || isSearching) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[60] min-w-[320px]"
                      >
                        <div className="p-2">
                          {isSearching ? (
                            <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
                          ) : (
                            <div className="max-h-[400px] overflow-y-auto">
                              {searchResults.map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/product/${product.slug}`}
                                  onClick={() => setIsSearchOpen(false)}
                                  className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                                >
                                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
                                    {product.imageUrl && (
                                      <Image
                                        src={product.imageUrl}
                                        alt={product.title}
                                        fill
                                        unoptimized={true}
                                        className="object-contain p-1"
                                      />
                                    )}
                                  </div>
                                  <div className="ml-3 overflow-hidden">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#043927]">
                                      {product.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 truncate">
                                      {product.category?.name || "Product"}
                                    </p>
                                  </div>
                                  <div className="ml-auto text-sm font-bold text-gray-900">
                                    ${product.price}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Section */}
          <div className="flex items-center shrink-0 space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={cn(
                "p-2 rounded-full transition-all duration-300",
                isSearchOpen ? "bg-gray-100 text-black" : "text-gray-600 hover:text-black hover:bg-gray-50"
              )}
              aria-label="Search"
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-800 p-2"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsSearchOpen(false);
              }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <MegaMenu
          activeCategory={activeCategory}
          navbarSections={navbarSections}
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
                {navbarSections.map((section) => (
                  <div key={section.id} className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() =>
                        setMobileExpandedCat(
                          mobileExpandedCat === section.title ? null : section.title
                        )
                      }
                      className="flex items-center justify-between w-full py-3 text-lg font-medium text-gray-800"
                    >
                      {section.title}
                      <span className="text-gray-400">
                        {mobileExpandedCat === section.title ? "−" : "+"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {mobileExpandedCat === section.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="py-2 pl-4 space-y-3">
                            {section.featuredProducts?.map((product) => (
                              <li key={product.id}>
                                <Link
                                  href={`/product/${product.slug}`}
                                  className="text-gray-600 hover:text-[#043927] text-sm font-medium"
                                >
                                  {product.title}
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
                style={{ top: "55px", zIndex: 30 }}


              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
