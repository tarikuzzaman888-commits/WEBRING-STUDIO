'use client';

interface MarqueeStripProps {
  text: string;
}

export default function MarqueeStrip({ text }: MarqueeStripProps) {
  const marqueeText = text || 'AI PHOTOGRAPHY ✦ BRAND IDENTITY ✦ E-COMMERCE VISUALS ✦ LIFESTYLE SCENES ✦ VIDEO CONTENT ✦';
  const repeated = `${marqueeText} ${marqueeText} ${marqueeText} `;

  return (
    <div className="bg-[#0D0D0D] dark:bg-[#CCFF00] py-4 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-track">
          <span className="font-display text-base md:text-lg font-bold uppercase tracking-widest text-[var(--accent)] dark:text-[#000000] whitespace-nowrap px-4">
            {repeated}
          </span>
          <span className="font-display text-base md:text-lg font-bold uppercase tracking-widest text-[var(--accent)] dark:text-[#000000] whitespace-nowrap px-4">
            {repeated}
          </span>
        </div>
      </div>
    </div>
  );
}
