import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
  if (!source) {
    console.warn('urlFor called with empty source')
    return builder.image({}) // Return empty builder to prevent errors
  }
  return builder.image(source)
}