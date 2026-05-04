'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImage } from '@/lib/types';

interface BeforeAfterSliderProps {
  beforeImage: SanityImage;
  afterImage: SanityImage;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="before-after-slider relative aspect-[16/9] rounded-[2rem] overflow-hidden cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (full) */}
      <Image
        src={urlFor(afterImage).width(1200).height(675).url()}
        alt="After"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 800px"
      />

      {/* Before Image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src={urlFor(beforeImage).width(1200).height(675).url()}
          alt="Before"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 800px"
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-[var(--accent)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-lg">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L2 8L5 13M11 3L14 8L11 13" stroke="var(--accent-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[3px] uppercase bg-[var(--bg)]/80 text-[var(--text)] px-2 py-1 rounded-sm">Before</div>
      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[3px] uppercase bg-[var(--bg)]/80 text-[var(--text)] px-2 py-1 rounded-sm">After</div>
    </div>
  );
}
