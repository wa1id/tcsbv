import { Metadata } from 'next'
import { urlFor } from '@/sanity/lib/image'

interface SEOData {
  metaTitle?: string
  metaDescription?: string
  ogImage?: any
  keywords?: string[]
  noIndex?: boolean
}

interface SiteSettings {
  title: string
  description: string
  seo?: SEOData
}

export function generateSEO(
  pageData: SEOData = {},
  siteSettings: SiteSettings,
  pagePath: string = ''
): Metadata {
  const {
    metaTitle,
    metaDescription,
    ogImage,
    keywords = [],
    noIndex = false
  } = pageData

  const {
    title: siteTitle,
    description: siteDescription,
    seo: siteSEO = {}
  } = siteSettings

  // Construct final values with fallbacks
  const finalTitle = metaTitle || siteSEO.metaTitle || siteTitle
  const finalDescription = metaDescription || siteSEO.metaDescription || siteDescription
  const finalKeywords = keywords.length > 0 ? keywords : (siteSEO.keywords || [])
  
  // Generate Open Graph image URL
  let ogImageUrl = ''
  if (ogImage) {
    ogImageUrl = urlFor(ogImage).width(1200).height(630).url()
  } else if (siteSEO.ogImage) {
    ogImageUrl = urlFor(siteSEO.ogImage).width(1200).height(630).url()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tcsbv.com'
  const fullUrl = `${baseUrl}${pagePath}`

  const metadata: Metadata = {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords.join(', '),
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: fullUrl,
      siteName: siteTitle,
      type: 'website',
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: finalTitle,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      ...(ogImageUrl && {
        images: [ogImageUrl],
      }),
    },
    alternates: {
      canonical: fullUrl,
    },
  }

  // Add noindex if specified
  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    }
  }

  return metadata
}

export function generateStructuredData(
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'FAQPage',
  data: any,
  siteSettings: SiteSettings
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tcsbv.com'
  
  const baseStructuredData = {
    '@context': 'https://schema.org',
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseStructuredData,
        '@type': 'Organization',
        name: siteSettings.title,
        description: siteSettings.description,
        url: baseUrl,
        ...(siteSettings.seo?.ogImage && {
          logo: urlFor(siteSettings.seo.ogImage).width(400).height(400).url(),
        }),
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: data.contactInfo?.phone,
          email: data.contactInfo?.email,
          contactType: 'customer service',
        },
        address: data.contactInfo?.address && {
          '@type': 'PostalAddress',
          streetAddress: data.contactInfo.address,
        },
        sameAs: Object.values(data.socialMedia || {}).filter(Boolean),
      }

    case 'LocalBusiness':
      return {
        ...baseStructuredData,
        '@type': 'AutomotiveBusiness',
        name: siteSettings.title,
        description: siteSettings.description,
        url: baseUrl,
        telephone: data.contactInfo?.phone,
        email: data.contactInfo?.email,
        address: data.contactInfo?.address && {
          '@type': 'PostalAddress',
          streetAddress: data.contactInfo.address,
        },
        openingHours: 'Mo-Fr 08:00-17:00',
        priceRange: '$$',
      }

    case 'Service':
      return {
        ...baseStructuredData,
        '@type': 'Service',
        name: data.title,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: siteSettings.title,
        },
        serviceType: data.title,
        ...(data.price && { offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'USD',
        }}),
      }

    case 'FAQPage':
      return {
        ...baseStructuredData,
        '@type': 'FAQPage',
        mainEntity: data.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer?.[0]?.children?.[0]?.text || '',
          },
        })),
      }

    default:
      return baseStructuredData
  }
}