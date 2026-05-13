import { getNavbarSections } from "@/lib/cms/api";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  let navbarSections = [];
  try {
    navbarSections = await getNavbarSections();
    console.log("Navbar Sections fetched:", navbarSections.length);
  } catch (error) {
    console.error("Header CMS fetch failed:", error);
    // Fallback to empty array, HeaderClient will handle it
  }
  return <HeaderClient navbarSections={navbarSections} />;
}

