import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { 
  ShoppingBag, 
  FolderOpen, 
  Image, 
  Settings, 
  Star,
  Palette,
  Briefcase,
  Globe
} from 'lucide-react'

export default defineConfig({
  name: 'default',
  title: 'Snap Designs Studio',

  projectId: 'spc4jud7',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings (singleton)
            S.listItem()
              .title('Site Settings')
              .icon(Settings)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            
            S.divider(),
            
            // Products
            S.listItem()
              .title('Products')
              .icon(ShoppingBag)
              .child(
                S.documentTypeList('product')
                  .title('Products')
                  .filter('_type == "product"')
                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
              ),
            
            // Categories
            S.listItem()
              .title('Categories')
              .icon(FolderOpen)
              .child(
                S.documentTypeList('category')
                  .title('Categories')
                  .filter('_type == "category"')
                  .defaultOrdering([{field: 'order', direction: 'asc'}])
              ),
            
            S.divider(),
            
            // Portfolio
            S.listItem()
              .title('Portfolio Projects')
              .icon(Palette)
              .child(
                S.documentTypeList('portfolioProject')
                  .title('Portfolio Projects')
                  .filter('_type == "portfolioProject"')
                  .defaultOrdering([{field: 'projectDate', direction: 'desc'}])
              ),
            
            S.divider(),
            
            // Featured Content
            S.listItem()
              .title('Featured Products')
              .icon(Star)
              .child(
                S.documentList()
                  .title('Featured Products')
                  .filter('_type == "product" && isFeatured == true')
              ),
            
            S.listItem()
              .title('Featured Projects')
              .icon(Briefcase)
              .child(
                S.documentList()
                  .title('Featured Projects')
                  .filter('_type == "portfolioProject" && isFeatured == true')
              ),
          ])
    }), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
