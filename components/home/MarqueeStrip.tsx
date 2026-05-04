'use client';

interface MarqueeStripProps {
  text: string;
}

export default function MarqueeStrip({ text }: MarqueeStripProps) {
  const marqueeContent = text || 'AI Product Photography ✦ Brand Identity ✦ E-commerce Visuals ✦ Lifestyle Shoots ✦ Video Content ✦ Creative Direction ✦';

  const repeatedText = `${marqueeContent} ${marqueeContent} ${marqueeContent} ${marqueeContent} `;

  return (
    <section className="bg-[#0D0D0D] py-6 md:py-8 overflow-hidden" id="marquee-strip">
      {/* Row 1 — Left to Right */}
      <div className="marquee-container mb-3">
        <div className="marquee-track">
          <span className="font-display text-2xl md:text-3xl lg:text-4xl text-[#F5F5F5]/90 whitespace-nowrap tracking-tight">
            {repeatedText}
          </span>
          <span className="font-display text-2xl md:text-3xl lg:text-4xl text-[#F5F5F5]/90 whitespace-nowrap tracking-tight">
            {repeatedText}
          </span>
        </div>
      </div>

      {/* Row 2 — Right to Left (gold) */}
      <div className="marquee-container">
        <div className="marquee-track-reverse">
          <span className="font-display text-2xl md:text-3xl lg:text-4xl text-[#C8A96E]/80 whitespace-nowrap tracking-tight italic">
            {repeatedText}
          </span>
          <span className="font-display text-2xl md:text-3xl lg:text-4xl text-[#C8A96E]/80 whitespace-nowrap tracking-tight italic">
            {repeatedText}
          </span>
        </div>
      </div>
    </section>
  );
}
