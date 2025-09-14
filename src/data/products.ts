import { Product } from "@/components/ProductCard";
import basicTeeImage from "@/assets/basic-tee-black.jpg";
import premiumShirtImage from "@/assets/premium-shirt-blue.jpg";

export const products: Product[] = [
  {
    id: "logo-design",
    name: "Professional Logo Design",
    price: 5000,
    sku: "SD-LOGO-001",
    category: "Logo Design",
    images: [basicTeeImage], // Will be replaced with design previews
    description: "Custom logo design that represents your brand perfectly.",
    features: ["3 concept variations", "Unlimited revisions", "Vector files included", "Brand guide"],
    variants: [
      { name: "Package", options: ["Basic", "Premium", "Enterprise"] },
      { name: "Delivery", options: ["3 days", "5 days", "7 days"] }
    ]
  },
  {
    id: "tshirt-design",
    name: "T-Shirt Design",
    price: 3500,
    sku: "SD-TSHIRT-002", 
    category: "T-Shirt Design",
    images: [premiumShirtImage], // Will be replaced with t-shirt mockups
    description: "Eye-catching t-shirt designs for your brand or event.",
    features: ["Print-ready files", "Multiple sizes", "Color variations", "Mockup included"],
    variants: [
      { name: "Style", options: ["Minimalist", "Vintage", "Modern", "Artistic"] },
      { name: "Colors", options: ["1 Color", "2 Colors", "Full Color"] }
    ]
  },
  {
    id: "ui-design",
    name: "UI/UX Design",
    price: 12000,
    sku: "SD-UI-003",
    category: "UI/UX Design", 
    images: [basicTeeImage], // Will be replaced with UI previews
    description: "Modern and intuitive user interface designs for web and mobile.",
    features: ["Wireframes", "Interactive prototypes", "Design system", "Developer handoff"],
    variants: [
      { name: "Platform", options: ["Web", "Mobile", "Both"] },
      { name: "Pages", options: ["5 pages", "10 pages", "15+ pages"] }
    ]
  },
  {
    id: "business-card",
    name: "Business Card Design",
    price: 2000,
    sku: "SD-CARD-004",
    category: "Print Design",
    images: [premiumShirtImage], // Will be replaced with card designs
    description: "Professional business cards that make a lasting impression.",
    features: ["Double-sided design", "Print-ready files", "Multiple layouts", "QR code integration"],
    variants: [
      { name: "Finish", options: ["Matte", "Glossy", "Premium"] },
      { name: "Quantity", options: ["100", "500", "1000"] }
    ]
  },
  {
    id: "social-media-kit",
    name: "Social Media Design Kit",
    price: 8500,
    sku: "SD-SOCIAL-005",
    category: "Social Media",
    images: [basicTeeImage], // Will be replaced with social media templates
    description: "Complete social media branding kit for all platforms.",
    features: ["Instagram templates", "Facebook covers", "Story templates", "Post designs"],
    variants: [
      { name: "Platform", options: ["Instagram", "Facebook", "All Platforms"] },
      { name: "Templates", options: ["10 designs", "20 designs", "30+ designs"] }
    ]
  },
  {
    id: "custom-illustration",
    name: "Custom Illustration",
    price: 15000,
    sku: "SD-ILLUS-006", 
    category: "Illustration",
    images: [premiumShirtImage], // Will be replaced with illustration samples
    description: "Unique custom illustrations for your brand or personal use.",
    features: ["Hand-drawn artwork", "Digital rendering", "Multiple formats", "Commercial license"],
    variants: [
      { name: "Style", options: ["Realistic", "Cartoon", "Abstract", "Minimalist"] },
      { name: "Complexity", options: ["Simple", "Detailed", "Highly Complex"] }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (count: number = 6): Product[] => {
  return products.slice(0, count);
};