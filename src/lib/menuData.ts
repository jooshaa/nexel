export type Product = {
  id: string;
  name: string;
  image: string;
  isNew?: boolean;
};

export type SubCategory = {
  id: string;
  name: string;
  products: Product[];
};

export type MainCategory = {
  id: string;
  name: string;
  subCategories: SubCategory[];
};

export const MENU_DATA: Record<string, MainCategory> = {
  "Dryer": {
    id: "dryer",
    name: "Dryer",
    subCategories: [
      {
        id: "hair-dryers",
        name: "Hair Care",
        products: [
          { id: "d1", name: "Nexel Aura Pro", image: "/prd_pics/dyson dryer/Gemini_Generated_Image_rr5o1hrr5o1hrr5o.png", isNew: true },
          { id: "d4", name: "Nexel Travel Go", image: "/prd_pics/dyson dryer/Screenshot 2026-05-05 at 16.36.15.png", isNew: true },
          { id: "d2", name: "Nexel Ionic Dry", image: "/prd_pics/dyson dryer/Screenshot 2026-05-05 at 16.36.49.png" },
          { id: "d3", name: "Nexel Nano Care", image: "/prd_pics/dyson dryer/Screenshot 2026-05-05 at 16.37.18.png" },
        ]
      },
      {
        id: "styling-tools",
        name: "Styling",
        products: [
          { id: "s1", name: "Nexel Air Wrap", image: "/prd_pics/dyson dryer/Screenshot 2026-05-04 at 18.54.22.png", isNew: true },
          { id: "s2", name: "Nexel Multi Styler", image: "/prd_pics/dyson dryer/Screenshot 2026-05-04 at 18.55.32.png" },
          { id: "s3", name: "Nexel Pro Curler", image: "/prd_pics/dyson dryer/Screenshot 2026-05-04 at 18.55.36.png" },
        ]
      }
    ]
  },
  "Iron": {
    id: "iron",
    name: "Iron",
    subCategories: [
      {
        id: "steam-irons",
        name: "Steam Irons",
        products: [
          { id: "i1", name: "Nexel Volta V7", image: "/prd_pics/steamone/Screenshot 2026-05-01 at 18.06.20.png", isNew: true },
          { id: "i2", name: "Nexel Pro Steam", image: "/prd_pics/steamone/Screenshot 2026-05-05 at 16.52.07.png" },
          { id: "i3", name: "Nexel Smart Station", image: "/prd_pics/steamone/Screenshot 2026-05-05 at 16.52.26.png" },
        ]
      },
      {
        id: "garment-steamers",
        name: "Steamers",
        products: [
          { id: "gs1", name: "Nexel Handheld Steamer", image: "/prd_pics/steamone/Screenshot 2026-05-05 at 16.52.36.png" },
          { id: "gs2", name: "Nexel Vertical Pro", image: "/prd_pics/steamone/Screenshot 2026-05-05 at 16.52.56.png", isNew: true },
        ]
      }
    ]
  },
  "Coffee Machine": {
    id: "coffee-machine",
    name: "Coffee Machine",
    subCategories: [
      {
        id: "espresso-machines",
        name: "Espresso",
        products: [
          { id: "c1", name: "Nexel Brew Master", image: "/prd_pics/coffee machine/Screenshot 2026-05-01 at 18.03.40.png", isNew: true },
          { id: "c2", name: "Nexel Barista Pro", image: "/prd_pics/coffee machine/Screenshot 2026-05-01 at 18.04.05.png" },
          { id: "c3", name: "Nexel Rose Brew", image: "/prd_pics/smeg/Screenshot 2026-05-05 at 16.56.04.png", isNew: true },
        ]
      },
      {
        id: "brewing",
        name: "Brewing Tech",
        products: [
          { id: "c4", name: "Nexel Drip Master", image: "/prd_pics/smeg/Screenshot 2026-05-05 at 16.56.25.png", isNew: true },
          { id: "c5", name: "Nexel Smart Grinder", image: "/prd_pics/smeg/Screenshot 2026-05-05 at 16.56.49.png" },
        ]
      }
    ]
  },
  "Home": {
    id: "home",
    name: "Home",
    subCategories: [
      {
        id: "cleaning",
        name: "Cleaning Tech",
        products: [
          { id: "v1", name: "Nexel Vacuum X20", image: "/prd_pics/vacum cleaner/Screenshot 2026-05-05 at 16.37.06.png", isNew: true },
          { id: "v2", name: "Nexel Robot Pro", image: "/prd_pics/vacum cleaner/Screenshot 2026-05-05 at 16.37.51.png" },
          { id: "v3", name: "Nexel Handheld X", image: "/prd_pics/vacum cleaner/Screenshot 2026-05-05 at 16.42.46.png" },
        ]
      },
      {
        id: "air-quality",
        name: "Air & Quality",
        products: [
          { id: "a1", name: "Nexel Air Purifier", image: "/prd_pics/air-quality/air.jpg", isNew: true },
          { id: "a2", name: "Nexel Pure Flow", image: "/prd_pics/air-quality/crember.jpg" },
          { id: "a3", name: "Nexel Humidifier Pro", image: "/prd_pics/air-quality/sdf.jpg", isNew: true },
        ]
      }
    ]
  },
  "Lifestyle": {
    id: "lifestyle",
    name: "Lifestyle",
    subCategories: [
      {
        id: "mobility",
        name: "Mobility",
        products: [
          { id: "l1", name: "Nexel Urban Scooter", image: "/prd_pics/lifestyle/ph.jpg", isNew: true },
          { id: "l2", name: "Nexel Smart Bike", image: "/prd_pics/lifestyle/ph1.jpg" },
        ]
      },
      {
        id: "wearables",
        name: "Wearables",
        products: [
          { id: "w1", name: "Nexel Watch 2", image: "/prd_pics/lifestyle/case1.jpg" },
          { id: "w2", name: "Nexel Buds Pro", image: "/prd_pics/lifestyle/son.jpg" },
          { id: "w3", name: "Nexel Sound X", image: "/prd_pics/lifestyle/sony.jpg" },
        ]
      },
      {
        id: "gear",
        name: "Tech Gear",
        products: [
          { id: "g1", name: "Nexel Tech Case", image: "/prd_pics/lifestyle/case.jpg" },
          { id: "g2", name: "Nexel Hub X", image: "/prd_pics/lifestyle/smeg_mixer.jpg" },
          { id: "g3", name: "Nexel Box Pro", image: "/prd_pics/lifestyle/boxx.jpg" },
        ]
      }
    ]
  }
};
