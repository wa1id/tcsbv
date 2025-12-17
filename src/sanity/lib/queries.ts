import { groq } from 'next-sanity'

// Site Settings Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    favicon,
    contactInfo,
    socialMedia,
    seo
  }
`

// All Services Query
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, title asc) {
    _id,
    title,
    slug,
    description,
    icon,
    image,
    features,
    price,
    order,
    featured
  }
`

// Single Service Query
export const serviceQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    icon,
    image,
    content,
    features,
    price,
    seo,
    featured
  }
`

// All FAQs Query
export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc, question asc) {
    _id,
    question,
    answer,
    category,
    order,
    featured
  }
`

// Featured FAQs Query
export const featuredFaqsQuery = groq`
  *[_type == "faq" && featured == true] | order(order asc, question asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`

// All Pages Query
export const pagesQuery = groq`
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    slug,
    seo,
    publishedAt
  }
`

// Single Page Query
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    seo,
    publishedAt
  }
`

// All Testimonials Query
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(dateGiven desc, _createdAt desc) {
    _id,
    name,
    company,
    position,
    content,
    rating,
    image,
    featured,
    dateGiven,
    service->{
      title,
      slug
    }
  }
`

// Featured Testimonials Query
export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(dateGiven desc, _createdAt desc) {
    _id,
    name,
    company,
    position,
    content,
    rating,
    image,
    dateGiven,
    service->{
      title,
      slug
    }
  }
`

// Testimonials by Service Query
export const testimonialsByServiceQuery = groq`
  *[_type == "testimonial" && service._ref == $serviceId] | order(dateGiven desc, _createdAt desc) {
    _id,
    name,
    company,
    position,
    content,
    rating,
    image,
    dateGiven
  }
`

// Navigation Links Query (for dynamic navigation)
export const navigationQuery = groq`
  {
    "pages": *[_type == "page" && !seo.noIndex] | order(title asc) {
      title,
      slug,
      isHomePage
    },
    "services": *[_type == "service"] | order(order asc, title asc) [0...5] {
      title,
      slug
    }
  }
`