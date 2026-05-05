'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-xl cursor-ew-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={onMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={onTouchMove}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image 
          src={afterImage} 
          alt="After" 
          fill 
          className="object-cover" 
          draggable={false}
        />
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest z-10">
          After
        </div>
      </div>

      {/* Before Image (Clip) */}
      <div 
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image 
          src={beforeImage} 
          alt="Before" 
          fill 
          className="object-cover" 
          draggable={false}
        />
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest z-10">
          Before
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-[2px] h-full bg-[var(--accent)] shadow-[0_0_15px_rgba(200,255,0,0.5)]" />
        <div className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--accent)] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#0A0A0A]">
          <div className="flex gap-0.5">
            <div className="w-1.5 h-1.5 border-t-2 border-l-2 border-black -rotate-45" />
            <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-black rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}
