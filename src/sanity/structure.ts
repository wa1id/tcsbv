import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Site Settings (Singleton)
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),

      S.divider(),

      // Pages
      S.listItem()
        .title("Pages")
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),

      S.divider(),

      // Content Types
      S.listItem()
        .title("Services")
        .schemaType("service")
        .child(S.documentTypeList("service").title("Services")),

      S.listItem()
        .title("Testimonials")
        .schemaType("testimonial")
        .child(S.documentTypeList("testimonial").title("Testimonials")),

      S.listItem()
        .title("FAQs")
        .schemaType("faq")
        .child(S.documentTypeList("faq").title("FAQs")),

      S.listItem()
        .title("Hero Sections")
        .schemaType("hero")
        .child(S.documentTypeList("hero").title("Hero Sections")),
    ]);
