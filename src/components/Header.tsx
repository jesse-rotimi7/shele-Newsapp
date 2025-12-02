"use client";

import { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import {
  Newspaper,
  Menu,
  X,
  Bookmark,
  Search,
  Flame,
  Briefcase,
  Cpu,
  Clapperboard,
  Trophy,
  FlaskConical,
  HeartPulse,
  Landmark,
  Globe,
  Leaf,
  Utensils,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useNewsStore } from "@/store/newsStore";
import { NEWS_CATEGORIES } from "@/types/news";
import type { NewsCategory, CategoryIconKey } from "@/types/news";
import { CountrySelector } from "@/components/CountrySelector";

const iconMap: Record<CategoryIconKey, LucideIcon> = {
  flame: Flame,
  briefcase: Briefcase,
  cpu: Cpu,
  clapperboard: Clapperboard,
  trophy: Trophy,
  flask: FlaskConical,
  "heart-pulse": HeartPulse,
  landmark: Landmark,
  globe: Globe,
  leaf: Leaf,
  utensils: Utensils,
  sparkles: Sparkles,
};

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    filters,
    setCategory,
    setQuery,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    bookmarks,
    isDarkMode,
    toggleDarkMode,
  } = useNewsStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkCategoryScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    checkCategoryScroll();
    window.addEventListener("resize", checkCategoryScroll);
    return () => window.removeEventListener("resize", checkCategoryScroll);
  }, []);

  const scrollCategories = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (category: NewsCategory) => {
    setCategory(category);
    closeMobileMenu();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setQuery(formData.get("query") as string);
    setIsSearchOpen(false);
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 glass transition-all duration-300",
        isScrolled ? "shadow-xl" : "shadow-sm",
      )}
    >
      {/* Top Bar */}
      <div className="container-main flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative grid place-items-center w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-400 rounded-xl shadow-lg">
              <Newspaper className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="">
            <span className="text-xl font-bold">
              Shele<span className="text-gradient">News</span>
            </span>
            <p className="text-xs text-[var(--color-ink-muted)] -mt-0.5">
              Stay informed
            </p>
          </div>
        </a>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:block flex-1 max-w-md mx-8"
        >
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--color-ink-muted)] group-focus-within:text-[var(--color-primary)] transition-colors pointer-events-none" />
            <input
              type="text"
              name="query"
              placeholder="Search for news..."
              defaultValue={filters.query}
              className="w-full pl-11 pr-4 py-3 bg-[var(--color-surface-alt)] border border-[var(--color-line)] rounded-xl text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all duration-200"
            />
          </div>
        </form>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <CountrySelector variant="desktop" />

          <button
            type="button"
            onClick={toggleDarkMode}
            className="btn btn-icon rounded-xl"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <a href="/bookmarks" className="btn btn-ghost rounded-xl">
            <Bookmark className="w-4 h-4" />
            <span>Saved</span>
            {bookmarks.length > 0 && (
              <span className="grid place-items-center min-w-[20px] h-5 px-1 bg-[var(--color-primary)] text-white text-xs font-bold rounded-full">
                {bookmarks.length}
              </span>
            )}
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-1">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="btn btn-icon rounded-xl"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="btn btn-icon rounded-xl"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="btn btn-icon rounded-xl"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <form
          onSubmit={handleSearch}
          className="md:hidden container-main pb-4 animate-slide-down"
        >
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--color-ink-muted)] pointer-events-none" />
            <input
              type="text"
              name="query"
              placeholder="Search for news..."
              defaultValue={filters.query}
              autoFocus
              className="w-full pl-11 pr-4 py-3 bg-[var(--color-surface-alt)] border border-[var(--color-line)] rounded-xl text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all duration-200"
            />
          </div>
        </form>
      )}

      {/* Category Navigation */}
      <nav className="border-t border-[var(--color-line)]/30 bg-white/30 dark:bg-black/20 backdrop-blur-sm">
        <div className="container-main relative py-3">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scrollCategories("left")}
            className={clsx(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10 btn btn-icon glass shadow-lg border-0 rounded-full",
              showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Categories */}
          <div
            ref={scrollRef}
            onScroll={checkCategoryScroll}
            className="overflow-x-auto scrollbar-hide mx-6"
          >
            <div className="flex items-center gap-2">
              {NEWS_CATEGORIES.map((cat) => {
                const Icon = iconMap[cat.iconKey];
                const isActive = filters.category === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategoryClick(cat.value)}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200",
                      isActive
                        ? "bg-[var(--color-primary)] text-white shadow-lg"
                        : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)]",
                    )}
                    style={
                      isActive
                        ? {
                            boxShadow:
                              "0 10px 15px -3px rgba(225, 29, 72, 0.25)",
                          }
                        : {}
                    }
                  >
                    <Icon
                      className={clsx(
                        "w-4 h-4",
                        isActive && "animate-scale-in",
                      )}
                    />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scrollCategories("right")}
            className={clsx(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10 btn btn-icon glass shadow-lg border-0 rounded-full",
              showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[calc(4rem+49px)] z-40">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fade-in"
            onClick={closeMobileMenu}
          />
          <div className="absolute top-0 inset-x-0 glass border-b border-[var(--color-line)]/50 shadow-2xl animate-slide-down max-h-[70vh] overflow-y-auto">
            <div className="container-main py-4">
              <a
                href="/bookmarks"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--color-surface-alt)] transition-colors mb-2"
              >
                <Bookmark className="w-5 h-5 text-[var(--color-ink-muted)]" />
                <span className="font-medium">Saved Articles</span>
                {bookmarks.length > 0 && (
                  <span className="ml-auto badge">{bookmarks.length}</span>
                )}
              </a>

              <div className="border-t border-[var(--color-line)]/30 my-2" />

              <CountrySelector variant="mobile" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
