import type { PortfolioItem, TeamMember } from './types';

export const fallbackPortfolio: PortfolioItem[] = [
  {
    _id: 'p1',
    title: 'Porrada Fightwear',
    slug: { current: 'porrada-fightwear' },
    category: 'E-commerce',
    fallbackUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop', // Sports/Gym aesthetic
    coverImage: undefined!,
    featured: true,
    order: 1,
  },
  {
    _id: 'p2',
    title: 'NOIRÉ Beauty',
    slug: { current: 'noire-beauty' },
    category: 'AI Photography',
    fallbackUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop', // Beauty/Makeup aesthetic
    coverImage: undefined!,
    featured: true,
    order: 2,
  },
  {
    _id: 'p3',
    title: 'The Sofa Republic',
    slug: { current: 'sofa-republic' },
    category: 'Lifestyle',
    fallbackUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=600&auto=format&fit=crop', // Furniture aesthetic
    coverImage: undefined!,
    featured: true,
    order: 3,
  },
  {
    _id: 'p4',
    title: 'Email Marketing Campaigns',
    slug: { current: 'email-marketing' },
    category: 'Branding',
    fallbackUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop', // Tech/Email aesthetic
    coverImage: undefined!,
    featured: true,
    order: 4,
  },
  {
    _id: 'p5',
    title: 'Fashion Lookbook',
    slug: { current: 'fashion-lookbook' },
    category: 'E-commerce',
    fallbackUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop', // Fashion
    coverImage: undefined!,
    featured: false,
    order: 5,
  },
  {
    _id: 'p6',
    title: 'Minimalist Watch Ads',
    slug: { current: 'minimalist-watch' },
    category: 'AI Photography',
    fallbackUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop', // Product photography
    coverImage: undefined!,
    featured: false,
    order: 6,
  }
];

export const fallbackTeam: TeamMember[] = [
  {
    _id: 't1',
    name: 'Shiekh Mariful',
    role: 'CEO',
    bio: 'Visionary leader driving the future of AI-powered product photography. Expert in streamlining creative workflows and delivering high-impact visual solutions for global brands.',
    responsibilities: ['AI Strategy', 'Creative Direction', 'Business Operations'],
    fallbackUrl: 'https://i.postimg.cc/vHZNr3cm/Whats-App-Image-2026-05-05-at-10-53-52.jpg', 
    photo: undefined,
    order: 1,
  },
  {
    _id: 't2',
    name: 'Many',
    role: 'CO-FOUNDER',
    bio: 'Creative force and strategic partner, ensuring the perfect blend of technology and human artistry in every project we undertake.',
    responsibilities: ['Brand Development', 'Tech Integration', 'Creative Strategy'],
    fallbackUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', 
    photo: undefined,
    order: 2,
  },
  {
    _id: 't3',
    name: 'Tarikuzzaman Sabbir',
    role: 'HR & MANAGER',
    bio: 'Optimizing team performance and managing global client relations to ensure seamless delivery and world-class quality across all departments.',
    responsibilities: ['Operations Management', 'Talent Acquisition', 'Client Success'],
    fallbackUrl: 'https://i.postimg.cc/zGJXFmTK/Whats-App-Image-2026-05-05-at-10-56-09.jpg', 
    photo: undefined,
    order: 3,
  }
];
