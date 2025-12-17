import { defineType, defineField } from 'sanity'

export const servicesPageSettings = defineType({
  name: 'servicesPageSettings',
  title: 'Services Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Services Page',
      type: 'boolean',
      description: 'Toggle to enable/disable the services page',
      initialValue: true,
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          initialValue: 'Our Services',
        }),
        defineField({
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Professional automotive services tailored to your needs',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Our Services',
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'We provide comprehensive automotive services to keep your vehicle running smoothly and efficiently.',
        }),
        defineField({
          name: 'showAllServices',
          title: 'Show All Services',
          type: 'boolean',
          description: 'Show all services or select specific ones',
          initialValue: true,
        }),
        defineField({
          name: 'selectedServices',
          title: 'Selected Services',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'service' }],
            },
          ],
          hidden: ({ parent }) => parent?.showAllServices === true,
        }),
      ],
    }),
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Testimonials Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'What Our Customers Say',
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          rows: 2,
          initialValue: "Don't just take our word for it - hear from our satisfied customers about their experience with our services",
        }),
      ],
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show FAQ Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Frequently Asked Questions',
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Find answers to common questions about our automotive services and expertise.',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Services Page Settings',
      }
    },
  },
})