import type { PortfolioItem, TeamMember } from './types';

export const fallbackPortfolio: PortfolioItem[] = [
  {
    _id: 'p1',
    title: 'Porrada Fightwear',
    slug: { current: 'porrada-fightwear' },
    category: 'E-commerce',
    fallbackUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop', // Sports/Gym aesthetic
    mainImage: undefined!,
    featured: true,
    order: 1,
  },
  {
    _id: 'p2',
    title: 'NOIRÉ Beauty',
    slug: { current: 'noire-beauty' },
    category: 'AI Photography',
    fallbackUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop', // Beauty/Makeup aesthetic
    mainImage: undefined!,
    featured: true,
    order: 2,
  },
  {
    _id: 'p3',
    title: 'The Sofa Republic',
    slug: { current: 'sofa-republic' },
    category: 'Lifestyle',
    fallbackUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=600&auto=format&fit=crop', // Furniture aesthetic
    mainImage: undefined!,
    featured: true,
    order: 3,
  },
  {
    _id: 'p4',
    title: 'Email Marketing Campaigns',
    slug: { current: 'email-marketing' },
    category: 'Branding',
    fallbackUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop', // Tech/Email aesthetic
    mainImage: undefined!,
    featured: true,
    order: 4,
  },
  {
    _id: 'p5',
    title: 'Fashion Lookbook',
    slug: { current: 'fashion-lookbook' },
    category: 'E-commerce',
    fallbackUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop', // Fashion
    mainImage: undefined!,
    featured: false,
    order: 5,
  },
  {
    _id: 'p6',
    title: 'Minimalist Watch Ads',
    slug: { current: 'minimalist-watch' },
    category: 'AI Photography',
    fallbackUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop', // Product photography
    mainImage: undefined!,
    featured: false,
    order: 6,
  }
];

export const fallbackTeam: TeamMember[] = [
  {
    _id: 't1',
    name: 'Sheikh Mariful I.',
    role: 'AI Image Generation Expert',
    bio: 'AI image manipulation expert with 100% Job Success on Upwork. 3+ years delivering high-converting product visuals, lifestyle mockups, and ad creatives for global e-commerce brands.',
    responsibilities: ['AI Photography', 'Adobe Photoshop', 'Midjourney AI', 'Meta Ad Creatives'],
    fallbackUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', // Mari Placeholder
    photo: undefined,
    order: 1,
  },
  {
    _id: 't2',
    name: 'Tarikuzzaman Sabbir',
    role: 'Visual Engineer & Founder',
    bio: 'Creative visionary obsessed with blending human artistry and AI. Leading the strategy and visual engineering to help brands scale their digital presence.',
    responsibilities: ['Brand Strategy', 'Visual Direction', 'Figma', 'UI/UX Design'],
    fallbackUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', // Sabbir Placeholder
    photo: undefined,
    order: 2,
  },
  {
    _id: 't3',
    name: 'Sarah Chen',
    role: 'Project Manager',
    bio: 'Ensuring seamless delivery and communication. Keeping every project on track, on time, and above expectations for our global clients.',
    responsibilities: ['Client Relations', 'Timeline Management', 'Quality Assurance'],
    fallbackUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop', // Manager Placeholder
    photo: undefined,
    order: 3,
  }
];
