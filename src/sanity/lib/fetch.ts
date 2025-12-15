import { client } from './client'
import { 
  siteSettingsQuery, 
  servicesQuery, 
  serviceQuery, 
  faqsQuery, 
  featuredFaqsQuery,
  pagesQuery,
  pageQuery,
  navigationQuery
} from './queries'

// Fallback data for when Sanity is empty
export const fallbackData = {
  siteSettings: {
    title: 'TCsBV',
    description: 'Highly skilled certified mechanics guaranteed. We strive for excellence in everything we do.',
    contactInfo: {
      phone: '1.800.123.4567',
      email: 'info@tcsbv.com',
      address: '123 Main Street\nYour City, State 12345'
    },
    socialMedia: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      linkedin: '#'
    },
    seo: {
      metaTitle: 'TCsBV - Professional Automotive Services',
      metaDescription: 'Highly skilled certified mechanics guaranteed. We strive for excellence in everything we do.',
      keywords: ['automotive', 'mechanics', 'car repair', 'professional service']
    }
  },
  services: [
    {
      _id: 'fallback-1',
      title: 'Engine Diagnostics',
      slug: { current: 'engine-diagnostics' },
      description: 'Comprehensive engine diagnostic services using state-of-the-art equipment.',
      features: ['Computer diagnostics', 'Performance testing', 'Detailed reports'],
      price: 'From $99',
      order: 1,
      featured: true
    },
    {
      _id: 'fallback-2',
      title: 'Brake Service',
      slug: { current: 'brake-service' },
      description: 'Complete brake system inspection, repair, and maintenance services.',
      features: ['Brake pad replacement', 'Rotor resurfacing', 'Brake fluid service'],
      price: 'From $149',
      order: 2,
      featured: true
    },
    {
      _id: 'fallback-3',
      title: 'Oil Change',
      slug: { current: 'oil-change' },
      description: 'Quick and professional oil change service with quality filters.',
      features: ['Premium oil options', 'Filter replacement', 'Multi-point inspection'],
      price: 'From $49',
      order: 3,
      featured: false
    }
  ],
  faqs: [
    {
      _id: 'faq-1',
      question: 'How often should I service my vehicle?',
      answer: [{ _type: 'block', children: [{ text: 'We recommend following your manufacturer\'s service schedule, typically every 6 months or 5,000-7,500 miles, whichever comes first.' }] }],
      category: 'general',
      order: 1,
      featured: true
    },
    {
      _id: 'faq-2',
      question: 'Do you offer warranties on your work?',
      answer: [{ _type: 'block', children: [{ text: 'Yes, we provide comprehensive warranties on all our services. Parts and labor warranties vary by service type.' }] }],
      category: 'general',
      order: 2,
      featured: true
    },
    {
      _id: 'faq-3',
      question: 'What payment methods do you accept?',
      answer: [{ _type: 'block', children: [{ text: 'We accept cash, credit cards, debit cards, and offer financing options for major repairs.' }] }],
      category: 'general',
      order: 3,
      featured: false
    }
  ]
}

// Fetch functions with fallbacks
export async function getSiteSettings() {
  try {
    const data = await client.fetch(siteSettingsQuery)
    return data || fallbackData.siteSettings
  } catch (error) {
    console.warn('Failed to fetch site settings from Sanity, using fallback data:', error)
    return fallbackData.siteSettings
  }
}

export async function getServices() {
  try {
    const data = await client.fetch(servicesQuery)
    return data.length > 0 ? data : fallbackData.services
  } catch (error) {
    console.warn('Failed to fetch services from Sanity, using fallback data:', error)
    return fallbackData.services
  }
}

export async function getService(slug: string) {
  try {
    const data = await client.fetch(serviceQuery, { slug })
    if (data) return data
    
    // Fallback to hardcoded service if not found in Sanity
    const fallbackService = fallbackData.services.find(s => s.slug.current === slug)
    return fallbackService || null
  } catch (error) {
    console.warn('Failed to fetch service from Sanity, using fallback data:', error)
    const fallbackService = fallbackData.services.find(s => s.slug.current === slug)
    return fallbackService || null
  }
}

export async function getFaqs() {
  try {
    const data = await client.fetch(faqsQuery)
    return data.length > 0 ? data : fallbackData.faqs
  } catch (error) {
    console.warn('Failed to fetch FAQs from Sanity, using fallback data:', error)
    return fallbackData.faqs
  }
}

export async function getFeaturedFaqs() {
  try {
    const data = await client.fetch(featuredFaqsQuery)
    if (data.length > 0) return data
    
    // Return featured FAQs from fallback data
    return fallbackData.faqs.filter(faq => faq.featured)
  } catch (error) {
    console.warn('Failed to fetch featured FAQs from Sanity, using fallback data:', error)
    return fallbackData.faqs.filter(faq => faq.featured)
  }
}

export async function getPages() {
  try {
    const data = await client.fetch(pagesQuery)
    return data || []
  } catch (error) {
    console.warn('Failed to fetch pages from Sanity:', error)
    return []
  }
}

export async function getPage(slug: string) {
  try {
    const data = await client.fetch(pageQuery, { slug })
    return data || null
  } catch (error) {
    console.warn('Failed to fetch page from Sanity:', error)
    return null
  }
}

export async function getNavigation() {
  try {
    const data = await client.fetch(navigationQuery)
    return data || { pages: [], services: [] }
  } catch (error) {
    console.warn('Failed to fetch navigation from Sanity:', error)
    return { pages: [], services: [] }
  }
}