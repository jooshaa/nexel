export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductData = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  images: string[];
  colors: ProductColor[];
  description: string;
  details: string[];
  paymentOptions: string[];
  shipping: string[];
  relatedProducts: RelatedProduct[];
};

export type RelatedProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export const PRODUCTS: Record<string, ProductData> = {
  "d1": {
    id: "d1",
    name: "Nexel Aura Pro",
    subtitle: "Professional Hair Care",
    price: 399,
    images: ["/pictures/dryer_premium.png", "/pictures/dyson_hero.png"],
    colors: [{ name: "Matte Grey", hex: "#333333" }, { name: "Copper", hex: "#b87333" }],
    description: "The Nexel Aura Pro redefines hair drying. With high-speed ionic technology and intelligent heat control, it delivers professional results while protecting your hair's natural shine.",
    details: ["High-speed digital motor (110,000 rpm)", "Intelligent heat control", "Ionic technology reduces static", "Lightweight magnesium body"],
    paymentOptions: ["Pay in full", "0% APR Installments"],
    shipping: ["Free standard shipping", "30-day returns"],
    relatedProducts: [{ id: "d4", name: "Nexel Travel Go", price: 199, image: "/pictures/travel_dryer.png" }],
  },
  "d4": {
    id: "d4",
    name: "Nexel Travel Go",
    subtitle: "Compact Performance",
    price: 199,
    images: ["/pictures/travel_dryer.png"],
    colors: [{ name: "Arctic White", hex: "#ffffff" }],
    description: "Your perfect travel companion. Foldable design with full-sized power to keep your hair looking great anywhere in the world.",
    details: ["Foldable handle", "Dual voltage support", "Ultra-lightweight"],
    paymentOptions: ["Pay in full"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "d1", name: "Nexel Aura Pro", price: 399, image: "/pictures/dryer_premium.png" }],
  },
  "d2": {
    id: "d2",
    name: "Nexel Ionic Dry",
    subtitle: "High Speed Drying",
    price: 299,
    images: ["/pictures/dyson_hero.png"],
    colors: [{ name: "Space Grey", hex: "#555555" }],
    description: "Powerful and portable. The Ionic Dry uses advanced airflow technology to dry hair 50% faster than traditional models.",
    details: ["High-speed motor", "Ionic care"],
    paymentOptions: ["Pay in full"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "d1", name: "Nexel Aura Pro", price: 399, image: "/pictures/dryer_premium.png" }],
  },
  "d3": {
    id: "d3",
    name: "Nexel Nano Care",
    subtitle: "Hair Hydration",
    price: 249,
    images: ["/pictures/dysonB.jpg"],
    colors: [{ name: "Satin Blue", hex: "#000080" }],
    description: "Hydrates as it dries. Nanoe technology infuses moisture into your hair, leaving it smooth and shiny.",
    details: ["Nanoe technology", "Quick-dry nozzle"],
    paymentOptions: ["Pay in full"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "d1", name: "Nexel Aura Pro", price: 399, image: "/pictures/dryer_premium.png" }],
  },
  "s1": {
    id: "s1",
    name: "Nexel Air Wrap",
    subtitle: "Multi-Styler",
    price: 549,
    images: ["/pictures/dysonUv1.jpg"],
    colors: [{ name: "Prussian Blue", hex: "#003153" }],
    description: "Curl, wave, smooth, and dry with no extreme heat. The Air Wrap uses the Coanda effect to style hair safely.",
    details: ["Coanda effect", "Intelligent heat control"],
    paymentOptions: ["Installments available"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "d1", name: "Nexel Aura Pro", price: 399, image: "/pictures/dryer_premium.png" }],
  },
  "s2": {
    id: "s2",
    name: "Nexel Multi Styler",
    subtitle: "Styling Perfection",
    price: 499,
    images: ["/pictures/daysonP.jpg"],
    colors: [{ name: "Satin Finish", hex: "#dcdcdc" }],
    description: "One tool for every look. Interchangeable heads allow you to go from straight to curly in minutes.",
    details: ["6 styling attachments", "3 temperature settings"],
    paymentOptions: ["Pay in full"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "s1", name: "Nexel Air Wrap", price: 549, image: "/pictures/dysonUv1.jpg" }],
  },
  "i1": {
    id: "i1",
    name: "Nexel Volta V7",
    subtitle: "Precision Steaming",
    price: 189,
    images: ["/pictures/iron_premium.png"],
    colors: [{ name: "Chrome Silver", hex: "#c0c0c0" }],
    description: "Precision meets power. Dual-heating technology ensures a consistent, high-pressure steam for any fabric.",
    details: ["2800W power", "Ceramic-coated soleplate"],
    paymentOptions: ["Pay in full"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "i2", name: "Nexel Pro Steam", price: 129, image: "/pictures/dfa.jpg" }],
  },
  "i2": {
    id: "i2",
    name: "Nexel Pro Steam",
    subtitle: "Classic Ironing",
    price: 129,
    images: ["/pictures/dfa.jpg"],
    colors: [{ name: "Titanium", hex: "#878787" }],
    description: "Reliable steam ironing with a heavy-duty soleplate for persistent creases.",
    details: ["Steam boost", "Vertical steaming"],
    paymentOptions: ["Pay in full"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "i1", name: "Nexel Volta V7", price: 189, image: "/pictures/iron_premium.png" }],
  },
  "c1": {
    id: "c1",
    name: "Nexel Brew Master",
    subtitle: "The Art of Coffee",
    price: 849,
    images: ["/pictures/coffee_machine_auto.png"],
    colors: [{ name: "Onyx Black", hex: "#1a1a1a" }],
    description: "The ultimate barista experience at home. Integrated conical burr grinder for the freshest espresso.",
    details: ["Built-in grinder", "PID temperature control"],
    paymentOptions: ["Installments available"],
    shipping: ["Free standard shipping"],
    relatedProducts: [{ id: "c2", name: "Nexel Barista Pro", price: 1299, image: "/pictures/coffee_espresso_manual.png" }],
  },
  "c2": {
    id: "c2",
    name: "Nexel Barista Pro",
    subtitle: "Advanced Espresso",
    price: 1299,
    images: ["/pictures/coffee_espresso_manual.png"],
    colors: [{ name: "Black Steel", hex: "#222222" }],
    description: "Professional grade extraction. Dual boilers allow for simultaneous brewing and milk steaming.",
    details: ["Dual boilers", "Pressure gauge"],
    paymentOptions: ["Installments available"],
    shipping: ["White glove delivery"],
    relatedProducts: [{ id: "c1", name: "Nexel Brew Master", price: 849, image: "/pictures/coffee_machine_auto.png" }],
  },
  "c3": {
    id: "c3",
    name: "Nexel Rose Brew",
    subtitle: "Limited Edition",
    price: 249,
    images: ["/pictures/smeg_kettle.png"],
    colors: [{ name: "Rose Pink", hex: "#ffb6c1" }],
    description: "Add a splash of color to your kitchen. Compact, powerful, and incredibly stylish.",
    details: ["Compact design", "One-touch brewing"],
    paymentOptions: ["Pay in full"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "c1", name: "Nexel Brew Master", price: 849, image: "/pictures/coffee_machine_auto.png" }],
  },
  "v1": {
    id: "v1",
    name: "Nexel Vacuum X20",
    subtitle: "Automated Perfection",
    price: 699,
    images: ["/pictures/vacuum_stick.png"],
    colors: [{ name: "White", hex: "#ffffff" }],
    description: "Total home cleaning automation. LIDAR mapping and AI object recognition ensure no spot is missed.",
    details: ["LIDAR navigation", "6000Pa suction"],
    paymentOptions: ["Installments available"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "v2", name: "Nexel Robot Pro", price: 499, image: "/pictures/dysonbo.jpg" }],
  },
  "a1": {
    id: "a1",
    name: "Nexel Air Purifier",
    subtitle: "Clean Breathing",
    price: 299,
    images: ["/pictures/air.jpg"],
    colors: [{ name: "White", hex: "#ffffff" }],
    description: "HEPA filtration for your home. Removes 99.9% of airborne particles, including allergens and smoke.",
    details: ["True HEPA filter", "Real-time air quality monitoring"],
    paymentOptions: ["Pay in full"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "a2", name: "Nexel Pure Flow", price: 199, image: "/pictures/crember.jpg" }],
  },
  "l1": {
    id: "l1",
    name: "Nexel Urban Scooter",
    subtitle: "Smart Mobility",
    price: 799,
    images: ["/pictures/ph.jpg"],
    colors: [{ name: "Obsidian", hex: "#111111" }],
    description: "Fast, foldable, and smart. The perfect solution for urban commuting with a 45km range.",
    details: ["45km range", "Smart app integration"],
    paymentOptions: ["Installments available"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "l2", name: "Nexel Smart Bike", price: 1499, image: "/pictures/ph1.jpg" }],
  },
  "w2": {
    id: "w2",
    name: "Nexel Buds Pro",
    subtitle: "Personal Sound",
    price: 149,
    images: ["/pictures/son.jpg"],
    colors: [{ name: "Black", hex: "#000000" }],
    description: "High-fidelity sound with active noise cancellation. 8 hours of battery life on a single charge.",
    details: ["Active Noise Cancellation", "IPX4 water resistance"],
    paymentOptions: ["Pay in full"],
    shipping: ["Free shipping"],
    relatedProducts: [{ id: "w3", name: "Nexel Sound X", price: 229, image: "/pictures/sony.jpg" }],
  },
};

export function getProduct(id: string): ProductData | null {
  return PRODUCTS[id] ?? null;
}

export function getAllProductIds(): string[] {
  return Object.keys(PRODUCTS);
}
