import React from 'react'
import { Card, CardContent } from '@sanity/ui'

export function PortfolioPreview({ value }) {
  if (!value) return null

  const { title, category, mainImage, clientName, projectDate, isFeatured, isActive } = value

  return (
    <Card style={{ padding: '1rem' }}>
      <CardContent>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          {mainImage && (
            <img 
              src={mainImage.asset?.url} 
              alt={mainImage.alt || title}
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
              {title}
            </h3>
            <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
              {category?.replace('-', ' ').toUpperCase() || 'No category'}
            </p>
            {clientName && (
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#374151' }}>
                Client: {clientName}
              </p>
            )}
            {projectDate && (
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#6b7280' }}>
                {new Date(projectDate).toLocaleDateString()}
              </p>
            )}
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
