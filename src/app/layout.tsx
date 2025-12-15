import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/sanity/lib/fetch";
import { generateSEO, generateStructuredData } from "@/lib/seo";

const epilogue = Epilogue({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return generateSEO({}, siteSettings, "/");
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  // Generate structured data for organization
  const organizationSchema = generateStructuredData(
    "Organization",
    siteSettings,
    siteSettings
  );
  const localBusinessSchema = generateStructuredData(
    "LocalBusiness",
    siteSettings,
    siteSettings
  );

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className={`${epilogue.className} bg-cream  `}>
        {children}
      </body>
    </html>
  );
}
