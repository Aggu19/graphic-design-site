import React from 'react'
import { Card, CardContent } from '@sanity/ui'

export function ProductPreview({ value }) {
  if (!value) return null

  const { name, price, category, images, isFeatured, isActive } = value

  return (
    <Card style={{ padding: '1rem' }}>
      <CardContent>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          {images && images[0] && (
            <img 
              src={images[0].asset?.url} 
              alt={images[0].alt || name}
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
              {name}
            </h3>
            <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
              {category?.name || 'No category'}
            </p>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 'bold', color: '#2563eb' }}>
              Rs {price ? (price / 100).toLocaleString() : '0'}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {isFeatured && (
                <span style={{ 
                  background: '#fbbf24', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  ⭐ Featured
                </span>
              )}
              {!isActive && (
                <span style={{ 
                  background: '#ef4444', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
