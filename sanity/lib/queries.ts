import { groq } from 'next-sanity';

// ═══════════════════════════════════════
// Site Settings
// ═══════════════════════════════════════
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    maintenanceMode,
    tagline,
    email,
    whatsapp,
    location,
    logo,
    logoDark,
    ogImage,
    instagramUrl,
    facebookUrl,
    linkedinUrl,
    behanceUrl,
    clientBrands[] {
      _key,
      name,
      logo
    }
  }
`;

// ═══════════════════════════════════════
// Home Page
// ═══════════════════════════════════════
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroLine1,
    heroLine2,
    heroSubtitle,
    socialProof,
    cta1Text,
    cta2Text,
    heroImages,
    marqueeText,
    stats[] {
      _key,
      value,
      label,
      suffix
    },
    ctaBannerHeading,
    ctaBannerSubtext
  }
`;

// ═══════════════════════════════════════
// Portfolio
// ═══════════════════════════════════════
export const allPortfolioQuery = groq`
  *[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    clientIndustry,
    projectDate,
    featured,
    coverImage,
    projectImages[] {
      image,
      caption,
      isBeforeImage,
      isAfterImage
    },
    shortDescription,
    fullDescription,
    tools,
    tags,
    results[] {
      metric,
      value,
      description
    },
    order
  }
`;

export const featuredPortfolioQuery = groq`
  *[_type == "portfolio" && featured == true] | order(order asc) [0...6] {
    _id,
    title,
    slug,
    category,
    coverImage,
    shortDescription,
    projectImages[] {
      image,
      caption,
      isBeforeImage,
      isAfterImage
    },
    featured,
    order
  }
`;

export const portfolioBySlugQuery = groq`
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    clientIndustry,
    projectDate,
    featured,
    coverImage,
    projectImages[] {
      image,
      caption,
      isBeforeImage,
      isAfterImage
    },
    shortDescription,
    fullDescription,
    tools,
    tags,
    results[] {
      metric,
      value,
      description
    },
    order
  }
`;

export const relatedPortfolioQuery = groq`
  *[_type == "portfolio" && category == $category && slug.current != $slug] | order(order asc) [0...3] {
    _id,
    title,
    slug,
    category,
    coverImage,
    shortDescription,
    tags
  }
`;

export const portfolioSlugsQuery = groq`
  *[_type == "portfolio" && defined(slug.current)].slug.current
`;

// ═══════════════════════════════════════
// Team Members
// ═══════════════════════════════════════
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    responsibilities,
    bio,
    photo,
    instagramUrl,
    linkedinUrl,
    order
  }
`;

// ═══════════════════════════════════════
// Services
// ═══════════════════════════════════════
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    subtitle,
    description,
    features,
    image,
    icon,
    startingPrice,
    order
  }
`;

// ═══════════════════════════════════════
// Testimonials
// ═══════════════════════════════════════
export const testimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] {
    _id,
    clientName,
    company,
    quote,
    rating,
    avatar,
    service,
    featured
  }
`;

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] {
    _id,
    clientName,
    company,
    quote,
    rating,
    avatar,
    service,
    featured
  }
`;

// ═══════════════════════════════════════
// Pricing
// ═══════════════════════════════════════
export const pricingQuery = groq`
  *[_type == "pricing"] | order(order asc) {
    _id,
    tierName,
    price,
    period,
    highlighted,
    features,
    ctaText,
    order
  }
`;

// ═══════════════════════════════════════
// Available Dates
// ═══════════════════════════════════════
export const availableDatesQuery = groq`
  *[_type == "availableDates"][0] {
    dates,
    timeSlots
  }
`;
