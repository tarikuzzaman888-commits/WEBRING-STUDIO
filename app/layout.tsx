import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import type { SiteSettings } from '@/lib/types';

export const metadata: Metadata = {
  title: {
    default: 'WEBRING — AI Product Photography & Brand Visual Studio',
    template: '%s | WEBRING',
  },
  description: "We Don't Just Edit. We Engineer Reality. AI-powered product photography and brand visuals for e-commerce brands worldwide. Based in Bangladesh.",
  keywords: ['AI product photography', 'e-commerce photography', 'brand identity', 'AI visuals', 'product branding', 'WEBRING'],
  authors: [{ name: 'WEBRING' }],
  creator: 'WEBRING',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://webring.studio'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'WEBRING',
    title: 'WEBRING — AI Product Photography & Brand Visual Studio',
    description: "We Don't Just Edit. We Engineer Reality. AI-powered product photography and brand visuals.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WEBRING — AI Product Photography & Brand Visual Studio',
    description: "We Don't Just Edit. We Engineer Reality.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
};

async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 3600 } });
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-body">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar siteSettings={siteSettings} />
          <main className="min-h-screen">{children}</main>
          <Footer siteSettings={siteSettings} />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--surface)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
