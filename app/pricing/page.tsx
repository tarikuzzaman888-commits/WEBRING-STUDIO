import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { pricingQuery } from '@/sanity/lib/queries';
import type { PricingTier } from '@/lib/types';
import PricingPageClient from './PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing — AI Product Photography Packages',
  description: 'Transparent pricing for AI product photography, branding, and e-commerce visual packages. Choose from Starter, Growth, or Enterprise tiers.',
};

export const revalidate = 3600;

const fallbackPricing: PricingTier[] = [
  {
    _id: '1',
    tierName: 'Starter',
    price: 149,
    period: 'per project',
    highlighted: false,
    features: [
      'Up to 10 product images',
      'White background removal',
      'Basic retouching',
      '2 revision rounds',
      '48-hour delivery',
      'Web-optimized exports',
    ],
    ctaText: 'Get Started',
    order: 0,
  },
  {
    _id: '2',
    tierName: 'Growth',
    price: 399,
    period: 'per project',
    highlighted: true,
    features: [
      'Up to 30 product images',
      'AI lifestyle scenes',
      'Advanced retouching',
      'Unlimited revisions',
      '24-hour delivery',
      'Platform-optimized exports',
      'Brand color matching',
      'Priority support',
    ],
    ctaText: 'Most Popular',
    order: 1,
  },
  {
    _id: '3',
    tierName: 'Enterprise',
    price: 0,
    period: 'custom',
    highlighted: false,
    features: [
      'Unlimited product images',
      'Full brand identity package',
      'AI video content',
      'Dedicated creative team',
      'Same-day turnaround',
      'All export formats',
      'Brand guidelines',
      'Monthly strategy calls',
      'White-label delivery',
    ],
    ctaText: 'Contact Us',
    order: 2,
  },
];

async function getPricing(): Promise<PricingTier[]> {
  try {
    const tiers = await client.fetch<PricingTier[]>(pricingQuery);
    return tiers && tiers.length > 0 ? tiers : fallbackPricing;
  } catch {
    return fallbackPricing;
  }
}

export default async function PricingPage() {
  const tiers = await getPricing();
  return <PricingPageClient tiers={tiers} />;
}
