import { Product } from "@/components/ProductCard";
import basicTeeImage from "@/assets/basic-tee-black.jpg";
import premiumShirtImage from "@/assets/premium-shirt-blue.jpg";

export const products: Product[] = [
  {
    id: "basic-tee",
    name: "Basic Tee",
    price: 2500,
    sku: "ST-TEE-001",
    category: "Tops",
    images: [basicTeeImage],
    description: "Soft cotton everyday tee.",
    features: ["100% cotton", "Breathable", "S–XL"],
    variants: [
      { name: "Color", options: ["Black", "White", "Navy"] },
      { name: "Size", options: ["S", "M", "L", "XL"] }
    ]
  },
  {
    id: "premium-shirt",
    name: "Premium Shirt",
    price: 4900,
    sku: "ST-SHIRT-002",
    category: "Shirts",
    images: [premiumShirtImage],
    description: "Tailored fit, wrinkle-resistant.",
    features: ["Stretch fabric", "Easy care"],
    variants: [
      { name: "Color", options: ["Light Blue", "Charcoal"] },
      { name: "Neck", options: ["Classic", "Button-down"] },
      { name: "Size", options: ["S", "M", "L", "XL"] }
    ]
  },
  {
    id: "hoodie",
    name: "Hoodie",
    price: 6900,
    sku: "ST-HOODIE-003",
    category: "Hoodies",
    images: [basicTeeImage], // Placeholder - will be replaced with hoodie image
    description: "Comfortable fleece-lined hoodie.",
    features: ["Fleece lined", "Unisex", "Kangaroo pocket"],
    variants: [
      { name: "Color", options: ["Black", "Gray", "Navy"] },
      { name: "Size", options: ["S", "M", "L", "XL", "XXL"] }
    ]
  },
  {
    id: "polo-shirt",
    name: "Polo Shirt", 
    price: 3900,
    sku: "ST-POLO-004",
    category: "Shirts",
    images: [premiumShirtImage], // Placeholder
    description: "Classic polo with modern cut.",
    features: ["Pique fabric", "Collar", "3-button placket"],
    variants: [
      { name: "Color", options: ["White", "Navy", "Green"] },
      { name: "Size", options: ["S", "M", "L", "XL"] }
    ]
  },
  {
    id: "denim-jacket",
    name: "Denim Jacket",
    price: 8900,
    sku: "ST-DENIM-005", 
    category: "Jackets",
    images: [basicTeeImage], // Placeholder
    description: "Classic denim jacket with modern styling.",
    features: ["100% cotton denim", "Chest pockets", "Button closure"],
    variants: [
      { name: "Color", options: ["Blue", "Black", "Light Blue"] },
      { name: "Size", options: ["S", "M", "L", "XL"] }
    ]
  },
  {
    id: "chinos",
    name: "Chinos",
    price: 5900,
    sku: "ST-CHINO-006",
    category: "Pants",
    images: [premiumShirtImage], // Placeholder
    description: "Versatile chino pants for any occasion.",
    features: ["Cotton twill", "Slim fit", "4 pockets"],
    variants: [
      { name: "Color", options: ["Khaki", "Navy", "Olive"] },
      { name: "Size", options: ["28", "30", "32", "34", "36"] }
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