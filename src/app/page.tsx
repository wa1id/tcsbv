import { client } from '@/sanity/lib/client'
import DynamicNavbar from "@/components/DynamicNavbar";
import DynamicFooter from "@/components/DynamicFooter";
import PageBuilder from '@/components/PageBuilder'
import { getSiteSettings, getNavigation } from "@/sanity/lib/fetch";

async function getHomePage() {
  const query = `
    *[_type == "page" && isHomePage == true][0] {
      _id,
      title,
      slug,
      pageBuilder,
      seo
    }
  `
  
  return await client.fetch(query)
}

export default async function Home() {
  const [page, siteSettings, navigation] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getNavigation()
  ])

  console.log('Home page data:', page)
  console.log('Page builder blocks:', page?.pageBuilder)

  if (!page) {
    console.log('No home page found in Sanity')
    // Fallback: show message to create home page in Sanity
    return (
      <>
        <DynamicNavbar siteSettings={siteSettings} navigation={navigation} />
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
        <DynamicFooter siteSettings={siteSettings} />
      </>
    )
  }

  return (
    <>
      <DynamicNavbar siteSettings={siteSettings} navigation={navigation} />
      <main className="min-h-screen">
        <PageBuilder blocks={page.pageBuilder || []} siteSettings={siteSettings} />
      </main>
      <DynamicFooter siteSettings={siteSettings} />
    </>
  );
}
