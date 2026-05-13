import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";
import { getHomepageData } from "@/lib/cms/api";

export const metadata: Metadata = {
  title: "Home",
  description: "Experience the next level of technology with Nexel. Premium, high-end electronics designed for the modern lifestyle.",
};

// ISR: Revalidate homepage every 2 minutes
export const revalidate = 120;

export default async function Home() {
  let heroSlides = [];
  let featuredSections = [];
  let heroProducts = [];
  let individualFeatured = [];

  try {
    // Fetch dynamic CMS content
    const data = await getHomepageData();
    heroSlides = data.heroSlides || [];
    featuredSections = data.featuredSections || [];
    heroProducts = data.heroProducts || [];
    individualFeatured = data.featuredProducts || [];
  } catch (error) {
    console.error("Homepage CMS fetch failed:", error);
    // Graceful fallback: continue with empty arrays, components will handle null states
  }

  // Find the first grid section for the 'Featured Products' area
  const mainFeaturedSection = featuredSections.find(s => s.styleVariant === 'grid') || featuredSections[0];

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Carousel with CMS Slides */}
      <Hero slides={heroSlides} />

      {/* Individual Featured Products (Flagged with featured=true) */}
      {individualFeatured.length > 0 && (
        <FeaturedProducts 
          title="Featured Products"
          products={individualFeatured}
        />
      )}

      {/* Dynamic Featured Products Area (From Featured Sections) */}
      {mainFeaturedSection && (
        <FeaturedProducts 
          title={mainFeaturedSection.title}
          products={mainFeaturedSection.products}
        />
      )}

      {/* Additional Featured Sections (if any) */}
      {featuredSections.filter(s => s.id !== mainFeaturedSection?.id).map(section => (
        <FeaturedProducts 
          key={section.id}
          title={section.title}
          products={section.products}
        />
      ))}

      <Footer />
    </main>
  );
}
