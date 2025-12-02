"use client";

import { useNewsStore } from "@/store/newsStore";
import { Bookmark, ExternalLink, Trash2, Clock, BookmarkX, ArrowLeft } from "lucide-react";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useNewsStore();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

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
              Start saving articles you want to read later. They'll appear here for quick and easy access.
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
              {bookmarks.length} article{bookmarks.length !== 1 && "s"} saved for later
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((b, i) => (
            <article
              key={b.id}
              className="group card-interactive flex flex-col animate-slide-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {b.image_url ? (
                  <img
                    src={b.image_url}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-500/10 to-rose-400/10 grid place-items-center">
                    <span className="text-5xl opacity-20">📰</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold leading-snug line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {b.title}
                </h3>
                
                <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
                  <span className="font-medium">{b.source_name}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-ink-faint)]" />
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Saved {formatDate(b.savedAt)}
                  </span>
                </div>
              </div>

              <div className="px-5 pb-5 flex gap-2">
                <a
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Read Article
                </a>
                <button
                  type="button"
                  onClick={() => removeBookmark(b.id)}
                  className="btn btn-icon border border-[var(--color-line)] hover:bg-red-50 hover:text-red-500 hover:border-red-200 rounded-xl"
                  aria-label="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
