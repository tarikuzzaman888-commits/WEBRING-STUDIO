import type { Metadata } from 'next';
import PricingPageClient from './PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing — AI Product Photography Packages',
  description: 'Transparent pricing for AI product photography, branding, and e-commerce visual packages. Choose from Starter, Growth, or Enterprise tiers.',
};

export const revalidate = 3600;

export default function PricingPage() {
  return <PricingPageClient />;
}
