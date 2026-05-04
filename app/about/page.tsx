import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { teamMembersQuery } from '@/sanity/lib/queries';
import type { TeamMember } from '@/lib/types';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us — The Minds Behind WEBRING',
  description: 'Meet the creative team behind WEBRING. We are a Bangladesh-based AI-powered product photography and brand visual studio serving clients worldwide.',
};

export const revalidate = 3600;

const fallbackTeam: TeamMember[] = [
  {
    _id: '1',
    name: 'Shiekh Mariful',
    role: 'CEO',
    responsibilities: ['Creative Final Decision Maker', 'Consultation'],
    bio: 'Visionary leader driving WEBRING\'s creative direction. Shiekh ensures every project meets the highest standards of visual excellence.',
    order: 0,
  },
  {
    _id: '2',
    name: 'Many',
    role: 'Co-Founder',
    responsibilities: ['Lead Generation', 'Consultation'],
    bio: 'Strategic mind behind WEBRING\'s growth. Many connects brands with our creative solutions and ensures client success.',
    order: 1,
  },
  {
    _id: '3',
    name: 'Tarikuzzaman Sabbir',
    role: 'HR & Manager',
    responsibilities: ['Creative Initial Decision Maker', 'Editor'],
    bio: 'The creative engine of WEBRING. Sabbir oversees the editing pipeline and makes initial creative decisions that shape every project.',
    order: 2,
  },
];

async function getTeam(): Promise<TeamMember[]> {
  try {
    const team = await client.fetch<TeamMember[]>(teamMembersQuery);
    return team && team.length > 0 ? team : fallbackTeam;
  } catch {
    return fallbackTeam;
  }
}

export default async function AboutPage() {
  const team = await getTeam();
  return <AboutPageClient team={team} />;
}
