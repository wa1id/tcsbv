import { Metadata } from "next";
import { getSiteSettings, getNavigation } from "@/sanity/lib/fetch";
import { generateSEO } from "@/lib/seo";
import DynamicFooter from "@/components/DynamicFooter";
import DynamicNavbar from "@/components/DynamicNavbar";
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
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
  const [siteSettings, navigation] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
  ]);

  return (
    <>
      <DynamicNavbar siteSettings={siteSettings} navigation={navigation} />
      <ContactPageClient siteSettings={siteSettings} />
      <DynamicFooter siteSettings={siteSettings} />
    </>
  );
}
