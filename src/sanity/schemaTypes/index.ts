import { type SchemaTypeDefinition } from 'sanity'
import { siteSettings } from "./siteSettings";
import { page } from "./page";
import { service } from "./service";
import { faq } from "./faq";
import { testimonial } from "./testimonial";
import { hero } from "./hero";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, page, service, faq, testimonial, hero],
};
