import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSiteSettings, getService, getServices, getNavigation, getTestimonialsByService } from '@/sanity/lib/fetch';
import { generateSEO, generateStructuredData } from '@/lib/seo';
import DynamicNavbar from '@/components/DynamicNavbar';
import ServiceDetailsClient from './ServiceDetailsClient';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service: { slug: { current: string } }) => ({
    slug: service.slug.current,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const [siteSettings, service] = await Promise.all([
    getSiteSettings(),
    getService(slug),
  ]);

  if (!service) {
    return generateSEO({}, siteSettings, `/services/${slug}`);
  }

  return generateSEO(
    {
      metaTitle: service.seo?.metaTitle || `${service.title} - ${siteSettings.title}`,
      metaDescription: service.seo?.metaDescription || service.description,
      keywords: service.seo?.keywords || [service.title, 'automotive service'],
    },
    siteSettings,
    `/services/${slug}`
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const [siteSettings, service, navigation] = await Promise.all([
    getSiteSettings(),
    getService(slug),
    getNavigation(),
  ]);

  if (!service) {
    notFound();
  }

  // Get testimonials for this service
  const testimonials = await getTestimonialsByService(service._id);

  const serviceSchema = generateStructuredData('Service', service, siteSettings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <DynamicNavbar siteSettings={siteSettings} navigation={navigation} />
      <ServiceDetailsClient 
        service={service} 
        siteSettings={siteSettings} 
        testimonials={testimonials}
      />
    </>
  );
}