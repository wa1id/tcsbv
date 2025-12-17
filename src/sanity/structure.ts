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

      // Services Page Settings (Singleton)
      S.listItem()
        .title("Services Page Settings")
        .id("servicesPageSettings")
        .child(
          S.document().schemaType("servicesPageSettings").documentId("servicesPageSettings")
        ),

      S.divider(),

      // Pages with custom organization
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              // Home Page
              S.listItem()
                .title("Home Page")
                .child(
                  S.documentList()
                    .title("Home Page")
                    .filter('_type == "page" && (isHomePage == true || pageType == "home")')
                ),
              
              // Main Pages
              S.listItem()
                .title("Main Pages")
                .child(
                  S.documentList()
                    .title("Main Pages")
                    .filter('_type == "page" && pageType in ["contact", "services", "about"]')
                ),
              
              // All Pages
              S.listItem()
                .title("All Pages")
                .child(S.documentTypeList("page").title("All Pages")),
            ])
        ),

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
