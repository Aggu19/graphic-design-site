# Complete Integration Setup Guide

This guide will help you integrate Neon PostgreSQL backend, Sanity CMS, and update your React frontend for the graphic design site.

## 🎯 What We've Built

✅ **Neon Backend Service** - Express.js API with PostgreSQL database  
✅ **Sanity CMS Integration** - Content management for products and portfolio  
✅ **Frontend API Integration** - React hooks and services for data fetching  
✅ **Database Schema** - Complete schema for products, orders, users, and content  
✅ **Environment Configuration** - Production-ready environment setup  

## 🚀 Quick Start

### 1. Backend Setup (Neon + Express.js)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp env.example .env

# Edit .env with your credentials (see details below)
# Then run database migrations
npm run migrate

# Start development server
npm run dev
```

### 2. Sanity CMS Setup

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Navigate to sanity directory
cd sanity

# Initialize Sanity project (if not already done)
sanity init

# Start Sanity Studio
sanity start
```

### 3. Frontend Setup

```bash
# In the root directory
npm install

# Copy environment template
cp env.example .env

# Edit .env with your API URL
# Start development server
npm run dev
```

## 🔧 Detailed Configuration

### Neon Database Setup

1. **Create Neon Account**:
   - Go to [neon.tech](https://neon.tech)
   - Sign up and create a new project
   - Copy your connection string

2. **Configure Environment**:
   ```env
   # In backend/.env
   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   DB_HOST=ep-xxx-xxx.us-east-1.aws.neon.tech
   DB_PORT=5432
   DB_NAME=neondb
   DB_USER=username
   DB_PASSWORD=password
   ```

3. **Run Migrations**:
   ```bash
   cd backend
   npm run migrate
   ```

### Sanity CMS Setup

1. **Create Sanity Project**:
   - Go to [sanity.io](https://sanity.io)
   - Create a new project
   - Note your Project ID

2. **Configure Schemas**:
   - Copy the schema files from `sanity/schemas/` to your Sanity project
   - Or use the provided schemas as reference

3. **Get API Token**:
   - In Sanity Studio, go to API settings
   - Create a new token with read/write permissions
   - Copy the token

4. **Configure Environment**:
   ```env
   # In backend/.env
   SANITY_PROJECT_ID=your-sanity-project-id
   SANITY_DATASET=production
   SANITY_API_VERSION=2023-12-01
   SANITY_TOKEN=your-sanity-token
   ```

### Frontend Configuration

1. **Update Environment**:
   ```env
   # In .env (root directory)
   VITE_API_URL=http://localhost:5000/api
   VITE_WHATSAPP_NUMBER=your-whatsapp-number
   VITE_SITE_NAME=Snap Designs
   VITE_SITE_DESCRIPTION=Professional graphic design services
   ```

2. **Update WhatsApp Numbers**:
   - Replace `YOUR_WHATSAPP_NUMBER` in components with your actual number
   - Update the CartContext with your WhatsApp number

## 📊 Database Schema Overview

The database includes these main tables:

- **users** - User accounts and authentication
- **categories** - Product categories from Sanity
- **products** - Product information synced from Sanity
- **product_images** - Product image gallery
- **product_features** - Product features list
- **product_variants** - Product variant options
- **orders** - Order information and status
- **order_items** - Individual order items
- **cart_items** - Persistent cart storage
- **contact_messages** - Contact form submissions
- **portfolio_projects** - Portfolio showcase from Sanity

## 🔄 Data Flow

1. **Content Management**: Sanity CMS → Backend API → Frontend
2. **Product Data**: Sanity → PostgreSQL → React Components
3. **Orders**: Frontend → Backend API → PostgreSQL
4. **Real-time Updates**: Sanity webhooks → Backend sync → Frontend refresh

## 🛠 API Endpoints

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:slug` - Get product by slug
- `POST /api/products/sync-sanity` - Sync from Sanity

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/customer/:email` - Get customer orders
- `PUT /api/orders/:id/status` - Update order status

### Health Check
- `GET /health` - Server health check

## 🎨 Sanity Studio Features

### Product Management
- Rich text descriptions
- Image galleries with alt text
- Variant options (size, color, etc.)
- SEO metadata
- Featured product flags

### Portfolio Management
- Project showcase
- Client information
- Category organization
- Image galleries
- Project dates

### Site Settings
- Global site configuration
- Contact information
- Social media links
- SEO settings

## 🔐 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for your frontend domain
- **Input Validation**: Joi schema validation
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: Proper content types and sanitization

## 🚀 Deployment

### Backend Deployment (Railway/Render/Vercel)

1. **Set Environment Variables**:
   ```env
   NODE_ENV=production
   DATABASE_URL=your-neon-connection-string
   SANITY_PROJECT_ID=your-project-id
   SANITY_TOKEN=your-token
   FRONTEND_URL=https://your-frontend-domain.com
   ```

2. **Deploy**:
   ```bash
   # Build and deploy
   npm run build
   npm start
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Set Environment Variables**:
   ```env
   VITE_API_URL=https://your-backend-domain.com/api
   VITE_WHATSAPP_NUMBER=your-whatsapp-number
   ```

2. **Deploy**:
   ```bash
   npm run build
   # Deploy the dist folder
   ```

## 🔄 Syncing Data

### Manual Sync
```bash
# Sync products from Sanity to database
curl -X POST http://localhost:5000/api/products/sync-sanity
```

### Automatic Sync
- Set up Sanity webhooks to trigger sync on content changes
- Configure webhook URL: `https://your-backend.com/api/products/sync-sanity`

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**:
   - Check your Neon connection string
   - Ensure SSL is enabled
   - Verify database credentials

2. **Sanity Sync Issues**:
   - Verify Sanity project ID and token
   - Check API permissions
   - Ensure schemas match database structure

3. **CORS Errors**:
   - Update `FRONTEND_URL` in backend environment
   - Check CORS configuration in server.js

4. **Image Upload Issues**:
   - Configure Cloudinary credentials
   - Check image size limits
   - Verify file permissions

### Debug Mode

```bash
# Backend with debug logging
NODE_ENV=development npm run dev

# Frontend with API debugging
VITE_DEBUG=true npm run dev
```

## 📈 Performance Optimization

### Database
- Indexes on frequently queried columns
- Connection pooling
- Query optimization

### Frontend
- React Query for caching
- Image optimization
- Lazy loading

### API
- Response compression
- Rate limiting
- Caching headers

## 🔮 Future Enhancements

- **Real-time Updates**: WebSocket integration
- **Advanced Search**: Elasticsearch integration
- **Analytics**: Google Analytics integration
- **Email Notifications**: Order confirmations
- **Payment Integration**: Stripe/PayPal
- **Admin Dashboard**: Order management interface

## 📞 Support

If you encounter any issues:

1. Check the logs in both frontend and backend
2. Verify all environment variables are set correctly
3. Ensure all services are running (Neon, Sanity, Backend)
4. Check network connectivity and CORS settings

## 🎉 You're All Set!

Your graphic design site now has:
- ✅ Dynamic content management with Sanity
- ✅ Scalable PostgreSQL database with Neon
- ✅ RESTful API with Express.js
- ✅ Modern React frontend with API integration
- ✅ Order management system
- ✅ Portfolio showcase
- ✅ Production-ready deployment configuration

Start by setting up your Sanity content, then sync it to your database, and your site will be fully functional!
