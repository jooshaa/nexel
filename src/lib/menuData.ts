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
          { id: "d1", name: "Nexel Aura Pro", image: "/pictures/dryer_premium.png", isNew: true },
          { id: "d4", name: "Nexel Travel Go", image: "/pictures/travel_dryer.png", isNew: true },
          { id: "d2", name: "Nexel Ionic Dry", image: "/pictures/dyson_hero.png" },
          { id: "d3", name: "Nexel Nano Care", image: "/pictures/dysonB.jpg" },
        ]
      },
      {
        id: "styling-tools",
        name: "Styling",
        products: [
          { id: "s1", name: "Nexel Air Wrap", image: "/pictures/dysonUv1.jpg", isNew: true },
          { id: "s2", name: "Nexel Multi Styler", image: "/pictures/daysonP.jpg" },
          { id: "s3", name: "Nexel Pro Curler", image: "/pictures/ydsfa.jpg" },
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
          { id: "i1", name: "Nexel Volta V7", image: "/pictures/iron_premium.png", isNew: true },
          { id: "i2", name: "Nexel Pro Steam", image: "/pictures/dfa.jpg" },
          { id: "i3", name: "Nexel Smart Station", image: "/pictures/da.jpg" },
        ]
      },
      {
        id: "garment-steamers",
        name: "Steamers",
        products: [
          { id: "gs1", name: "Nexel Handheld Steamer", image: "/pictures/case.jpg" },
          { id: "gs2", name: "Nexel Vertical Pro", image: "/pictures/garment_steamer.png", isNew: true },
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
          { id: "c1", name: "Nexel Brew Master", image: "/pictures/coffee_machine_auto.png", isNew: true },
          { id: "c2", name: "Nexel Barista Pro", image: "/pictures/coffee_espresso_manual.png" },
          { id: "c3", name: "Nexel Rose Brew", image: "/pictures/smeg_kettle.png", isNew: true },
        ]
      },
      {
        id: "brewing",
        name: "Brewing Tech",
        products: [
          { id: "c4", name: "Nexel Drip Master", image: "/pictures/ph2.jpg", isNew: true },
          { id: "c5", name: "Nexel Smart Grinder", image: "/pictures/smeg_blender.jpg" },
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
          { id: "v1", name: "Nexel Vacuum X20", image: "/pictures/vacuum_stick.png", isNew: true },
          { id: "v2", name: "Nexel Robot Pro", image: "/pictures/dysonbo.jpg" },
          { id: "v3", name: "Nexel Handheld X", image: "/pictures/dsafdsfasdfa.jpg" },
        ]
      },
      {
        id: "air-quality",
        name: "Air & Quality",
        products: [
          { id: "a1", name: "Nexel Air Purifier", image: "/pictures/air.jpg", isNew: true },
          { id: "a2", name: "Nexel Pure Flow", image: "/pictures/crember.jpg" },
          { id: "a3", name: "Nexel Humidifier Pro", image: "/pictures/sdf.jpg", isNew: true },
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
          { id: "l1", name: "Nexel Urban Scooter", image: "/pictures/ph.jpg", isNew: true },
          { id: "l2", name: "Nexel Smart Bike", image: "/pictures/ph1.jpg" },
        ]
      },
      {
        id: "wearables",
        name: "Wearables",
        products: [
          { id: "w1", name: "Nexel Watch 2", image: "/pictures/case1.jpg" },
          { id: "w2", name: "Nexel Buds Pro", image: "/pictures/son.jpg" },
          { id: "w3", name: "Nexel Sound X", image: "/pictures/sony.jpg" },
        ]
      },
      {
        id: "gear",
        name: "Tech Gear",
        products: [
          { id: "g1", name: "Nexel Tech Case", image: "/pictures/case.jpg" },
          { id: "g2", name: "Nexel Hub X", image: "/pictures/smeg_mixer.jpg" },
          { id: "g3", name: "Nexel Box Pro", image: "/pictures/boxx.jpg" },
        ]
      }
    ]
  }
};
