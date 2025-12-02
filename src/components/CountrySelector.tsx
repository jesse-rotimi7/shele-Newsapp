"use client";

import { useState, useRef, useEffect } from "react";
import { Globe2, Check, ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { useNewsStore } from "@/store/newsStore";

interface Country {
  code: string;
  name: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  // North America
  { code: "us", name: "United States", flag: "🇺🇸" },
  { code: "ca", name: "Canada", flag: "🇨🇦" },
  { code: "mx", name: "Mexico", flag: "🇲🇽" },
  
  // Europe
  { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "es", name: "Spain", flag: "🇪🇸" },
  { code: "it", name: "Italy", flag: "🇮🇹" },
  { code: "nl", name: "Netherlands", flag: "🇳🇱" },
  { code: "se", name: "Sweden", flag: "🇸🇪" },
  { code: "no", name: "Norway", flag: "🇳🇴" },
  { code: "ch", name: "Switzerland", flag: "🇨🇭" },
  
  // Asia
  { code: "in", name: "India", flag: "🇮🇳" },
  { code: "jp", name: "Japan", flag: "🇯🇵" },
  { code: "cn", name: "China", flag: "🇨🇳" },
  { code: "kr", name: "South Korea", flag: "🇰🇷" },
  { code: "sg", name: "Singapore", flag: "🇸🇬" },
  { code: "ae", name: "UAE", flag: "🇦🇪" },
  
  // Oceania
  { code: "au", name: "Australia", flag: "🇦🇺" },
  { code: "nz", name: "New Zealand", flag: "🇳🇿" },
  
  // South America
  { code: "br", name: "Brazil", flag: "🇧🇷" },
  { code: "ar", name: "Argentina", flag: "🇦🇷" },
  
  // Africa
  { code: "ng", name: "Nigeria", flag: "🇳🇬" },
  { code: "za", name: "South Africa", flag: "🇿🇦" },
  { code: "eg", name: "Egypt", flag: "🇪🇬" },
  { code: "ke", name: "Kenya", flag: "🇰🇪" },
  { code: "gh", name: "Ghana", flag: "🇬🇭" },
  { code: "tn", name: "Tunisia", flag: "🇹🇳" },
  { code: "ma", name: "Morocco", flag: "🇲🇦" },
  { code: "et", name: "Ethiopia", flag: "🇪🇹" },
  { code: "ug", name: "Uganda", flag: "🇺🇬" },
  { code: "sn", name: "Senegal", flag: "🇸🇳" },
];

interface CountrySelectorProps {
  variant?: "desktop" | "mobile";
}

export function CountrySelector({ variant = "desktop" }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { filters, setCountry } = useNewsStore();

  const selectedCountry =
    COUNTRIES.find((c) => c.code === filters.country) || COUNTRIES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (code: string) => {
    setCountry(code);
    setIsOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div className="py-2">
        <div className="flex items-center gap-2 px-4 py-2 text-xs text-[var(--color-ink-muted)] font-medium uppercase">
          <Globe2 className="w-4 h-4" />
          <span>Country</span>
        </div>
        <div className="space-y-1 px-2">
          {COUNTRIES.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => handleSelect(country.code)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left",
                filters.country === country.code
                  ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                  : "hover:bg-[var(--color-surface-alt)]",
              )}
            >
              <span className="text-2xl">{country.flag}</span>
              <span className="font-medium flex-1">{country.name}</span>
              {filters.country === country.code && (
                <Check className="w-5 h-5 text-[var(--color-primary)]" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost rounded-xl min-w-[140px]"
        aria-label="Select country"
      >
        <Globe2 className="w-4 h-4" />
        <span className="text-xl">{selectedCountry.flag}</span>
        <span className="hidden lg:inline">{selectedCountry.name}</span>
        <ChevronDown
          className={clsx(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 glass border border-[var(--color-line)] rounded-2xl shadow-2xl overflow-hidden animate-slide-down z-50">
          <div className="max-h-[400px] overflow-y-auto py-2">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country.code)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-3 transition-colors text-left hover:bg-[var(--color-surface-alt)]",
                  filters.country === country.code &&
                    "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
                )}
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="font-medium flex-1">{country.name}</span>
                {filters.country === country.code && (
                  <Check className="w-5 h-5 text-[var(--color-primary)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
