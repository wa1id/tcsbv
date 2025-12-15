import Hero from "@/components/home/Hero";
import DynamicServices from "@/components/home/DynamicServices";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import DynamicFAQ from "@/components/home/DynamicFAQ";
import DynamicFooter from "@/components/DynamicFooter";
import DynamicNavbar from "@/components/DynamicNavbar";
import {
  getSiteSettings,
  getServices,
  getFaqs,
  getNavigation,
} from "@/sanity/lib/fetch";

export default async function Home() {
  // Fetch data from Sanity with fallbacks
  const [siteSettings, services, faqs, navigation] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getFaqs(),
    getNavigation(),
  ]);

  return (
    <>
      <DynamicNavbar siteSettings={siteSettings} navigation={navigation} />
      <Hero />
      <DynamicServices services={services} />
      <Testimonials />
      <DynamicFAQ faqs={faqs} />
      <CTA />
      <DynamicFooter siteSettings={siteSettings} />
    </>
  );
}
