import { PortfolioPreview } from '../components/PortfolioPreview'

export default {
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Logo Design', value: 'logo-design' },
          { title: 'UI/UX Design', value: 'ui-ux-design' },
          { title: 'Print Design', value: 'print-design' },
          { title: 'Branding', value: 'branding' },
          { title: 'Web Design', value: 'web-design' },
          { title: 'Illustration', value: 'illustration' },
          { title: 'Social Media', value: 'social-media' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string'
    },
    {
      name: 'projectDate',
      title: 'Project Date',
      type: 'date'
    },
    {
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      mainImage: 'mainImage',
      clientName: 'clientName',
      projectDate: 'projectDate',
      isFeatured: 'isFeatured',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, category, clientName, projectDate, isFeatured, isActive } = selection
      return {
        title,
        subtitle: `${clientName || 'No client'} • ${category?.replace('-', ' ').toUpperCase() || 'No category'}`,
        media: selection.mainImage,
        category,
        clientName,
        projectDate,
        isFeatured,
        isActive
      }
    },
    component: PortfolioPreview
  },
  orderings: [
    {
      title: 'Project Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'projectDate', direction: 'desc' }]
    },
    {
      title: 'Project Date (Oldest)',
      name: 'dateAsc',
      by: [{ field: 'projectDate', direction: 'asc' }]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Created Date',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }]
    }
  ]
}
