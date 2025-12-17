import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: {
        accept: '.ico,.png,.svg',
      },
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
      ],
    }),
    // defineField({
    //   name: 'heroSection',
    //   title: 'Hero Section',
    //   type: 'object',
    //   fields: [
    //     defineField({
    //       name: 'title',
    //       title: 'Hero Title',
    //       type: 'string',
    //     }),
    //     defineField({
    //       name: 'subtitle',
    //       title: 'Hero Subtitle',
    //       type: 'text',
    //       rows: 2,
    //     }),
    //     defineField({
    //       name: 'description',
    //       title: 'Hero Description',
    //       type: 'text',
    //       rows: 3,
    //     }),
    //     defineField({
    //       name: 'backgroundImage',
    //       title: 'Background Image',
    //       type: 'image',
    //       options: {
    //         hotspot: true,
    //       },
    //     }),
    //     defineField({
    //       name: 'ctaButton',
    //       title: 'Call to Action Button',
    //       type: 'object',
    //       fields: [
    //         defineField({
    //           name: 'text',
    //           title: 'Button Text',
    //           type: 'string',
    //         }),
    //         defineField({
    //           name: 'url',
    //           title: 'Button URL',
    //           type: 'url',
    //         }),
    //       ],
    //     }),
    //   ],
    // }),
    defineField({
      name: 'ctaButton',
      title: 'Header CTA Button',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show CTA Button',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Get in touch',
        }),
        defineField({
          name: 'linkType',
          title: 'Link Type',
          type: 'string',
          options: {
            list: [
              { title: 'Internal Page', value: 'internal' },
              { title: 'External URL', value: 'external' },
            ],
          },
          initialValue: 'internal',
        }),
        defineField({
          name: 'internalLink',
          title: 'Internal Page',
          type: 'reference',
          to: [{ type: 'page' }],
          hidden: ({ parent }) => parent?.linkType !== 'internal',
        }),
        defineField({
          name: 'externalUrl',
          title: 'External URL',
          type: 'url',
          hidden: ({ parent }) => parent?.linkType !== 'external',
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'aboutText',
          title: 'About Text',
          type: 'text',
          rows: 3,
          description: 'Short description about your company in the footer',
        }),
        defineField({
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          description: 'Copyright text (e.g., "© 2024 TCSBV. All rights reserved.")',
        }),
        defineField({
          name: 'quickLinks',
          title: 'Quick Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Link Title',
                  type: 'string',
                }),
                defineField({
                  name: 'linkType',
                  title: 'Link Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Internal Page', value: 'internal' },
                      { title: 'External URL', value: 'external' },
                    ],
                  },
                  initialValue: 'internal',
                }),
                defineField({
                  name: 'internalLink',
                  title: 'Internal Page',
                  type: 'reference',
                  to: [{ type: 'page' }],
                  hidden: ({ parent }) => parent?.linkType !== 'internal',
                }),
                defineField({
                  name: 'externalUrl',
                  title: 'External URL',
                  type: 'url',
                  hidden: ({ parent }) => parent?.linkType !== 'external',
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  linkType: 'linkType',
                },
                prepare({ title, linkType }) {
                  return {
                    title,
                    subtitle: linkType === 'internal' ? 'Internal Link' : 'External Link',
                  }
                },
              },
            },
          ],
        }),
        defineField({
          name: 'showNewsletter',
          title: 'Show Newsletter Signup',
          type: 'boolean',
          description: 'Show/hide newsletter signup form in footer',
          initialValue: true,
        }),
        defineField({
          name: 'newsletterTitle',
          title: 'Newsletter Title',
          type: 'string',
          hidden: ({ parent }) => !parent?.showNewsletter,
        }),
        defineField({
          name: 'newsletterDescription',
          title: 'Newsletter Description',
          type: 'text',
          rows: 2,
          hidden: ({ parent }) => !parent?.showNewsletter,
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO Settings',
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
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
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
    select: {
      title: 'title',
      media: 'logo',
    },
  },
})