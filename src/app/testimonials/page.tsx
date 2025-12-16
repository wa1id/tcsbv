import DynamicNavbar from "@/components/DynamicNavbar";
import DynamicFooter from "@/components/DynamicFooter";
import DynamicTestimonials from "@/components/home/DynamicTestimonials";
import {
  getSiteSettings,
  getNavigation,
  getTestimonials,
} from "@/sanity/lib/fetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Testimonials | TCsBV",
  description: "Read what our satisfied customers have to say about our automotive services. Real reviews from real customers.",
};

export default async function TestimonialsPage() {
  // Fetch data from Sanity with fallbacks
  const [siteSettings, navigation, testimonials] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
    getTestimonials(),
  ]);

  return (
    <>
      <DynamicNavbar siteSettings={siteSettings} navigation={navigation} />
      
      {/* Page Header */}
      <div className="relative w-full py-20 md:py-24 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-charcoal to-charcoal/90">
        <div className="max-w-[1450px] mx-auto text-center">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Customer Testimonials
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with our services.
          </p>
        </div>
      </div>

      <DynamicTestimonials testimonials={testimonials} />
      <DynamicFooter siteSettings={siteSettings} />
    </>
  );
}