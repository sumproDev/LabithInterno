export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  finishes: string[];
  applications: string[];
  features: string[];
  dimensions: string;
  installation: string;
  maintenance: string;
  brochure: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "LI-01", slug: "marble-sheets", title: "Marble Sheets", category: "Decorative Surfaces",
    shortDescription: "Elegant marble-inspired surfaces with refined textures and practical installation.",
    fullDescription: "A refined surface collection created to bring the visual depth of natural marble to contemporary interiors with simpler handling and consistent finishes.",
    images: ["/images/marble.jpg", "/images/intro.jpg"], finishes: ["High Gloss", "Soft Matte", "Bookmatch", "Metallic Vein"],
    applications: ["Living Rooms", "Lobbies", "Retail", "Reception Areas"], features: ["Lightweight surface", "Consistent visual finish", "Easy-care surface", "Fast interior application"],
    dimensions: "Final size options available with the current catalogue.", installation: "Install on a clean, dry and level substrate using the specified adhesive system.", maintenance: "Clean with a soft damp cloth and non-abrasive cleaner.", brochure: "/contact?type=brochure&product=marble-sheets", featured: true,
  },
  {
    id: "LI-02", slug: "pvc-panels", title: "PVC Panels", category: "Wall & Ceiling Panels",
    shortDescription: "Lightweight, low-maintenance panels suitable for stylish walls and ceilings.",
    fullDescription: "Versatile interior panels designed for practical wall and ceiling upgrades across residential and commercial environments.",
    images: ["/images/stone.jpg", "/images/office.jpg"], finishes: ["Woodgrain", "Stone", "Solid", "Linear"], applications: ["Ceilings", "Offices", "Retail", "Utility Spaces"], features: ["Low-maintenance", "Lightweight", "Quick installation", "Multiple surface options"], dimensions: "Sizes and profiles vary by collection.", installation: "Use the recommended frame or direct-fix method for the selected profile.", maintenance: "Wipe clean; avoid abrasive tools and strong solvents.", brochure: "/contact?type=brochure&product=pvc-panels", featured: true,
  },
  {
    id: "LI-03", slug: "wpc-louvers", title: "WPC Louvers", category: "Architectural Profiles",
    shortDescription: "Architectural linear profiles that add warmth, rhythm and depth to interiors.",
    fullDescription: "Linear profiles that create calm repetition, tactile warmth and architectural definition on feature walls and ceilings.",
    images: ["/images/louvers.jpg", "/images/bedroom.jpg"], finishes: ["Walnut", "Oak", "Teak", "Charcoal"], applications: ["Feature Walls", "TV Units", "Bedrooms", "Offices"], features: ["Dimensional texture", "Warm wood visuals", "Modular profiles", "Interior versatility"], dimensions: "Profile selection determines panel width and depth.", installation: "Fit over a prepared framework with suitable clips and edge trims.", maintenance: "Dust regularly and wipe with a lightly damp microfiber cloth.", brochure: "/contact?type=brochure&product=wpc-louvers", featured: true,
  },
  {
    id: "LI-04", slug: "fluted-panels", title: "Fluted Panels", category: "Textured Panels",
    shortDescription: "Contemporary textured panels for elegant feature walls and statement surfaces.",
    fullDescription: "Precision-fluted surfaces that bring shadow, rhythm and a sculptural quality to otherwise minimal interior planes.",
    images: ["/images/bedroom.jpg", "/images/hotel.jpg"], finishes: ["Natural Wood", "Deep Charcoal", "Warm Beige", "Custom Tone"], applications: ["Bedrooms", "Hospitality", "Dining", "Showrooms"], features: ["Vertical visual rhythm", "Premium depth", "Flexible compositions", "Clean edge detailing"], dimensions: "Module dimensions are collection-specific.", installation: "Align modules from a fixed datum and finish using coordinated trims.", maintenance: "Use a soft brush or microfiber cloth along the flute direction.", brochure: "/contact?type=brochure&product=fluted-panels", featured: true,
  },
  {
    id: "LI-05", slug: "charcoal-panels", title: "Charcoal Panels", category: "Decorative Panels",
    shortDescription: "Rich decorative panels that introduce depth, contrast and premium visual appeal.",
    fullDescription: "Bold decorative panels for designers seeking deep tones, tactile surfaces and highly composed statement walls.",
    images: ["/images/retail.jpg", "/images/intro.jpg"], finishes: ["Embossed", "Metallic", "Stone", "Geometric"], applications: ["Retail", "Reception", "Hospitality", "Feature Walls"], features: ["Expressive surface", "Deep colourways", "Design-led patterns", "Statement applications"], dimensions: "Pattern and sheet dimensions vary by design.", installation: "Dry-lay the pattern first, then adhere to a prepared level surface.", maintenance: "Dust gently and spot-clean with a mild, compatible solution.", brochure: "/contact?type=brochure&product=charcoal-panels", featured: false,
  },
  {
    id: "LI-06", slug: "pu-stone", title: "PU Stone", category: "Stone Surfaces",
    shortDescription: "Realistic stone-inspired finishes with lightweight construction and easy installation.",
    fullDescription: "Natural-looking stone textures engineered for faster interior feature applications without the handling demands of solid masonry.",
    images: ["/images/exterior.jpg", "/images/stone.jpg"], finishes: ["Slate", "Stacked Stone", "Travertine", "Deep Rock"], applications: ["Feature Walls", "Hospitality", "Retail", "Covered Exteriors"], features: ["Realistic texture", "Lightweight format", "Fast visual impact", "Coordinated corner options"], dimensions: "Panel and corner sizes depend on the selected texture.", installation: "Use the approved adhesive and mechanical support method for the substrate and location.", maintenance: "Remove dust with a soft brush; use mild soap only when required.", brochure: "/contact?type=brochure&product=pu-stone", featured: true,
  },
];

export const productCategories = products.map(({ title, slug }) => ({ title, slug }));
