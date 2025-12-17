import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import DynamicNavbar from "@/components/DynamicNavbar";
import DynamicFooter from "@/components/DynamicFooter";
import PageBuilder from '@/components/PageBuilder'
import { getSiteSettings, getNavigation } from "@/sanity/lib/fetch";

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPage(slug: string) {
  try {
    const query = `
      *[_type == "page" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        pageBuilder[] {
          _type,
          _key,
          ...,
          services[]-> {
            _id,
            title,
            description,
            price,
            features,
            slug
          },
          testimonials[]-> {
            _id,
            name,
            company,
            position,
            content,
            rating,
            image
          },
          faqs[]-> {
            _id,
            question,
            answer,
            category,
            order
          }
        },
        seo,
        pageType
      }
    `
    
    const result = await client.fetch(query, { slug })
    console.log('Query result for slug', slug, ':', result)
    return result
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export default async function DynamicPage({ params }: PageProps) {
  // Join the slug array to handle nested routes
  const slug = params.slug?.join('/') || ''
  
  console.log('Dynamic page slug:', slug, 'params:', params)
  
  const [page, siteSettings, navigation] = await Promise.all([
    getPage(slug),
    getSiteSettings(),
    getNavigation()
  ])

  console.log('Found page:', page)

  if (!page) {
    console.log('Page not found for slug:', slug)
    notFound()
  }

  return (
    <>
      <DynamicNavbar siteSettings={siteSettings} navigation={navigation} />
      <main className="min-h-screen">
        <PageBuilder blocks={page.pageBuilder || []} siteSettings={siteSettings} />
      </main>
      <DynamicFooter siteSettings={siteSettings} />
    </>
  )
}

export async function generateStaticParams() {
  const query = `
    *[_type == "page" && defined(slug.current) && isHomePage != true] {
      slug
    }
  `
  
  const pages = await client.fetch(query)
  
  return pages.map((page: any) => ({
    slug: page.slug.current.split('/'),
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const slug = params.slug.join('/')
  const page = await getPage(slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    keywords: page.seo?.keywords?.join(', '),
    robots: page.seo?.noIndex ? 'noindex' : 'index,follow',
  }
}