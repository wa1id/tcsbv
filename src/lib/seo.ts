import { Metadata } from 'next'

interface SiteSettings {
  title: string
  description: string
}

export function generateSEO(
  title: string | undefined,
  description: string | undefined,
  siteSettings: SiteSettings
): Metadata {
  return {
    title: title || siteSettings.title,
    description: description || siteSettings.description,
  }
}
