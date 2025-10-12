import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

// Sanity client configuration
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2023-12-01',
  token: process.env.SANITY_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
});

// Sanity queries
export const sanityQueries = {
  // Get all products from Sanity
  getAllProducts: `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    description,
    shortDescription,
    price,
    sku,
    category->{
      _id,
      name,
      slug
    },
    images[]{
      asset->{
        _id,
        url
      },
      alt
    },
    features[],
    variants[]{
      name,
      options[]
    },
    isActive,
    isFeatured,
    metaTitle,
    metaDescription,
    _createdAt,
    _updatedAt
  }`,

  // Get product by slug
  getProductBySlug: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    shortDescription,
    price,
    sku,
    category->{
      _id,
      name,
      slug
    },
    images[]{
      asset->{
        _id,
        url
      },
      alt
    },
    features[],
    variants[]{
      name,
      options[]
    },
    isActive,
    isFeatured,
    metaTitle,
    metaDescription,
    _createdAt,
    _updatedAt
  }`,

  // Get all categories
  getAllCategories: `*[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    image{
      asset->{
        _id,
        url
      }
    },
    isActive,
    order
  }`,

  // Get portfolio projects
  getAllPortfolioProjects: `*[_type == "portfolioProject"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    mainImage{
      asset->{
        _id,
        url
      }
    },
    gallery[]{
      asset->{
        _id,
        url
      }
    },
    clientName,
    projectDate,
    isFeatured,
    isActive,
    _createdAt,
    _updatedAt
  }`,

  // Get featured portfolio projects
  getFeaturedPortfolioProjects: `*[_type == "portfolioProject" && isFeatured == true && isActive == true] | order(_createdAt desc) [0...6] {
    _id,
    title,
    slug,
    description,
    category,
    mainImage{
      asset->{
        _id,
        url
      }
    },
    clientName,
    projectDate
  }`,

  // Get site settings
  getSiteSettings: `*[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteDescription,
    logo{
      asset->{
        _id,
        url
      }
    },
    contactEmail,
    contactPhone,
    whatsappNumber,
    socialMedia{
      facebook,
      instagram,
      twitter,
      linkedin
    },
    seo{
      metaTitle,
      metaDescription,
      keywords[]
    }
  }`
};

// Sanity service functions
export class SanityService {
  // Get all products
  static async getAllProducts() {
    try {
      const products = await sanityClient.fetch(sanityQueries.getAllProducts);
      return products;
    } catch (error) {
      console.error('Error fetching products from Sanity:', error);
      throw error;
    }
  }

  // Get product by slug
  static async getProductBySlug(slug) {
    try {
      const product = await sanityClient.fetch(sanityQueries.getProductBySlug, { slug });
      return product;
    } catch (error) {
      console.error('Error fetching product from Sanity:', error);
      throw error;
    }
  }

  // Get all categories
  static async getAllCategories() {
    try {
      const categories = await sanityClient.fetch(sanityQueries.getAllCategories);
      return categories;
    } catch (error) {
      console.error('Error fetching categories from Sanity:', error);
      throw error;
    }
  }

  // Get portfolio projects
  static async getPortfolioProjects(featured = false) {
    try {
      const query = featured ? sanityQueries.getFeaturedPortfolioProjects : sanityQueries.getAllPortfolioProjects;
      const projects = await sanityClient.fetch(query);
      return projects;
    } catch (error) {
      console.error('Error fetching portfolio projects from Sanity:', error);
      throw error;
    }
  }

  // Get site settings
  static async getSiteSettings() {
    try {
      const settings = await sanityClient.fetch(sanityQueries.getSiteSettings);
      return settings;
    } catch (error) {
      console.error('Error fetching site settings from Sanity:', error);
      throw error;
    }
  }

  // Sync product from Sanity to PostgreSQL
  static async syncProductToDatabase(sanityProduct, db) {
    try {
      const {
        _id: sanityId,
        name,
        slug,
        description,
        shortDescription,
        price,
        sku,
        category,
        images,
        features,
        variants,
        isActive,
        isFeatured,
        metaTitle,
        metaDescription
      } = sanityProduct;

      // Check if product exists
      const existingProduct = await db.query(
        'SELECT id FROM products WHERE sanity_id = $1',
        [sanityId]
      );

      const productData = {
        sanity_id: sanityId,
        name,
        slug: slug.current,
        description,
        short_description: shortDescription,
        price: parseFloat(price),
        sku,
        is_active: isActive !== false,
        is_featured: isFeatured === true,
        meta_title: metaTitle,
        meta_description: metaDescription
      };

      let productId;
      if (existingProduct.rows.length > 0) {
        // Update existing product
        const updateQuery = `
          UPDATE products 
          SET name = $2, slug = $3, description = $4, short_description = $5, 
              price = $6, sku = $7, is_active = $8, is_featured = $9, 
              meta_title = $10, meta_description = $11, updated_at = CURRENT_TIMESTAMP
          WHERE sanity_id = $1
          RETURNING id
        `;
        const result = await db.query(updateQuery, [
          sanityId, name, slug.current, description, shortDescription,
          parseFloat(price), sku, isActive !== false, isFeatured === true,
          metaTitle, metaDescription
        ]);
        productId = result.rows[0].id;
      } else {
        // Insert new product
        const insertQuery = `
          INSERT INTO products (sanity_id, name, slug, description, short_description, 
                              price, sku, is_active, is_featured, meta_title, meta_description)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          RETURNING id
        `;
        const result = await db.query(insertQuery, [
          sanityId, name, slug.current, description, shortDescription,
          parseFloat(price), sku, isActive !== false, isFeatured === true,
          metaTitle, metaDescription
        ]);
        productId = result.rows[0].id;
      }

      // Handle category
      if (category) {
        const categoryResult = await db.query(
          'SELECT id FROM categories WHERE sanity_id = $1',
          [category._id]
        );
        if (categoryResult.rows.length > 0) {
          await db.query(
            'UPDATE products SET category_id = $1 WHERE id = $2',
            [categoryResult.rows[0].id, productId]
          );
        }
      }

      // Handle images
      if (images && images.length > 0) {
        // Delete existing images
        await db.query('DELETE FROM product_images WHERE product_id = $1', [productId]);
        
        // Insert new images
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          await db.query(
            'INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES ($1, $2, $3, $4, $5)',
            [productId, image.asset.url, image.alt || '', i, i === 0]
          );
        }
      }

      // Handle features
      if (features && features.length > 0) {
        // Delete existing features
        await db.query('DELETE FROM product_features WHERE product_id = $1', [productId]);
        
        // Insert new features
        for (let i = 0; i < features.length; i++) {
          await db.query(
            'INSERT INTO product_features (product_id, feature_text, sort_order) VALUES ($1, $2, $3)',
            [productId, features[i], i]
          );
        }
      }

      // Handle variants
      if (variants && variants.length > 0) {
        // Delete existing variants
        await db.query('DELETE FROM product_variants WHERE product_id = $1', [productId]);
        
        // Insert new variants
        for (let i = 0; i < variants.length; i++) {
          const variant = variants[i];
          await db.query(
            'INSERT INTO product_variants (product_id, variant_name, variant_options, sort_order) VALUES ($1, $2, $3, $4)',
            [productId, variant.name, JSON.stringify(variant.options), i]
          );
        }
      }

      return productId;
    } catch (error) {
      console.error('Error syncing product to database:', error);
      throw error;
    }
  }
}

export default sanityClient;
