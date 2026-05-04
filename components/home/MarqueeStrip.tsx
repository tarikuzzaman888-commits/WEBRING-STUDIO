'use client';

interface MarqueeStripProps {
  text: string;
}

export default function MarqueeStrip({ text }: MarqueeStripProps) {
  const marqueeText = text || 'AI PHOTOGRAPHY ✦ BRAND IDENTITY ✦ E-COMMERCE VISUALS ✦ LIFESTYLE SCENES ✦ VIDEO CONTENT ✦';
  const repeated = `${marqueeText} ${marqueeText} ${marqueeText} `;

  return (
    <div className="bg-[#0D0D0D] dark:bg-[var(--accent)] py-1 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-track">
          <span className="font-display text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] dark:text-[#000000] whitespace-nowrap px-4">
            {repeated}
          </span>
          <span className="font-display text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] dark:text-[#000000] whitespace-nowrap px-4">
            {repeated}
          </span>
        </div>
      </div>
    </div>
  );
}
