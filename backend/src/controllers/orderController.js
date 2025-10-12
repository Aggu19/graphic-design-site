import { query, getClient } from '../database/connection.js';
import { v4 as uuidv4 } from 'uuid';

export class OrderController {
  // Create new order
  static async createOrder(req, res) {
    const client = await getClient();
    
    try {
      await client.query('BEGIN');
      
      const {
        customerEmail,
        customerName,
        customerPhone,
        items,
        shippingAddress,
        billingAddress,
        notes
      } = req.body;

      // Validate required fields
      if (!customerEmail || !customerName || !items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: customerEmail, customerName, and items are required'
        });
      }

      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Calculate totals
      let subtotal = 0;
      const orderItems = [];

      for (const item of items) {
        // Get product details
        const productResult = await client.query(
          'SELECT id, name, sku, price FROM products WHERE id = $1 AND is_active = true',
          [item.productId]
        );

        if (productResult.rows.length === 0) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        const product = productResult.rows[0];
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        orderItems.push({
          productId: product.id,
          productName: product.name,
          productSku: product.sku,
          quantity: item.quantity,
          unitPrice: product.price,
          totalPrice: itemTotal,
          variantOptions: item.variantOptions || {}
        });
      }

      const taxAmount = subtotal * 0.13; // 13% tax
      const shippingAmount = subtotal > 5000 ? 0 : 500; // Free shipping over Rs 5000
      const totalAmount = subtotal + taxAmount + shippingAmount;

      // Create order
      const orderResult = await client.query(
        `INSERT INTO orders (
          order_number, customer_email, customer_name, customer_phone,
          subtotal, tax_amount, shipping_amount, total_amount,
          shipping_address, billing_address, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id, order_number, created_at`,
        [
          orderNumber,
          customerEmail,
          customerName,
          customerPhone,
          subtotal,
          taxAmount,
          shippingAmount,
          totalAmount,
          JSON.stringify(shippingAddress),
          JSON.stringify(billingAddress),
          notes
        ]
      );

      const order = orderResult.rows[0];

      // Create order items
      for (const item of orderItems) {
        await client.query(
          `INSERT INTO order_items (
            order_id, product_id, product_name, product_sku,
            quantity, unit_price, total_price, variant_options
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            order.id,
            item.productId,
            item.productName,
            item.productSku,
            item.quantity,
            item.unitPrice,
            item.totalPrice,
            JSON.stringify(item.variantOptions)
          ]
        );
      }

      await client.query('COMMIT');

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: {
          orderId: order.id,
          orderNumber: order.order_number,
          totalAmount,
          createdAt: order.created_at
        }
      });

    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error creating order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create order',
        error: error.message
      });
    } finally {
      client.release();
    }
  }

  // Get order by ID
  static async getOrderById(req, res) {
    try {
      const { id } = req.params;

      const orderQuery = `
        SELECT 
          o.id,
          o.order_number,
          o.customer_email,
          o.customer_name,
          o.customer_phone,
          o.status,
          o.payment_status,
          o.subtotal,
          o.tax_amount,
          o.shipping_amount,
          o.total_amount,
          o.shipping_address,
          o.billing_address,
          o.notes,
          o.created_at,
          o.updated_at
        FROM orders o
        WHERE o.id = $1
      `;

      const orderResult = await query(orderQuery, [id]);
      
      if (orderResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      const order = orderResult.rows[0];

      // Get order items
      const itemsQuery = `
        SELECT 
          oi.id,
          oi.product_id,
          oi.product_name,
          oi.product_sku,
          oi.quantity,
          oi.unit_price,
          oi.total_price,
          oi.variant_options,
          pi.image_url as product_image
        FROM order_items oi
        LEFT JOIN product_images pi ON oi.product_id = pi.product_id AND pi.is_primary = true
        WHERE oi.order_id = $1
        ORDER BY oi.created_at
      `;

      const itemsResult = await query(itemsQuery, [id]);
      order.items = itemsResult.rows;

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order',
        error: error.message
      });
    }
  }

  // Get orders by customer email
  static async getOrdersByEmail(req, res) {
    try {
      const { email } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const offset = (parseInt(page) - 1) * parseInt(limit);

      const ordersQuery = `
        SELECT 
          o.id,
          o.order_number,
          o.status,
          o.payment_status,
          o.total_amount,
          o.created_at
        FROM orders o
        WHERE o.customer_email = $1
        ORDER BY o.created_at DESC
        LIMIT $2 OFFSET $3
      `;

      const ordersResult = await query(ordersQuery, [email, parseInt(limit), offset]);
      const orders = ordersResult.rows;

      // Get count for pagination
      const countResult = await query(
        'SELECT COUNT(*) as total FROM orders WHERE customer_email = $1',
        [email]
      );
      const total = parseInt(countResult.rows[0].total);
      const totalPages = Math.ceil(total / parseInt(limit));

      res.json({
        success: true,
        data: {
          orders,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalItems: total,
            itemsPerPage: parseInt(limit)
          }
        }
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      });
    }
  }

  // Update order status
  static async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, paymentStatus } = req.body;

      if (!status && !paymentStatus) {
        return res.status(400).json({
          success: false,
          message: 'Either status or paymentStatus is required'
        });
      }

      let updateQuery = 'UPDATE orders SET updated_at = CURRENT_TIMESTAMP';
      const params = [];
      let paramCount = 0;

      if (status) {
        paramCount++;
        updateQuery += `, status = $${paramCount}`;
        params.push(status);
      }

      if (paymentStatus) {
        paramCount++;
        updateQuery += `, payment_status = $${paramCount}`;
        params.push(paymentStatus);
      }

      paramCount++;
      updateQuery += ` WHERE id = $${paramCount} RETURNING *`;
      params.push(id);

      const result = await query(updateQuery, params);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.json({
        success: true,
        message: 'Order status updated successfully',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order status',
        error: error.message
      });
    }
  }

  // Get order statistics (admin only)
  static async getOrderStats(req, res) {
    try {
      const statsQuery = `
        SELECT 
          COUNT(*) as total_orders,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
          COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
          COUNT(CASE WHEN payment_status = 'paid' THEN 1 END) as paid_orders,
          COALESCE(SUM(CASE WHEN payment_status = 'paid' THEN total_amount END), 0) as total_revenue,
          COALESCE(AVG(CASE WHEN payment_status = 'paid' THEN total_amount END), 0) as average_order_value
        FROM orders
        WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      `;

      const statsResult = await query(statsQuery);
      const stats = statsResult.rows[0];

      res.json({
        success: true,
        data: {
          totalOrders: parseInt(stats.total_orders),
          completedOrders: parseInt(stats.completed_orders),
          pendingOrders: parseInt(stats.pending_orders),
          paidOrders: parseInt(stats.paid_orders),
          totalRevenue: parseFloat(stats.total_revenue),
          averageOrderValue: parseFloat(stats.average_order_value)
        }
      });
    } catch (error) {
      console.error('Error fetching order stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order statistics',
        error: error.message
      });
    }
  }
}
