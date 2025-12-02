"use client";

import { useNewsStore } from "@/store/newsStore";
import { Bookmark, BookmarkX, ArrowLeft } from "lucide-react";
import { BookmarkCard } from "@/components/BookmarkCard";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useNewsStore();

  if (!bookmarks.length) {
    return (
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-96 bg-grid opacity-50" />
        <div className="absolute inset-x-0 top-0 h-96 bg-hero-gradient" />

        <div className="relative container-main py-20">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-3xl blur-2xl bg-rose-500/20" />
              <div className="relative w-24 h-24 rounded-3xl bg-[var(--color-primary-light)] grid place-items-center">
                <BookmarkX className="w-12 h-12 text-[var(--color-primary)]" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-3">No saved articles yet</h1>
            <p className="text-[var(--color-ink-muted)] max-w-md mb-8 leading-relaxed">
              Start saving articles you want to read later. They'll appear here
              for quick and easy access.
            </p>

            <a href="/" className="btn btn-primary">
              <ArrowLeft className="w-4 h-4" />
              Browse News
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-grid opacity-50" />
      <div className="absolute inset-x-0 top-0 h-96 bg-hero-gradient" />

      <div className="relative container-main py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-500 rounded-2xl blur-xl opacity-30" />
            <div className="relative grid place-items-center w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-400 rounded-2xl shadow-xl">
              <Bookmark className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Saved Articles</h1>
            <p className="text-[var(--color-ink-muted)] mt-1">
              {bookmarks.length} article{bookmarks.length !== 1 && "s"} saved
              for later
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((b, i) => (
            <BookmarkCard
              key={b.id}
              bookmark={b}
              index={i}
              onRemove={removeBookmark}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
