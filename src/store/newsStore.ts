import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewsCategory, NewsFilters } from "@/types/news";
import { DEFAULT_FILTERS } from "@/types/news";

interface BookmarkedArticle {
  id: string;
  title: string;
  image_url: string | null;
  source_name: string;
  link: string;
  savedAt: string;
}

interface NewsStore {
  // Filters
  filters: NewsFilters;
  setCategory: (category: NewsCategory | null) => void;
  setQuery: (query: string) => void;
  setCountry: (country: string) => void;
  setLanguage: (language: string) => void;
  resetFilters: () => void;

  // Bookmarks
  bookmarks: BookmarkedArticle[];
  addBookmark: (article: BookmarkedArticle) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;

  // UI State
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useNewsStore = create<NewsStore>()(
  persist(
    (set, get) => ({
      // Filters
      filters: DEFAULT_FILTERS,
      setCategory: (category) =>
        set((state) => ({
          filters: { ...state.filters, category },
        })),
      setQuery: (query) =>
        set((state) => ({
          filters: { ...state.filters, query },
        })),
      setCountry: (country) =>
        set((state) => ({
          filters: { ...state.filters, country },
        })),
      setLanguage: (language) =>
        set((state) => ({
          filters: { ...state.filters, language },
        })),
      resetFilters: () => set({ filters: DEFAULT_FILTERS }),

      // Bookmarks
      bookmarks: [],
      addBookmark: (article) =>
        set((state) => ({
          bookmarks: [
            ...state.bookmarks,
            { ...article, savedAt: new Date().toISOString() },
          ],
        })),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),
      isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),

      // UI State
      isMobileMenuOpen: false,
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),

      // Theme
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "shele-news-storage",
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        isDarkMode: state.isDarkMode,
        filters: {
          country: state.filters.country,
          language: state.filters.language,
        },
      }),
    }
  )
);
