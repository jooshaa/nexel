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
          { id: "nexel-aura-pro", name: "Nexel Aura Pro", image: "/prd_pics/dyson dryer/Gemini_Generated_Image_rr5o1hrr5o1hrr5o.png", isNew: true },
          { id: "nexel-travel-go", name: "Nexel Travel Go", image: "/prd_pics/dyson dryer/Screenshot 2026-05-05 at 16.36.15.png", isNew: true },
          { id: "nexel-ionic-dry", name: "Nexel Ionic Dry", image: "/prd_pics/dyson dryer/Screenshot 2026-05-05 at 16.36.49.png" },
          { id: "nexel-nano-care", name: "Nexel Nano Care", image: "/prd_pics/dyson dryer/Screenshot 2026-05-05 at 16.37.18.png" },
        ]
      },
      {
        id: "styling-tools",
        name: "Styling",
        products: [
          { id: "nexel-air-wrap", name: "Nexel Air Wrap", image: "/prd_pics/dyson dryer/Screenshot 2026-05-04 at 18.54.22.png", isNew: true },
          { id: "nexel-multi-styler", name: "Nexel Multi Styler", image: "/prd_pics/dyson dryer/Screenshot 2026-05-04 at 18.55.32.png" },
          { id: "nexel-pro-curler", name: "Nexel Pro Curler", image: "/prd_pics/dyson dryer/Screenshot 2026-05-04 at 18.55.36.png" },
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
          { id: "nexel-volta-v7", name: "Nexel Volta V7", image: "/prd_pics/steamone/Screenshot 2026-05-01 at 18.06.20.png", isNew: true },
          { id: "nexel-pro-steam", name: "Nexel Pro Steam", image: "/prd_pics/steamone/Screenshot 2026-05-05 at 16.52.07.png" },
          { id: "nexel-smart-station", name: "Nexel Smart Station", image: "/prd_pics/steamone/Screenshot 2026-05-05 at 16.52.26.png" },
        ]
      },
      {
        id: "garment-steamers",
        name: "Steamers",
        products: [
          { id: "nexel-handheld-steamer", name: "Nexel Handheld Steamer", image: "/prd_pics/steamone/Screenshot 2026-05-05 at 16.52.36.png" },
          { id: "nexel-vertical-pro", name: "Nexel Vertical Pro", image: "/prd_pics/steamone/Screenshot 2026-05-05 at 16.52.56.png", isNew: true },
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
          { id: "nexel-brew-master", name: "Nexel Brew Master", image: "/prd_pics/coffee machine/Screenshot 2026-05-01 at 18.03.40.png", isNew: true },
          { id: "nexel-barista-pro", name: "Nexel Barista Pro", image: "/prd_pics/coffee machine/Screenshot 2026-05-01 at 18.04.05.png" },
          { id: "nexel-rose-brew", name: "Nexel Rose Brew", image: "/prd_pics/smeg/Screenshot 2026-05-05 at 16.56.04.png", isNew: true },
        ]
      },
      {
        id: "brewing",
        name: "Brewing Tech",
        products: [
          { id: "nexel-drip-master", name: "Nexel Drip Master", image: "/prd_pics/smeg/Screenshot 2026-05-05 at 16.56.25.png", isNew: true },
          { id: "nexel-smart-grinder", name: "Nexel Smart Grinder", image: "/prd_pics/smeg/Screenshot 2026-05-05 at 16.56.49.png" },
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
          { id: "nexel-vacuum-x20", name: "Nexel Vacuum X20", image: "/prd_pics/vacum cleaner/Screenshot 2026-05-05 at 16.37.06.png", isNew: true },
          { id: "nexel-robot-pro", name: "Nexel Robot Pro", image: "/prd_pics/vacum cleaner/Screenshot 2026-05-05 at 16.37.51.png" },
          { id: "nexel-handheld-x", name: "Nexel Handheld X", image: "/prd_pics/vacum cleaner/Screenshot 2026-05-05 at 16.42.46.png" },
        ]
      },
      {
        id: "air-quality",
        name: "Air & Quality",
        products: [
          { id: "nexel-air-purifier", name: "Nexel Air Purifier", image: "/prd_pics/air-quality/air.jpg", isNew: true },
          { id: "nexel-pure-flow", name: "Nexel Pure Flow", image: "/prd_pics/air-quality/crember.jpg" },
          { id: "nexel-humidifier-pro", name: "Nexel Humidifier Pro", image: "/prd_pics/air-quality/sdf.jpg", isNew: true },
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
          { id: "nexel-urban-scooter", name: "Nexel Urban Scooter", image: "/prd_pics/lifestyle/ph.jpg", isNew: true },
          { id: "nexel-smart-bike", name: "Nexel Smart Bike", image: "/prd_pics/lifestyle/ph1.jpg" },
        ]
      },
      {
        id: "wearables",
        name: "Wearables",
        products: [
          { id: "nexel-watch-2", name: "Nexel Watch 2", image: "/prd_pics/lifestyle/case1.jpg" },
          { id: "nexel-buds-pro", name: "Nexel Buds Pro", image: "/prd_pics/lifestyle/son.jpg" },
          { id: "nexel-sound-x", name: "Nexel Sound X", image: "/prd_pics/lifestyle/sony.jpg" },
        ]
      },
      {
        id: "gear",
        name: "Tech Gear",
        products: [
          { id: "nexel-tech-case", name: "Nexel Tech Case", image: "/prd_pics/lifestyle/case.jpg" },
          { id: "nexel-hub-x", name: "Nexel Hub X", image: "/prd_pics/lifestyle/smeg_mixer.jpg" },
          { id: "nexel-box-pro", name: "Nexel Box Pro", image: "/prd_pics/lifestyle/boxx.jpg" },
        ]
      }
    ]
  }
};
