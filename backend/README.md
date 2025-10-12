# Graphic Design Site Backend

A Node.js/Express backend API for the graphic design site, integrated with Neon PostgreSQL database and Sanity CMS.

## Features

- **RESTful API** for products, orders, and content management
- **PostgreSQL Database** with Neon cloud hosting
- **Sanity CMS Integration** for content management
- **JWT Authentication** (ready for implementation)
- **Order Management** with status tracking
- **Image Upload** support via Cloudinary
- **Rate Limiting** and security middleware
- **Comprehensive Error Handling**

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **CMS**: Sanity
- **Authentication**: JWT
- **File Upload**: Cloudinary
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon account)
- Sanity account and project
- Cloudinary account (optional, for image uploads)

## Installation

1. **Clone and navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your actual values:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Neon PostgreSQL Database
   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   DB_HOST=ep-xxx-xxx.us-east-1.aws.neon.tech
   DB_PORT=5432
   DB_NAME=neondb
   DB_USER=username
   DB_PASSWORD=password

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d

   # Sanity CMS Configuration
   SANITY_PROJECT_ID=your-sanity-project-id
   SANITY_DATASET=production
   SANITY_API_VERSION=2023-12-01
   SANITY_TOKEN=your-sanity-token

   # Cloudinary Configuration (for image uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # WhatsApp Configuration
   WHATSAPP_NUMBER=your-whatsapp-number

   # CORS Configuration
   FRONTEND_URL=http://localhost:5173
   ```

4. **Set up the database**:
   ```bash
   npm run migrate
   ```

5. **Seed the database** (optional):
   ```bash
   npm run seed
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Products
- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:slug` - Get product by slug
- `POST /api/products/sync-sanity` - Sync products from Sanity CMS

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/customer/:email` - Get orders by customer email
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/stats` - Get order statistics (admin)

### Health Check
- `GET /health` - Server health check

## Database Schema

The database includes the following main tables:

- **users** - User accounts and authentication
- **categories** - Product categories
- **products** - Product information
- **product_images** - Product image gallery
- **product_features** - Product features list
- **product_variants** - Product variant options
- **orders** - Order information
- **order_items** - Individual order items
- **cart_items** - Persistent cart storage
- **contact_messages** - Contact form submissions
- **portfolio_projects** - Portfolio showcase

## Sanity CMS Integration

The backend automatically syncs with Sanity CMS for:
- Product data management
- Content updates
- Image assets
- SEO metadata

### Setting up Sanity

1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Install Sanity CLI: `npm install -g @sanity/cli`
3. Create schemas for products, categories, and portfolio projects
4. Configure the project ID and token in your `.env` file

## Deployment

### Neon Database Setup

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new database
3. Copy the connection string to your `.env` file
4. Run migrations: `npm run migrate`

### Environment Variables for Production

Make sure to set these in your production environment:
- `NODE_ENV=production`
- `DATABASE_URL` (your Neon connection string)
- `JWT_SECRET` (strong secret key)
- `SANITY_PROJECT_ID` and `SANITY_TOKEN`
- `FRONTEND_URL` (your production frontend URL)

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data

## Error Handling

The API includes comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)
- Database constraint violations
- Network errors

## Security Features

- **Helmet.js** for security headers
- **CORS** configuration
- **Rate limiting** (100 requests per 15 minutes per IP)
- **Input validation** with Joi
- **SQL injection** protection with parameterized queries
- **XSS protection** with proper content types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
