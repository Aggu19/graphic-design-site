// Sample data for Sanity Studio
// You can use this to populate your studio with initial content

export const sampleCategories = [
  {
    _type: 'category',
    name: 'Logo Design',
    slug: { current: 'logo-design' },
    description: 'Professional logo designs for businesses and brands',
    isActive: true,
    order: 1
  },
  {
    _type: 'category',
    name: 'UI/UX Design',
    slug: { current: 'ui-ux-design' },
    description: 'User interface and experience design for web and mobile',
    isActive: true,
    order: 2
  },
  {
    _type: 'category',
    name: 'Print Design',
    slug: { current: 'print-design' },
    description: 'Business cards, flyers, and other print materials',
    isActive: true,
    order: 3
  },
  {
    _type: 'category',
    name: 'Social Media',
    slug: { current: 'social-media' },
    description: 'Social media graphics and marketing materials',
    isActive: true,
    order: 4
  }
]

export const sampleProducts = [
  {
    _type: 'product',
    name: 'Professional Logo Design',
    slug: { current: 'professional-logo-design' },
    description: 'Custom logo design that represents your brand perfectly. Includes 3 concept variations, unlimited revisions, vector files, and brand guidelines.',
    shortDescription: 'Custom logo design with 3 concepts and unlimited revisions',
    price: 500000, // Rs 5000 in cents
    sku: 'SD-LOGO-001',
    category: { _ref: 'category-logo-design' },
    features: [
      '3 concept variations',
      'Unlimited revisions',
      'Vector files included',
      'Brand guide',
      'Commercial license'
    ],
    variants: [
      {
        name: 'Package',
        options: ['Basic', 'Premium', 'Enterprise']
      },
      {
        name: 'Delivery',
        options: ['3 days', '5 days', '7 days']
      }
    ],
    isActive: true,
    isFeatured: true,
    metaTitle: 'Professional Logo Design - Custom Brand Identity',
    metaDescription: 'Get a professional logo design for your business. 3 concepts, unlimited revisions, vector files included. Starting at Rs 5000.'
  },
  {
    _type: 'product',
    name: 'T-Shirt Design',
    slug: { current: 't-shirt-design' },
    description: 'Eye-catching t-shirt designs for your brand or event. Perfect for merchandise, promotional items, or personal use.',
    shortDescription: 'Custom t-shirt designs with print-ready files',
    price: 350000, // Rs 3500 in cents
    sku: 'SD-TSHIRT-002',
    category: { _ref: 'category-print-design' },
    features: [
      'Print-ready files',
      'Multiple sizes',
      'Color variations',
      'Mockup included',
      'High resolution'
    ],
    variants: [
      {
        name: 'Style',
        options: ['Minimalist', 'Vintage', 'Modern', 'Artistic']
      },
      {
        name: 'Colors',
        options: ['1 Color', '2 Colors', 'Full Color']
      }
    ],
    isActive: true,
    isFeatured: true,
    metaTitle: 'Custom T-Shirt Design - Print Ready Graphics',
    metaDescription: 'Professional t-shirt designs for your brand. Print-ready files, multiple sizes, and color variations. Starting at Rs 3500.'
  },
  {
    _type: 'product',
    name: 'UI/UX Design',
    slug: { current: 'ui-ux-design' },
    description: 'Modern and intuitive user interface designs for web and mobile applications. Includes wireframes, prototypes, and design system.',
    shortDescription: 'Complete UI/UX design for web and mobile apps',
    price: 1200000, // Rs 12000 in cents
    sku: 'SD-UI-003',
    category: { _ref: 'category-ui-ux-design' },
    features: [
      'Wireframes',
      'Interactive prototypes',
      'Design system',
      'Developer handoff',
      'User testing'
    ],
    variants: [
      {
        name: 'Platform',
        options: ['Web', 'Mobile', 'Both']
      },
      {
        name: 'Pages',
        options: ['5 pages', '10 pages', '15+ pages']
      }
    ],
    isActive: true,
    isFeatured: true,
    metaTitle: 'UI/UX Design Services - Web & Mobile Apps',
    metaDescription: 'Professional UI/UX design for web and mobile applications. Wireframes, prototypes, and design system included. Starting at Rs 12000.'
  }
]

export const samplePortfolioProjects = [
  {
    _type: 'portfolioProject',
    title: 'E-commerce Brand Identity',
    slug: { current: 'ecommerce-brand-identity' },
    description: 'Complete brand identity design for a modern e-commerce platform including logo, color palette, typography, and brand guidelines.',
    category: 'branding',
    clientName: 'TechStart Inc.',
    projectDate: '2024-01-15',
    isFeatured: true,
    isActive: true,
    tags: ['branding', 'logo', 'e-commerce', 'modern']
  },
  {
    _type: 'portfolioProject',
    title: 'Mobile Banking App UI',
    slug: { current: 'mobile-banking-app-ui' },
    description: 'User interface design for a mobile banking application with focus on security, usability, and modern aesthetics.',
    category: 'ui-ux-design',
    clientName: 'FinanceFlow',
    projectDate: '2024-02-20',
    isFeatured: true,
    isActive: true,
    tags: ['mobile', 'banking', 'ui', 'ux', 'fintech']
  },
  {
    _type: 'portfolioProject',
    title: 'Restaurant Menu Design',
    slug: { current: 'restaurant-menu-design' },
    description: 'Elegant menu design for a fine dining restaurant with custom illustrations and premium typography.',
    category: 'print-design',
    clientName: 'Bella Vista Restaurant',
    projectDate: '2024-03-10',
    isFeatured: true,
    isActive: true,
    tags: ['menu', 'restaurant', 'print', 'elegant']
  }
]

export const sampleSiteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  siteName: 'Snap Designs',
  siteDescription: 'Professional graphic design services with transparent pricing and quick delivery. Custom logos, UI/UX design, and print materials.',
  contactEmail: 'hello@snapdesigns.com',
  contactPhone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  socialMedia: {
    facebook: 'https://facebook.com/snapdesigns',
    instagram: 'https://instagram.com/snapdesigns',
    twitter: 'https://twitter.com/snapdesigns',
    linkedin: 'https://linkedin.com/company/snapdesigns'
  },
  seo: {
    metaTitle: 'Snap Designs - Professional Graphic Design Services',
    metaDescription: 'Get professional graphic design services including logo design, UI/UX, print materials, and more. Transparent pricing, quick delivery, unlimited revisions.',
    keywords: ['graphic design', 'logo design', 'ui ux design', 'print design', 'branding', 'custom design']
  }
}
