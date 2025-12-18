// This file is now handled by the catch-all route [...slug]/page.tsx
// Services page should be created in Sanity with slug "services"
import { redirect } from 'next/navigation'

export default function ServicesPage() {
  // Redirect to catch-all route which will handle the services page from Sanity
  redirect('/services')
}
