'use client';

import { cn } from '@/lib/utils';

interface FilterTabsProps {
  categories: string[];
  active: string;
  onSelect: (cat: string) => void;
}

export default function FilterTabs({ categories, active, onSelect }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-3" id="filter-tabs">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            'px-5 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300',
            active === cat
              ? 'bg-accent text-[#0A0A0A]'
              : 'border border-border text-muted hover:border-accent hover:text-accent'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
