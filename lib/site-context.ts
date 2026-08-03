import { franchiseFaqs } from "@/data/faqs";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { getProducts, getProjects } from "@/lib/cms";

export type ContextBlock = {
  title: string;
  url: string;
  text: string;
};

const brandBlocks: ContextBlock[] = [
  {
    title: "Labith Interno overview",
    url: "/",
    text: "Labith Interno LLP is a premium interior products brand for modern homes, workplaces, hospitality and retail spaces. The portfolio includes UV marble sheets, soffit panels, WPC doors and frames, WPC sheets, French moldings, PVC panels, WPC louvers, fluted panels, charcoal panels and PU Stone.",
  },
  {
    title: "Why choose Labith Interno",
    url: "/",
    text: "Labith Interno focuses on premium product quality, modern designs, durable materials, a wide product range, pan-India supply, a dealership network, clear product information and dependable business relationships.",
  },
  {
    title: "About Labith Interno",
    url: "/about-labith-interno",
    text: "Labith Interno believes every surface starts with the right product. The mission is to make premium material choices clearer, more inspiring and more accessible to modern projects. The vision is to build a trusted interior-products network where design ambition is supported by material knowledge.",
  },
  {
    title: "Dealership opportunity",
    url: "/dealership",
    text: "Labith Interno offers dealership partnerships for entrepreneurs and businesses with local market understanding, customer focus and interest in premium interior products. Support can include marketing assistance, product and sales training, operational guidance, territory review and ongoing business support. Territory availability and commercial terms are subject to evaluation and formal agreement.",
  },
  {
    title: "Contact and enquiry",
    url: "/contact",
    text: "Contact Labith Interno via Email: labithinterno@gmail.com, Phone: +91 95708 00440, or submit an enquiry on our website at /contact. Our team handles both customer and dealership enquiries.",
  },
];

const productBlocks: ContextBlock[] = products.map((product) => ({
  title: product.title,
  url: `/products/${product.slug}`,
  text: [
    `${product.title} is part of ${product.category}.`,
    product.shortDescription,
    `Finishes: ${product.finishes.join(", ")}.`,
    `Applications: ${product.applications.join(", ")}.`,
    `Features: ${product.features.join(", ")}.`,
    `Dimensions: ${product.dimensions}.`,
  ].join(" "),
}));

const projectBlocks: ContextBlock[] = projects.map((project) => ({
  title: project.title,
  url: `/projects/${project.slug}`,
  text: [
    `${project.title} is a ${project.type.toLowerCase()} project.`,
    `Products used: ${project.products.join(", ")}.`,
    `Result: ${project.result}`,
  ].join(" "),
}));

const faqBlocks: ContextBlock[] = franchiseFaqs.map((faq) => ({
  title: faq.q,
  url: "/dealership",
  text: `${faq.q} ${faq.a}`,
}));

export const websiteContextBlocks: ContextBlock[] = [
  ...brandBlocks,
  ...productBlocks,
  ...projectBlocks,
  ...faqBlocks,
];

const stopWords = new Set([
  "about",
  "after",
  "also",
  "and",
  "are",
  "can",
  "for",
  "from",
  "how",
  "into",
  "labith",
  "interno",
  "is",
  "me",
  "of",
  "on",
  "or",
  "our",
  "the",
  "this",
  "to",
  "what",
  "with",
  "you",
]);

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));
}

export function getWebsiteContext() {
  return websiteContextBlocks
    .map((block) => `Title: ${block.title}\nURL: ${block.url}\nContent: ${block.text}`)
    .join("\n\n");
}

export function findRelevantContext(question: string, limit = 4) {
  const terms = tokenize(question);
  if (!terms.length) return websiteContextBlocks.slice(0, limit);

  return websiteContextBlocks
    .map((block) => {
      const haystack = `${block.title} ${block.text}`.toLowerCase();
      const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
      return { block, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.block);
}

export function buildFallbackAnswer(question: string) {
  const q = question.toLowerCase();

  // Contact / Gmail / Email / Phone intent
  if (q.includes("email") || q.includes("gmail") || q.includes("contact") || q.includes("phone") || q.includes("number") || q.includes("reach") || q.includes("call")) {
    return "You can reach Labith Interno via email at labithinterno@gmail.com or by phone at +91 95708 00440. You can also submit an enquiry directly on our Contact page at /contact.";
  }

  // Home / House building & integration intent
  if (q.includes("home") || q.includes("house") || q.includes("integrate") || q.includes("building") || q.includes("renovat") || q.includes("design my")) {
    return "To build a modern, luxury home interior, Labith Interno provides premium architectural finishes designed to transform walls, ceilings, and entryways. We recommend integrating our core product categories:\n\n• UV Marble Sheet (luxurious marble feature walls & TV units)\n• PU Stone (authentic stone texture accent walls)\n• Fluted Panels & WPC Louvers (linear depth & slatted wall designs)\n• Soffit Panels & PVC Panels (durable ceiling & wall coverage)\n• WPC Doors & Frames (waterproof, elegant entryways)\n• WPC Sheets, French Moldings & Charcoal Panels (refined decorative detailing)\n\nExplore all products on our Products page (/products) or send us an enquiry for tailored material recommendations!";
  }

  // Dealership intent
  if (q.includes("dealership") || q.includes("franchise") || q.includes("partner")) {
    return "Labith Interno offers dealership partnerships for modern interior products with marketing support, sales assistance, and territory guidance. Submit your details on our Dealership page (/dealership) to apply.";
  }

  const relevant = findRelevantContext(question);

  if (!relevant.length) {
    return "Labith Interno offers premium interior products like UV Marble Sheets, PU Stone, WPC Louvers, Fluted Panels, Soffit Panels, WPC Doors & Frames, French Moldings, PVC Panels, and Charcoal Panels. Ask us about any product, finish, or dealership opportunity!";
  }

  // Provide a clean, short, direct answer from the top relevant block
  const topBlock = relevant[0];
  return `${topBlock.text} For detailed catalogs or custom pricing, please submit an enquiry on our Contact page.`;
}

export async function getDynamicWebsiteContext() {
  const [dynamicProducts, dynamicProjects] = await Promise.all([getProducts(), getProjects()]);
  const productBlocks = dynamicProducts.map((product) => ({
    title: product.title,
    url: `/products/${product.slug}`,
    text: [
      `${product.title} is part of ${product.category}.`,
      product.shortDescription,
      product.fullDescription,
      `Finishes: ${product.finishes.join(", ")}.`,
      `Applications: ${product.applications.join(", ")}.`,
      `Features: ${product.features.join(", ")}.`,
      `Dimensions: ${product.dimensions}`,
      `Installation: ${product.installation}`,
      `Maintenance: ${product.maintenance}`,
    ].join(" "),
  }));
  const projectBlocks = dynamicProjects.map((project) => ({
    title: project.title,
    url: `/projects/${project.slug}`,
    text: [`${project.title} is a ${project.type.toLowerCase()} project.`, `Products used: ${project.products.join(", ")}.`, project.challenge, project.approach, project.result].join(" "),
  }));
  return [...brandBlocks, ...productBlocks, ...projectBlocks, ...faqBlocks]
    .map((block) => `Title: ${block.title}\nURL: ${block.url}\nContent: ${block.text}`)
    .join("\n\n");
}
