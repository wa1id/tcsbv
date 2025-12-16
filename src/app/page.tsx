import Hero from "@/components/home/Hero";
import DynamicServices from "@/components/home/DynamicServices";
import DynamicTestimonials from "@/components/home/DynamicTestimonials";
import CTA from "@/components/home/CTA";
import DynamicFAQ from "@/components/home/DynamicFAQ";
import DynamicFooter from "@/components/DynamicFooter";
import DynamicNavbar from "@/components/DynamicNavbar";
import {
  getSiteSettings,
  getServices,
  getFaqs,
  getNavigation,
  getFeaturedTestimonials,
} from "@/sanity/lib/fetch";

export default async function Home() {
  // Fetch data from Sanity with fallbacks
  const [siteSettings, services, faqs, navigation, testimonials] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getFaqs(),
    getNavigation(),
    getFeaturedTestimonials(),
  ]);

  return (
    <>
      <DynamicNavbar siteSettings={siteSettings} navigation={navigation} />
      <Hero />
      <DynamicServices services={services} />
      <DynamicTestimonials testimonials={testimonials} />
      <DynamicFAQ faqs={faqs} />
      <CTA />
      <DynamicFooter siteSettings={siteSettings} />
    </>
  );
}
