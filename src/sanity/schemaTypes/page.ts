import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.custom((slug, context) => {
        const isHomePage = (context.document as any)?.isHomePage
        if (isHomePage) {
          return true // Home page doesn't need a slug
        }
        return slug?.current ? true : 'Slug is required for non-home pages'
      }),
      description: 'Leave empty for home page, or generate from title for other pages',
    }),
    defineField({
      name: 'isHomePage',
      title: 'Is Home Page',
      type: 'boolean',
      description: 'Mark this page as the home page (only one page should be marked as home)',
      initialValue: false,
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Page', value: 'standard' },
          { title: 'Home Page', value: 'home' },
          { title: 'Contact Page', value: 'contact' },
          { title: 'Services Page', value: 'services' },
          { title: 'About Page', value: 'about' },
        ],
      },
      initialValue: 'standard',
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
      ],
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections for this page',
      of: [
        { type: 'heroBlock' },
        { type: 'homeHeroBlock' },
        { type: 'homeCTABlock' },
        { type: 'servicesBlock' },
        { type: 'textBlock' },
        { type: 'contactBlock' },
        { type: 'testimonialsBlock' },
        { type: 'faqBlock' },
        { type: 'featuresBlock' },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isHomePage: 'isHomePage',
      pageType: 'pageType',
    },
    prepare({ title, slug, isHomePage, pageType }) {
      return {
        title: `${title}${isHomePage ? ' (Home)' : ''}`,
        subtitle: `${pageType} - /${slug || 'no-slug'}`,
      }
    },
  },
})