#!/usr/bin/env node

/**
 * Sanity Studio Setup Script
 * This script helps you set up your Sanity studio with initial data
 */

import { createClient } from '@sanity/client'
import { sampleCategories, sampleProducts, samplePortfolioProjects, sampleSiteSettings } from './seedData.js'

const client = createClient({
  projectId: 'spc4jud7',
  dataset: 'production',
  apiVersion: '2023-12-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN || process.env.SANITY_STUDIO_TOKEN
})

async function setupSanity() {
  console.log('🚀 Setting up Sanity Studio...')
  
  try {
    // Create categories first
    console.log('📁 Creating categories...')
    const categoryRefs = {}
    
    for (const category of sampleCategories) {
      const result = await client.create(category)
      categoryRefs[category.slug.current] = result._id
      console.log(`✅ Created category: ${category.name}`)
    }
    
    // Update product category references
    console.log('🛍️ Creating products...')
    for (const product of sampleProducts) {
      if (product.category._ref) {
        const categorySlug = product.category._ref.replace('category-', '')
        product.category._ref = categoryRefs[categorySlug]
      }
      
      const result = await client.create(product)
      console.log(`✅ Created product: ${product.name}`)
    }
    
    // Create portfolio projects
    console.log('🎨 Creating portfolio projects...')
    for (const project of samplePortfolioProjects) {
      const result = await client.create(project)
      console.log(`✅ Created project: ${project.title}`)
    }
    
    // Create site settings
    console.log('⚙️ Creating site settings...')
    await client.createOrReplace(sampleSiteSettings)
    console.log('✅ Created site settings')
    
    console.log('\n🎉 Sanity Studio setup complete!')
    console.log('\nNext steps:')
    console.log('1. Start your Sanity Studio: npm run dev')
    console.log('2. Add images to your products and projects')
    console.log('3. Customize the content as needed')
    console.log('4. Sync with your backend: POST /api/products/sync-sanity')
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    console.log('\nMake sure you have:')
    console.log('1. Set SANITY_TOKEN environment variable')
    console.log('2. Proper permissions in your Sanity project')
    console.log('3. Internet connection')
  }
}

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupSanity()
}

export default setupSanity
