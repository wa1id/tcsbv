import { defineType, defineField } from 'sanity'

export const homeHeroBlock = defineType({
  name: 'homeHeroBlock',
  title: 'Home Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'welcomeText',
      title: 'Welcome Text',
      type: 'string',
      initialValue: 'Welcome to TCSBV',
    }),
    defineField({
      name: 'mainHeadline',
      title: 'Main Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Highly skilled certified mechanics guaranteed.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Need a car inspection?',
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'string',
          initialValue: '/contact',
        }),
      ],
    }),
    defineField({
      name: 'contactForm',
      title: 'Contact Form Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'showForm',
          title: 'Show Contact Form',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'formTitle',
          title: 'Form Button Text',
          type: 'string',
          initialValue: 'Book appointment',
        }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'questionText',
          title: 'Question Text',
          type: 'string',
          initialValue: 'Got a question about our services?',
        }),
        defineField({
          name: 'phoneText',
          title: 'Phone Call Text',
          type: 'string',
          initialValue: 'Call us',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'mainHeadline',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: `Home Hero: ${title}`,
        media,
      }
    },
  },
})