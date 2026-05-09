'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  className?: string;
}

export default function EmailInput({ value, onChange, id, placeholder, className }: EmailInputProps) {
  const [isBlurred, setIsBlurred] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(value);
  const isInvalid = isBlurred && value.length > 0 && !isValid;

  const borderColor = isInvalid 
    ? '#EF4444' 
    : isValid 
      ? '#22C55E' 
      : 'var(--border)';

  return (
    <div className={cn("space-y-2", className)}>
      <div 
        className="flex h-[56px] w-full rounded-xl border bg-[var(--bg)] transition-all duration-300"
        style={{ borderColor }}
      >
        <input
          id={id}
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          onBlur={() => setIsBlurred(true)}
          placeholder={placeholder || "yourname@example.com"}
          name="email"
          autoComplete="email"
          className="h-full w-full bg-transparent px-4 py-2 text-base outline-none text-[var(--text)]"
        />
      </div>
    </div>
  );
}
