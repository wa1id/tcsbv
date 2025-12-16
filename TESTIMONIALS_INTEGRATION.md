# Testimonials Integration with Sanity

This document outlines the testimonials feature integration with Sanity CMS.

## Features Added

### 1. Sanity Schema
- **File**: `src/sanity/schemaTypes/testimonial.ts`
- **Fields**:
  - `name` (required): Client name
  - `company`: Client's company
  - `position`: Client's job title
  - `content` (required): Testimonial text (10-500 characters)
  - `rating`: 1-5 star rating
  - `image`: Client photo with hotspot
  - `featured`: Boolean to highlight on homepage
  - `service`: Reference to related service
  - `dateGiven`: Date the testimonial was given

### 2. Sanity Queries
- **File**: `src/sanity/lib/queries.ts`
- **Queries Added**:
  - `testimonialsQuery`: Get all testimonials
  - `featuredTestimonialsQuery`: Get featured testimonials only
  - `testimonialsByServiceQuery`: Get testimonials for a specific service

### 3. Fetch Functions
- **File**: `src/sanity/lib/fetch.ts`
- **Functions Added**:
  - `getTestimonials()`: Fetch all testimonials with fallback data
  - `getFeaturedTestimonials()`: Fetch featured testimonials with fallback data
  - `getTestimonialsByService(serviceId)`: Fetch testimonials for a specific service

### 4. Components

#### DynamicTestimonials
- **File**: `src/components/home/DynamicTestimonials.tsx`
- **Purpose**: Main testimonials section for homepage
- **Features**: 
  - Animated grid layout
  - Star ratings
  - Client photos with fallback initials
  - Service badges
  - Responsive design

#### TestimonialCard
- **File**: `src/components/TestimonialCard.tsx`
- **Purpose**: Reusable testimonial card component
- **Features**:
  - Hover effects
  - Date display
  - Service linking
  - Responsive layout

### 5. Pages

#### Homepage Integration
- **File**: `src/app/page.tsx`
- **Change**: Replaced static `Testimonials` with `DynamicTestimonials`
- **Data**: Uses `getFeaturedTestimonials()` to show only featured testimonials

#### Dedicated Testimonials Page
- **File**: `src/app/testimonials/page.tsx`
- **Purpose**: Show all testimonials with proper SEO
- **Features**: Full testimonials listing with page header

#### Service Pages Integration
- **Files**: 
  - `src/app/services/[slug]/page.tsx`
  - `src/app/services/[slug]/ServiceDetailsClient.tsx`
- **Feature**: Shows testimonials specific to each service

### 6. Sanity Studio Configuration
- **File**: `src/sanity/structure.ts`
- **Change**: Added testimonials to studio navigation
- **File**: `src/sanity/schemaTypes/index.ts`
- **Change**: Registered testimonial schema

## Fallback Data

The system includes fallback testimonials data to ensure the site works even when Sanity is empty:

```typescript
testimonials: [
  {
    _id: 'testimonial-1',
    name: 'Sarah Johnson',
    company: 'Johnson Enterprises',
    position: 'Business Owner',
    content: 'Exceptional service! They diagnosed my car\'s issue quickly...',
    rating: 5,
    featured: true,
    dateGiven: '2024-01-15'
  },
  // ... more testimonials
]
```

## Usage

### In Sanity Studio
1. Navigate to `/studio` in your browser
2. Go to "Testimonials" section
3. Create new testimonials with all required fields
4. Mark important testimonials as "featured" for homepage display
5. Link testimonials to specific services for service page display

### In Components
```tsx
// Get all testimonials
const testimonials = await getTestimonials();

// Get featured testimonials only
const featuredTestimonials = await getFeaturedTestimonials();

// Get testimonials for a specific service
const serviceTestimonials = await getTestimonialsByService(serviceId);

// Use in component
<DynamicTestimonials testimonials={testimonials} />
```

## SEO Benefits

- Structured data for testimonials
- Rich snippets with star ratings
- Customer review content for search engines
- Dedicated testimonials page for better indexing

## Responsive Design

All testimonial components are fully responsive:
- Mobile: Single column grid
- Tablet: Two column grid  
- Desktop: Three column grid
- Hover effects and animations
- Optimized images with proper sizing