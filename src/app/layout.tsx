import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/sanity/lib/fetch";
import { generateSEO } from "@/lib/seo";

const epilogue = Epilogue({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return generateSEO(undefined, undefined, siteSettings);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.className} bg-cream  `}>
        {children}
      </body>
    </html>
  );
}
