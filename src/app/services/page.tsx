import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteSettings, getServices, getNavigation, getServicesPageSettings } from "@/sanity/lib/fetch";
import { generateSEO } from "@/lib/seo";
import DynamicNavbar from "@/components/DynamicNavbar";
import DynamicFooter from "@/components/DynamicFooter";
import ServicesPageClient from "./ServicesPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, pageSettings] = await Promise.all([
    getSiteSettings(),
    getServicesPageSettings()
  ]);
  
  if (pageSettings.seo?.metaTitle || pageSettings.seo?.metaDescription) {
    return generateSEO(
      {
        metaTitle: pageSettings.seo.metaTitle || `Services - ${siteSettings.title}`,
        metaDescription: pageSettings.seo.metaDescription || "Explore our comprehensive automotive services including diagnostics, repairs, and maintenance.",
        keywords: pageSettings.seo.keywords || [
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
  const [siteSettings, pageSettings, allServices, navigation] = await Promise.all([
    getSiteSettings(),
    getServicesPageSettings(),
    getServices(),
    getNavigation(),
  ]);

  // Check if page is disabled
  if (!pageSettings.enabled) {
    notFound();
  }

  // Determine which services to show
  const services = pageSettings.servicesSection?.showAllServices 
    ? allServices 
    : pageSettings.servicesSection?.selectedServices || allServices;

  return (
    <>
      <DynamicNavbar siteSettings={siteSettings} navigation={navigation} />
      <ServicesPageClient 
        services={services} 
        siteSettings={siteSettings}
        pageSettings={pageSettings}
      />
      <DynamicFooter siteSettings={siteSettings} />
    </>
  );
}
