import { query } from '../database/connection.js';
import { SanityService } from '../services/sanity.js';

export class ProductController {
  // Get all products with optional filtering
  static async getAllProducts(req, res) {
    try {
      const { 
        category, 
        featured, 
        search, 
        page = 1, 
        limit = 12, 
        sort = 'created_at',
        order = 'desc'
      } = req.query;

      let whereClause = 'WHERE p.is_active = true';
      const params = [];
      let paramCount = 0;

      // Category filter
      if (category) {
        paramCount++;
        whereClause += ` AND c.slug = $${paramCount}`;
        params.push(category);
      }

      // Featured filter
      if (featured === 'true') {
        whereClause += ' AND p.is_featured = true';
      }

      // Search filter
      if (search) {
        paramCount++;
        whereClause += ` AND (p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`;
        params.push(`%${search}%`);
      }

      // Valid sort columns
      const validSortColumns = ['created_at', 'updated_at', 'name', 'price'];
      const sortColumn = validSortColumns.includes(sort) ? sort : 'created_at';
      const sortOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

      // Count total products
      const countQuery = `
        SELECT COUNT(*) as total
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ${whereClause}
      `;
      const countResult = await query(countQuery, params);
      const total = parseInt(countResult.rows[0].total);

      // Calculate pagination
      const offset = (parseInt(page) - 1) * parseInt(limit);
      const totalPages = Math.ceil(total / parseInt(limit));

      // Get products with pagination
      paramCount++;
      const limitParam = `$${paramCount}`;
      paramCount++;
      const offsetParam = `$${paramCount}`;
      params.push(parseInt(limit), offset);

      const productsQuery = `
        SELECT 
          p.id,
          p.name,
          p.slug,
          p.description,
          p.short_description,
          p.price,
          p.sku,
          p.is_featured,
          p.created_at,
          p.updated_at,
          c.name as category_name,
          c.slug as category_slug,
          pi.image_url as primary_image,
          pi.alt_text as image_alt
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
        ${whereClause}
        ORDER BY p.${sortColumn} ${sortOrder}
        LIMIT ${limitParam} OFFSET ${offsetParam}
      `;

      const productsResult = await query(productsQuery, params);
      const products = productsResult.rows;

      // Get features and variants for each product
      for (const product of products) {
        // Get features
        const featuresResult = await query(
          'SELECT feature_text FROM product_features WHERE product_id = $1 ORDER BY sort_order',
          [product.id]
        );
        product.features = featuresResult.rows.map(row => row.feature_text);

        // Get variants
        const variantsResult = await query(
          'SELECT variant_name, variant_options FROM product_variants WHERE product_id = $1 ORDER BY sort_order',
          [product.id]
        );
        product.variants = variantsResult.rows.map(row => ({
          name: row.variant_name,
          options: row.variant_options
        }));

        // Get all images
        const imagesResult = await query(
          'SELECT image_url, alt_text FROM product_images WHERE product_id = $1 ORDER BY sort_order',
          [product.id]
        );
        product.images = imagesResult.rows.map(row => row.image_url);
      }

      res.json({
        success: true,
        data: {
          products,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalItems: total,
            itemsPerPage: parseInt(limit),
            hasNextPage: parseInt(page) < totalPages,
            hasPrevPage: parseInt(page) > 1
          }
        }
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
        error: error.message
      });
    }
  }

  // Get product by slug
  static async getProductBySlug(req, res) {
    try {
      const { slug } = req.params;

      const productQuery = `
        SELECT 
          p.id,
          p.name,
          p.slug,
          p.description,
          p.short_description,
          p.price,
          p.sku,
          p.is_featured,
          p.meta_title,
          p.meta_description,
          p.created_at,
          p.updated_at,
          c.name as category_name,
          c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.slug = $1 AND p.is_active = true
      `;

      const productResult = await query(productQuery, [slug]);
      
      if (productResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      const product = productResult.rows[0];

      // Get features
      const featuresResult = await query(
        'SELECT feature_text FROM product_features WHERE product_id = $1 ORDER BY sort_order',
        [product.id]
      );
      product.features = featuresResult.rows.map(row => row.feature_text);

      // Get variants
      const variantsResult = await query(
        'SELECT variant_name, variant_options FROM product_variants WHERE product_id = $1 ORDER BY sort_order',
        [product.id]
      );
      product.variants = variantsResult.rows.map(row => ({
        name: row.variant_name,
        options: row.variant_options
      }));

      // Get all images
      const imagesResult = await query(
        'SELECT image_url, alt_text FROM product_images WHERE product_id = $1 ORDER BY sort_order',
        [product.id]
      );
      product.images = imagesResult.rows.map(row => row.image_url);

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch product',
        error: error.message
      });
    }
  }

  // Get featured products
  static async getFeaturedProducts(req, res) {
    try {
      const { limit = 6 } = req.query;

      const productsQuery = `
        SELECT 
          p.id,
          p.name,
          p.slug,
          p.description,
          p.short_description,
          p.price,
          p.sku,
          p.created_at,
          c.name as category_name,
          c.slug as category_slug,
          pi.image_url as primary_image,
          pi.alt_text as image_alt
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
        WHERE p.is_active = true AND p.is_featured = true
        ORDER BY p.created_at DESC
        LIMIT $1
      `;

      const productsResult = await query(productsQuery, [parseInt(limit)]);
      const products = productsResult.rows;

      // Get features for each product
      for (const product of products) {
        const featuresResult = await query(
          'SELECT feature_text FROM product_features WHERE product_id = $1 ORDER BY sort_order LIMIT 3',
          [product.id]
        );
        product.features = featuresResult.rows.map(row => row.feature_text);

        // Get all images
        const imagesResult = await query(
          'SELECT image_url FROM product_images WHERE product_id = $1 ORDER BY sort_order',
          [product.id]
        );
        product.images = imagesResult.rows.map(row => row.image_url);
      }

      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      console.error('Error fetching featured products:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch featured products',
        error: error.message
      });
    }
  }

  // Sync products from Sanity
  static async syncFromSanity(req, res) {
    try {
      const sanityProducts = await SanityService.getAllProducts();
      const syncedProducts = [];

      for (const sanityProduct of sanityProducts) {
        try {
          const productId = await SanityService.syncProductToDatabase(sanityProduct, { query });
          syncedProducts.push({
            sanityId: sanityProduct._id,
            productId,
            name: sanityProduct.name
          });
        } catch (error) {
          console.error(`Error syncing product ${sanityProduct.name}:`, error);
        }
      }

      res.json({
        success: true,
        message: `Synced ${syncedProducts.length} products from Sanity`,
        data: syncedProducts
      });
    } catch (error) {
      console.error('Error syncing products from Sanity:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to sync products from Sanity',
        error: error.message
      });
    }
  }
}
