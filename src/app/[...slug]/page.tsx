import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBuilder from '@/components/PageBuilder'
import { getSiteSettings, getNavigation } from "@/sanity/lib/fetch";

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
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
    return result
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export default async function DynamicPage({ params }: PageProps) {
  // Await params in Next.js 15+
  const resolvedParams = await params
  // Join the slug array to handle nested routes
  const slug = resolvedParams.slug?.join('/') || ''
  
  const [page, siteSettings, navigation] = await Promise.all([
    getPage(slug),
    getSiteSettings(),
    getNavigation()
  ])

  if (!page) {
    notFound()
  }

  return (
    <>
      <Navbar siteSettings={siteSettings} navigation={navigation} />
      <main className="min-h-screen">
        <PageBuilder blocks={page.pageBuilder || []} siteSettings={siteSettings} />
      </main>
      <Footer siteSettings={siteSettings} />
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
  const resolvedParams = await params
  const slug = resolvedParams.slug?.join('/') || ''
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