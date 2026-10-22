'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, SlidersHorizontal } from 'lucide-react';

interface FilterDropdownProps {
  /** Category list from data.json */
  options: string[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible label from data.json (e.g. "Filter causes by category") */
  label: string;
  className?: string;
}

/**
 * Mobile replacement for the category pill tabs.
 * Shown below `md`; the pill row is used from `md` upwards.
 */
export default function FilterDropdown({ options, value, onChange, label, className = '' }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Close on outside click / Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative w-full max-w-[340px] mx-auto ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        className={`w-full flex items-center gap-2.5 rounded-full bg-white border pl-4 pr-3.5 py-2.5 text-left transition-all duration-200 shadow-[0_2px_10px_rgba(17,56,36,0.05)] ${
          isOpen
            ? 'border-[#1a5d3a] ring-2 ring-[#1a5d3a]/15'
            : 'border-[#d8e2d9] hover:border-[#1a5d3a]/60'
        }`}
      >
        <SlidersHorizontal className="w-4 h-4 text-[#1a5d3a] shrink-0" />
        <span className="flex-1 truncate text-[14px] font-semibold text-[#113824]">{value}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a5d3a]/8 text-[#1a5d3a] shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 z-40 max-h-[60vh] overflow-y-auto rounded-[16px] bg-white/95 backdrop-blur-md border border-[#1a5d3a]/20 shadow-[0_14px_40px_rgba(17,56,36,0.14)] p-1.5 space-y-0.5"
          >
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <li key={opt} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-[14px] rounded-[10px] text-left transition-colors duration-150 ${
                      isSelected
                        ? 'bg-[#1a5d3a] text-white font-semibold'
                        : 'text-[#113824] hover:bg-[#1a5d3a]/8 active:bg-[#1a5d3a]/12'
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    {isSelected && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
