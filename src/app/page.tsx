import { client } from '@/sanity/lib/client'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBuilder from '@/components/PageBuilder'
import { getSiteSettings, getHeaderSettings, getFooterSettings } from "@/sanity/lib/fetch";

async function getHomePage() {
  const query = `
    *[_type == "page" && slug.current == "home"][0] {
      _id,
      title,
      slug,
      pageBuilder[] {
        _type,
        _key,
        ...,
        ctaButton {
          ...,
          internalLink-> {
            slug
          }
        },
        ctaButtons[] {
          ...,
          internalLink-> {
            slug
          }
        },
        numberOfServicesToShow,
        services[]-> {
          _id,
          title,
          description,
          price,
          features,
          slug,
          image,
          detailPage-> { slug }
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
      seo
    }
  `
  
  return await client.fetch(query)
}

export default async function Home() {
  const [page, siteSettings, headerSettings, footerSettings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getHeaderSettings(),
    getFooterSettings()
  ])

  if (!page) {
    return (
      <>
        <Navbar siteSettings={siteSettings} headerSettings={headerSettings} />
        <main className="min-h-screen flex items-center justify-center bg-cream">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-orange mb-4">Welcome to TCSBV</h1>
            <p className="text-lg text-charcoal/80 mb-6">
              Please create a home page in Sanity Studio to get started.
            </p>
            <a 
              href="/studio" 
              className="bg-orange hover:bg-olive text-cream px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Go to Sanity Studio
            </a>
          </div>
        </main>
        <Footer siteSettings={siteSettings} footerSettings={footerSettings} />
      </>
    )
  }

  return (
    <>
      <Navbar siteSettings={siteSettings} headerSettings={headerSettings} />
      <main className="">
        <PageBuilder blocks={page.pageBuilder || []} siteSettings={siteSettings} />
      </main>
      <Footer siteSettings={siteSettings} footerSettings={footerSettings} />
    </>
  );
}
