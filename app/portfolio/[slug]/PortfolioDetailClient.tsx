'use client';

import BeforeAfterSlider from '@/components/portfolio/BeforeAfterSlider';
import type { SanityImage } from '@/lib/types';

interface PortfolioDetailClientProps {
  beforeImage: SanityImage;
  afterImage: SanityImage;
}

export default function PortfolioDetailClient({ beforeImage, afterImage }: PortfolioDetailClientProps) {
  return <BeforeAfterSlider beforeImage={beforeImage} afterImage={afterImage} />;
}
