import { type SchemaTypeDefinition } from 'sanity'
import { siteSettings } from "./siteSettings";
import { servicesPageSettings } from "./servicesPageSettings";
import { page } from "./page";
import { service } from "./service";
import { faq } from "./faq";
import { testimonial } from "./testimonial";
import { hero } from "./hero";
import { 
  heroBlock,
  homeHeroBlock,
  homeCTABlock, 
  servicesBlock, 
  textBlock, 
  contactBlock, 
  testimonialsBlock, 
  faqBlock 
} from "./blocks";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    servicesPageSettings,
    page, 
    service, 
    faq, 
    testimonial, 
    hero,
    // Page Builder Blocks
    heroBlock,
    homeHeroBlock,
    homeCTABlock,
    servicesBlock,
    textBlock,
    contactBlock,
    testimonialsBlock,
    faqBlock,
  ],
};
