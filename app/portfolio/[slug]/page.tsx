import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Tag } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import {
  portfolioBySlugQuery,
  relatedPortfolioQuery,
  portfolioSlugsQuery,
} from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import type { PortfolioItem } from '@/lib/types';
import PortfolioDetailClient from './PortfolioDetailClient';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(portfolioSlugsQuery);
    return (slugs || []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const item = await client.fetch<PortfolioItem>(portfolioBySlugQuery, {
      slug: params.slug,
    });
    if (!item) return { title: 'Project Not Found' };
    return {
      title: `${item.title} — Portfolio`,
      description: item.description || `${item.title} — ${item.category} project by WEBRING`,
    };
  } catch {
    return { title: 'Portfolio | WEBRING' };
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let item: PortfolioItem | null = null;
  let related: PortfolioItem[] = [];

  try {
    item = await client.fetch<PortfolioItem>(portfolioBySlugQuery, {
      slug: params.slug,
    });
    if (item) {
      related = await client.fetch<PortfolioItem[]>(relatedPortfolioQuery, {
        category: item.category,
        slug: params.slug,
      });
    }
  } catch {
    // graceful fallback
  }

  if (!item) notFound();

  return (
    <div className="pt-20">
      {/* Back Link */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 font-body text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero Image */}
      <section className="py-8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-[var(--surface)]">
            <Image
              src={urlFor(item.mainImage).width(1400).height(788).url()}
              alt={item.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)] mb-4 block">
                {item.category}
              </span>
              <h1 className="font-display font-black uppercase tracking-tight text-display-lg mb-6">{item.title}</h1>
              {item.description && (
                <p className="font-body text-[var(--muted)] text-lg leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
            <div className="space-y-6">
              {item.clientIndustry && (
                <div>
                  <h3 className="font-mono text-[11px] tracking-[3px] uppercase text-[var(--muted)] mb-2">Industry</h3>
                  <p className="font-body text-[var(--text)]">{item.clientIndustry}</p>
                </div>
              )}
              <div>
                <h3 className="font-mono text-[11px] tracking-[3px] uppercase text-[var(--muted)] mb-2">Category</h3>
                <p className="font-body text-[var(--text)]">{item.category}</p>
              </div>
              {item.tags && item.tags.length > 0 && (
                <div>
                  <h3 className="font-mono text-[11px] tracking-[3px] uppercase text-[var(--muted)] mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 font-mono text-xs bg-[var(--surface)] border border-[var(--border)] px-3 py-1 rounded-full rounded-[2rem]">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Slider */}
      {item.beforeImage && item.afterImage && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
            <h2 className="font-display font-black uppercase tracking-tight text-display-md text-center mb-8">Before & After</h2>
            <PortfolioDetailClient
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
            />
          </div>
        </section>
      )}

      {/* Related */}
      {related && related.length > 0 && (
        <section className="py-16 bg-[var(--surface)]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
            <h2 className="font-display font-black uppercase tracking-tight text-display-md mb-10">Related Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r._id}
                  href={`/portfolio/${r.slug.current}`}
                  className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden"
                >
                  <Image
                    src={urlFor(r.mainImage).width(500).height(667).url()}
                    alt={r.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="font-mono text-[10px] tracking-[3px] uppercase text-[var(--accent)]">
                      {r.category}
                    </span>
                    <h3 className="font-condensed font-black uppercase text-lg text-white flex items-center gap-2">
                      {r.title}
                      <ArrowUpRight className="w-4 h-4" />
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <h2 className="font-display font-black uppercase tracking-tight text-display-md mb-4">Start a Similar Project</h2>
          <p className="font-body text-[var(--muted)] mb-8 max-w-md mx-auto">
            Impressed by what you see? Let&#39;s create something equally stunning for your brand.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-[var(--accent-text)] font-body text-sm font-extrabold uppercase rounded-full rounded-[2rem] hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all"
          >
            Book a Free Call
          </Link>
        </div>
      </section>
    </div>
  );
}
