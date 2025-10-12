# Snap Designs - Sanity Studio

This is the Sanity Studio for the Snap Designs graphic design website. It provides a content management interface for products, portfolio projects, categories, and site settings.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Create a `.env.local` file in the studio directory:
```env
SANITY_STUDIO_TOKEN=your-sanity-token-here
```

To get your Sanity token:
1. Go to [sanity.io](https://sanity.io)
2. Navigate to your project settings
3. Go to API settings
4. Create a new token with read/write permissions

### 3. Start the Studio
```bash
npm run dev
```

The studio will be available at `http://localhost:3333`

### 4. Seed Initial Data (Optional)
```bash
npm run seed
```

This will populate your studio with sample categories, products, and portfolio projects.

## 📁 Content Structure

### Products
- **Name & Description**: Product title and detailed description
- **Pricing**: Price in cents (e.g., 500000 = Rs 5000)
- **SKU**: Unique product identifier
- **Category**: Reference to product category
- **Images**: Product gallery with alt text
- **Features**: List of product features
- **Variants**: Product options (size, color, etc.)
- **SEO**: Meta title and description
- **Status**: Active/Inactive and Featured flags

### Categories
- **Name & Description**: Category title and description
- **Slug**: URL-friendly identifier
- **Image**: Category thumbnail
- **Sort Order**: Display order in navigation
- **Status**: Active/Inactive

### Portfolio Projects
- **Title & Description**: Project name and details
- **Category**: Project type (logo, UI/UX, print, etc.)
- **Images**: Main image and gallery
- **Client Info**: Client name and project date
- **Tags**: Searchable project tags
- **Status**: Active/Inactive and Featured flags

### Site Settings
- **Site Info**: Name, description, logo
- **Contact**: Email, phone, WhatsApp number
- **Social Media**: Links to social profiles
- **SEO**: Global meta tags and keywords

## 🎨 Custom Features

### Visual Previews
- **Product Cards**: Rich previews showing price, category, and status
- **Portfolio Cards**: Visual project cards with client info and dates
- **Status Indicators**: Featured and active/inactive badges

### Smart Organization
- **Featured Content**: Quick access to featured products and projects
- **Category Filtering**: Organized by product categories
- **Sort Options**: Multiple sorting options for each content type

### Content Validation
- **Required Fields**: Ensures all essential content is provided
- **Character Limits**: Prevents overly long titles and descriptions
- **Image Alt Text**: Ensures accessibility compliance

## 🔧 Configuration

### Studio Structure
The studio is organized with:
- **Site Settings** (singleton) - Global configuration
- **Products** - All design services
- **Categories** - Product organization
- **Portfolio Projects** - Work showcase
- **Featured Content** - Quick access to highlighted items

### Custom Icons
Uses Lucide React icons for:
- 🛍️ Products (ShoppingBag)
- 📁 Categories (FolderOpen)
- 🎨 Portfolio (Palette)
- ⚙️ Settings (Settings)
- ⭐ Featured (Star)

## 📝 Content Guidelines

### Product Descriptions
- Keep descriptions under 500 characters for short descriptions
- Use bullet points for features
- Include pricing in the main description
- Add relevant keywords for SEO

### Images
- Use high-quality images (minimum 800px width)
- Always add descriptive alt text
- Optimize file sizes for web
- Use consistent aspect ratios

### SEO
- Meta titles should be under 60 characters
- Meta descriptions should be under 160 characters
- Use relevant keywords naturally
- Include location-based keywords if applicable

## 🔄 Data Sync

### Backend Integration
The studio automatically syncs with your backend API:
- Products sync to PostgreSQL database
- Images are served from Sanity CDN
- Real-time updates via webhooks

### Manual Sync
To manually sync data:
```bash
curl -X POST http://localhost:5000/api/products/sync-sanity
```

## 🚀 Deployment

### Deploy Studio
```bash
npm run build
npm run deploy
```

### Environment Variables for Production
Set these in your hosting environment:
- `SANITY_STUDIO_TOKEN` - Your Sanity API token
- `SANITY_STUDIO_PROJECT_ID` - Your project ID (spc4jud7)
- `SANITY_STUDIO_DATASET` - Your dataset (production)

## 🛠 Troubleshooting

### Common Issues

1. **Studio won't start**:
   - Check if port 3333 is available
   - Verify your Sanity token is correct
   - Ensure all dependencies are installed

2. **Images not loading**:
   - Check image file sizes (should be under 10MB)
   - Verify image formats (JPG, PNG, WebP supported)
   - Ensure alt text is provided

3. **Data not syncing**:
   - Verify backend API is running
   - Check CORS settings
   - Ensure Sanity token has proper permissions

### Debug Mode
```bash
DEBUG=sanity* npm run dev
```

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Studio Configuration](https://www.sanity.io/docs/studio-configuration)
- [Schema Types](https://www.sanity.io/docs/schema-types)
- [Vision Tool](https://www.sanity.io/docs/vision-tool)

## 🤝 Support

If you encounter any issues:
1. Check the Sanity documentation
2. Verify your configuration
3. Check the browser console for errors
4. Ensure all environment variables are set correctly

## 🎉 You're Ready!

Your Sanity Studio is now configured with:
- ✅ Custom schemas for all content types
- ✅ Visual previews for better content management
- ✅ Organized structure for easy navigation
- ✅ SEO optimization features
- ✅ Sample data for getting started
- ✅ Backend integration ready

Start by adding your first product or portfolio project!