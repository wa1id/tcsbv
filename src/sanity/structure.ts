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

      // Services
      S.listItem()
        .title("Services")
        .schemaType("service")
        .child(S.documentTypeList("service").title("Services")),

      // FAQs
      S.listItem()
        .title("FAQs")
        .schemaType("faq")
        .child(S.documentTypeList("faq").title("FAQs")),
    ]);
