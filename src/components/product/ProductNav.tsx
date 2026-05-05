import Link from "next/link";

const NAV_LINKS = ["Shop", "About", "Blog", "Account", "Bag"];

export function ProductNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-gray-900 hover:opacity-70 transition-opacity"
        >
          Nexel
        </Link>

        {/* Nav links */}
        <ul className="hidden sm:flex items-center gap-5 md:gap-8">
          {NAV_LINKS.map((link) => (
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
      </div>
    </nav>
  );
}
