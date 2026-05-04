export default function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className || ''}`}>
      {/* Aperture / Crosshair Icon */}
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-10 h-10 text-[var(--accent)] flex-shrink-0">
        <mask id="aperture-mask">
          <rect width="100" height="100" fill="white" />
          {/* Vertical Cut */}
          <rect x="44" y="0" width="12" height="100" fill="black" />
          {/* Horizontal Cut */}
          <rect x="0" y="44" width="100" height="12" fill="black" />
          {/* Inner Circle Hole */}
          <circle cx="50" cy="50" r="22" fill="black" />
        </mask>
        {/* Outer Circle */}
        <circle cx="50" cy="50" r="46" mask="url(#aperture-mask)" />
      </svg>
      
      {/* Text Group */}
      <div className="flex flex-col justify-center pt-1">
        <span className="font-display font-black uppercase text-[1.4rem] leading-none tracking-tighter text-[var(--text)]">
          WEBRING
        </span>
        <span className="font-body text-[0.6rem] font-light uppercase tracking-[0.5em] leading-none mt-1.5 text-[var(--text)] ml-0.5">
          STUDIO
        </span>
      </div>
    </div>
  );
}
