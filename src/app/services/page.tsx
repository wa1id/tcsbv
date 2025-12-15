import { Metadata } from "next";
import { getSiteSettings, getServices, getNavigation } from "@/sanity/lib/fetch";
import { generateSEO } from "@/lib/seo";
import DynamicNavbar from "@/components/DynamicNavbar";
import ServicesPageClient from "./ServicesPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return generateSEO(
    {
      metaTitle: `Services - ${siteSettings.title}`,
      metaDescription:
        "Explore our comprehensive automotive services including diagnostics, repairs, and maintenance.",
      keywords: [
        "automotive services",
        "car repair",
        "vehicle maintenance",
        "diagnostics",
      ],
    },
    siteSettings,
    "/services"
  );
}

export default async function ServicesPage() {
  const [siteSettings, services, navigation] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getNavigation(),
  ]);

  return (
    <>
      <DynamicNavbar siteSettings={siteSettings} navigation={navigation} />
      <ServicesPageClient services={services} siteSettings={siteSettings} />
    </>
  );
}
