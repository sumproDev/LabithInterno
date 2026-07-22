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
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "LI-01", slug: "uv-marble-sheet", title: "UV Marble Sheet", category: "Decorative Surfaces",
    shortDescription: "High-gloss marble visuals for premium walls, counters and statement surfaces.",
    fullDescription: "UV marble sheets combine rich marble-inspired patterns with a smooth, easy-care finish for bold and refined interior surfaces.",
    images: [
      "/images/tile1.jpeg", "/images/tile2.jpeg", "/images/tile3.jpeg", "/images/tile4.jpeg", "/images/tile5.jpeg",
      "/images/tile6.jpeg", "/images/tile7.jpeg", "/images/tile8.jpeg", "/images/tile9.jpeg", "/images/tile10.jpeg",
      "/images/tile11.jpeg", "/images/tile12.jpeg", "/images/tile13.jpeg", "/images/tile14.jpeg", "/images/tile15.jpeg",
      "/images/floral-marble-feature-wall.jpeg", "/images/marble-feature-wall.jpeg", "/images/marble-lobby-wall.jpeg",
      "/images/marble-tv-wall.jpeg", "/images/black-marble-feature-wall.jpeg", "/images/black-marble-office-wall.jpeg",
    ],
    finishes: ["High Gloss", "Bookmatch", "Metallic Vein", "Designer Print"],
    applications: ["TV walls", "Living rooms", "Lobbies", "Counters"],
    features: ["Premium marble look", "Smooth UV finish", "Easy-care surface", "Wide design selection"],
    dimensions: "Sizes and thicknesses are available against the current product catalogue.",
    installation: "Fix to a clean, dry and level surface using the recommended adhesive system.",
    maintenance: "Clean with a soft damp cloth and non-abrasive cleaner.", featured: true,
  },
  {
    id: "LI-02", slug: "soffit-panel", title: "Soffit Panel", category: "Ceiling Products",
    shortDescription: "Linear ceiling panels for clean, durable and contemporary overhead finishes.",
    fullDescription: "Soffit panels create precise ceiling lines with practical performance and a coordinated range of wood, solid and linear finishes.",
    images: [
      "/images/charcoal-fluted-soffit-ceiling-lights.jpeg", "/images/walnut-fluted-bathroom-ceiling-wall.jpeg",
      "/images/backlit-false-ceiling.jpeg", "/images/fluted-bedroom-ceiling.jpeg", "/images/fluted-ceiling.jpeg",
      "/images/geometric-false-ceiling.jpeg", "/images/marble-false-ceiling.jpeg", "/images/striped-false-ceiling.jpeg",
      "/images/wooden-ceiling-design.jpeg", "/images/wooden-false-ceiling.jpeg",
    ],
    finishes: ["Woodgrain", "Walnut", "Solid", "Linear"],
    applications: ["Living areas", "Bedrooms", "Offices", "Covered ceilings"],
    features: ["Clean linear profile", "Low maintenance", "Coordinated trims", "Modern ceiling finish"],
    dimensions: "Profile sizes vary by collection and selected finish.",
    installation: "Install on the recommended framework with compatible clips and trims.",
    maintenance: "Dust regularly and wipe with a soft damp cloth.", featured: true,
  },
  {
    id: "LI-03", slug: "wpc-doors-frames", title: "WPC Doors & Frames", category: "Doors & Frames",
    shortDescription: "Coordinated WPC door and frame systems with contemporary surface finishes.",
    fullDescription: "WPC doors and frames offer a coordinated, low-maintenance product system for modern residential and commercial interiors.",
    images: ["/images/geometric-feature-wall.jpeg", "/images/vertical-fluted-wall.jpeg", "/images/wooden-tv-wall.jpeg"],
    finishes: ["Walnut", "Teak", "Oak", "Custom Tone"],
    applications: ["Bedrooms", "Utility areas", "Offices", "Interior doorways"],
    features: ["Coordinated system", "Low maintenance", "Contemporary finishes", "Practical everyday use"],
    dimensions: "Door and frame dimensions are supplied to the selected product specification.",
    installation: "Use trained fitting methods and compatible hardware for the chosen system.",
    maintenance: "Wipe clean with a soft cloth; avoid abrasive tools.", featured: true,
  },
  {
    id: "LI-04", slug: "wpc-sheets", title: "WPC Sheets", category: "WPC Products",
    shortDescription: "Versatile WPC sheets for furniture, partitions and decorative interior surfaces.",
    fullDescription: "WPC sheets provide a practical base material with consistent construction and versatile finishing possibilities.",
    images: ["/images/walnut-fluted-tv-storage-unit.jpeg", "/images/balcony-fluted-wall.jpeg", "/images/fluted-console-wall.jpeg", "/images/fluted-panel-bedroom.jpeg", "/images/fluted-panel-living-room.jpeg", "/images/fluted-wall-with-lights.jpeg", "/images/striped-wall-panels.jpeg", "/images/fluted-panels-poster1.jpeg", "/images/fluted-panels-poster2.jpeg"],
    finishes: ["Natural", "Laminated", "Woodgrain", "Solid"],
    applications: ["Cabinetry", "Partitions", "Modular furniture", "Wall cladding"],
    features: ["Versatile sheet format", "Consistent surface", "Multiple thicknesses", "Interior product flexibility"],
    dimensions: "Sheet sizes and thicknesses vary by product range.",
    installation: "Cut and fix using tools and hardware recommended for the selected sheet.",
    maintenance: "Follow the care guidance for the final applied surface.", featured: true,
  },
  {
    id: "LI-05", slug: "french-moldings", title: "French Moldings", category: "Decorative Profiles",
    shortDescription: "Elegant wall profiles for classic panel compositions and refined detailing.",
    fullDescription: "French moldings bring proportion, rhythm and elegant framed detailing to walls, doors and decorative compositions.",
    images: ["/images/white-french-molding-feature-wall.jpeg", "/images/black-gold-french-molding-wall.jpeg", "/images/geometric-feature-wall.jpeg", "/images/intro.jpg", "/images/bedroom.jpg"],
    finishes: ["Classic White", "Paintable", "Gold Accent", "Custom Finish"],
    applications: ["Living rooms", "Bedrooms", "Corridors", "Hospitality spaces"],
    features: ["Elegant profile detail", "Flexible compositions", "Paint-ready options", "Classic-modern character"],
    dimensions: "Profiles are available in multiple widths and design patterns.",
    installation: "Measure, mitre and fix to a prepared surface with compatible adhesive and pins.",
    maintenance: "Dust gently and clean according to the final coating.", featured: true,
  },
  {
    id: "LI-06", slug: "pvc-panels", title: "PVC Panels", category: "Wall & Ceiling Panels",
    shortDescription: "Lightweight, low-maintenance panels for clean wall and ceiling finishes.",
    fullDescription: "PVC panels offer practical wall and ceiling coverage in a versatile range of modern finishes.",
    images: ["/images/white-textured-pvc-wall-panels.jpeg", "/images/pvc-wall-panel.jpg", "/images/office.jpg"], finishes: ["Woodgrain", "Stone", "Solid", "Linear"],
    applications: ["Utility areas", "Kitchens", "Ceilings", "Commercial interiors"],
    features: ["Low maintenance", "Lightweight", "Quick fitting", "Multiple surface options"],
    dimensions: "Sizes and profiles vary by collection.", installation: "Use the recommended frame or direct-fix method.", maintenance: "Wipe clean; avoid abrasive tools and strong solvents.", featured: true,
  },
  {
    id: "LI-07", slug: "wpc-louvers", title: "WPC Louvers", category: "Architectural Profiles",
    shortDescription: "Linear profiles that add warmth, rhythm and depth to interior surfaces.",
    fullDescription: "WPC louvers create calm repetition, tactile warmth and architectural definition across walls and ceilings.",
    images: ["/images/walnut-fluted-living-room-wall.jpeg", "/images/walnut-fluted-corner-feature-wall.jpeg", "/images/oak-fluted-tv-wall.jpeg", "/images/wpc_louvers.jfif", "/images/fluted-panel-living-room.jpeg"], finishes: ["Walnut", "Oak", "Teak", "Charcoal"],
    applications: ["TV walls", "Living rooms", "Receptions", "Feature ceilings"],
    features: ["Dimensional texture", "Warm wood visuals", "Modular profiles", "Coordinated trims"],
    dimensions: "Profile selection determines panel width and depth.", installation: "Fit over a prepared framework with suitable clips and edge trims.", maintenance: "Dust regularly and wipe with a lightly damp microfiber cloth.", featured: true,
  },
  {
    id: "LI-08", slug: "fluted-panels", title: "Fluted Panels", category: "Textured Panels",
    shortDescription: "Contemporary textured panels for refined feature walls and statement surfaces.",
    fullDescription: "Precision-fluted surfaces bring shadow, rhythm and sculptural depth to modern interior planes.",
    images: ["/images/light-oak-fluted-vanity-wall.jpeg", "/images/walnut-fluted-vanity-wall.jpeg", "/images/oak-fluted-bathroom-wall.jpeg", "/images/charcoal-fluted-marble-tv-wall.jpeg", "/images/fluted-panel-living-room.jpeg", "/images/fluted-console-wall.jpeg"], finishes: ["Natural Wood", "Deep Charcoal", "Warm Beige", "Custom Tone"],
    applications: ["Feature walls", "Vanity areas", "Bedrooms", "Retail interiors"],
    features: ["Vertical visual rhythm", "Premium depth", "Flexible compositions", "Clean edge detailing"],
    dimensions: "Module dimensions are collection-specific.", installation: "Align modules from a fixed datum and finish with coordinated trims.", maintenance: "Use a soft brush or microfiber cloth along the flute direction.", featured: true,
  },
  {
    id: "LI-09", slug: "charcoal-panels", title: "Charcoal Panels", category: "Decorative Panels",
    shortDescription: "Rich decorative panels for depth, contrast and premium visual impact.",
    fullDescription: "Charcoal panels deliver expressive patterns, deep tones and tactile character for bold statement surfaces.",
    images: ["/images/black-marble-feature-wall.jpeg", "/images/geometric-feature-wall.jpeg"], finishes: ["Embossed", "Metallic", "Stone", "Geometric"],
    applications: ["Statement walls", "Lobbies", "Retail displays", "Reception areas"],
    features: ["Expressive surface", "Deep colourways", "Design-led patterns", "Statement finish"],
    dimensions: "Pattern and sheet dimensions vary by design.", installation: "Dry-lay the pattern before fixing to a prepared level surface.", maintenance: "Dust gently and spot-clean with a compatible mild solution.", featured: true,
  },
  {
    id: "LI-10", slug: "pu-stone", title: "PU Stone", category: "Stone Surfaces",
    shortDescription: "Realistic stone-inspired finishes in a lightweight panel format.",
    fullDescription: "PU stone recreates natural stone texture with a practical lightweight format and strong visual depth.",
    images: ["/images/pu-stone.jfif", "/images/stone.jpg"], finishes: ["Slate", "Stacked Stone", "Travertine", "Deep Rock"],
    applications: ["Feature walls", "Columns", "Hospitality spaces", "Covered exteriors"],
    features: ["Realistic texture", "Lightweight format", "Fast visual impact", "Corner options"],
    dimensions: "Panel and corner sizes depend on the selected texture.", installation: "Use the approved adhesive and support method for the substrate.", maintenance: "Remove dust with a soft brush; use mild soap only when required.", featured: true,
  },
];

export const productCategories = products.map(({ title, slug }) => ({ title, slug }));
