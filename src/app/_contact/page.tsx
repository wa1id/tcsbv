import { Metadata } from "next";
import { client } from '@/sanity/lib/client'
import { getSiteSettings, getNavigation } from "@/sanity/lib/fetch";
import { generateSEO } from "@/lib/seo";
import DynamicFooter from "@/components/DynamicFooter";
import DynamicNavbar from "@/components/DynamicNavbar";
import PageBuilder from '@/components/PageBuilder'
import ContactPageClient from "./ContactPageClient";

async function getContactPage() {
  const query = `
    *[_type == "page" && (pageType == "contact" || slug.current == "contact")][0] {
      _id,
      title,
      slug,
      pageBuilder,
      seo
    }
  `
  
  return await client.fetch(query)
}

export async function generateMetadata(): Promise<Metadata> {
  const [page, siteSettings] = await Promise.all([
    getContactPage(),
    getSiteSettings()
  ]);
  
  if (page?.seo) {
    return generateSEO(page.seo, siteSettings, "/contact");
  }
  
  return generateSEO(
    {
      metaTitle: `Contact Us - ${siteSettings.title}`,
      metaDescription:
        "Get in touch with our automotive experts for professional car repair and maintenance services.",
      keywords: ["contact", "automotive service", "car repair", "get quote"],
    },
    siteSettings,
    "/contact"
  );
}

export default async function ContactPage() {
  const [page, siteSettings, navigation] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
    getNavigation(),
  ]);

  // If no contact page exists in Sanity, use the old component as fallback
  if (!page) {
    return (
      <>
        <DynamicNavbar siteSettings={siteSettings} navigation={navigation} />
        <ContactPageClient siteSettings={siteSettings} />
        <DynamicFooter siteSettings={siteSettings} />
      </>
    );
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
