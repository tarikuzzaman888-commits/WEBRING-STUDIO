import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[var(--bg)]">
      <span className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)] mb-6 block">// Error 404</span>
      <h1 className="font-display font-black uppercase tracking-tight text-display-xl mb-4">
        Page Not Found
      </h1>
      <p className="font-body text-[var(--muted)] text-lg mb-8 max-w-md">
        The page you&#39;re looking for doesn&#39;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 bg-[var(--accent)] text-[var(--accent-text)] font-body text-sm font-extrabold uppercase rounded-full rounded-[2rem] hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all"
      >
        Go Home
      </Link>
    </div>
  );
}
