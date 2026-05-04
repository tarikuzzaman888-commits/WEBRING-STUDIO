import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-[clamp(5rem,15vw,12rem)] leading-none text-accent/20 mb-4">
          404
        </h1>
        <h2 className="font-display text-display-md mb-4">
          Page not found
        </h2>
        <p className="font-body text-muted text-lg mb-8 max-w-md mx-auto">
          The page you&#39;re looking for doesn&#39;t exist or has been moved.
          Let&#39;s get you back on track.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-accent text-[#0A0A0A] font-body text-sm font-medium rounded-full hover:shadow-lg hover:shadow-accent/20 transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border border-border text-foreground font-body text-sm font-medium rounded-full hover:border-accent hover:text-accent transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
