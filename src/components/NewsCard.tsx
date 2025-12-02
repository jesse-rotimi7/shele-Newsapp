"use client";

import { clsx } from "clsx";
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { useNewsStore } from "@/store/newsStore";
import { formatRelativeTime, truncateText } from "@/lib/api";
import type { NewsArticle } from "@/types/news";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "featured" | "compact";
  index?: number;
}

export function NewsCard({
  article,
  variant = "default",
  index = 0,
}: NewsCardProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useNewsStore();
  const bookmarked = isBookmarked(article.article_id);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    bookmarked
      ? removeBookmark(article.article_id)
      : addBookmark({
          id: article.article_id,
          title: article.title,
          image_url: article.image_url,
          source_name: article.source_name,
          link: article.link,
          savedAt: new Date().toISOString(),
        });
  };

  const style = { animationDelay: `${index * 0.08}s` };

  // Featured variant
  if (variant === "featured") {
    return (
      <article
        className="group relative overflow-hidden rounded-3xl animate-slide-up"
        style={style}
      >
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden">
            {article.image_url ? (
              <img
                src={article.image_url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-rose-500/20 to-rose-400/20 grid place-items-center">
                <span className="text-8xl opacity-20">📰</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent" />
            </div>

            {article.category?.[0] && (
              <span className="badge absolute top-4 left-4 sm:top-6 sm:left-6">
                {article.category[0]}
              </span>
            )}

            <button
              type="button"
              onClick={toggleBookmark}
              className={clsx(
                "absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full transition-all duration-200",
                bookmarked
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30",
              )}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
            >
              {bookmarked ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>

            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-rose-100 transition-colors">
                {truncateText(article.title, 100)}
              </h2>

              {article.description && (
                <p className="text-white/70 text-sm sm:text-base line-clamp-2 mb-4 hidden sm:block">
                  {truncateText(article.description, 150)}
                </p>
              )}

              <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                <span className="font-medium text-white/80 text-sm">
                  {article.source_name}
                </span>
                <span className="flex items-center gap-1 text-white/60 text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  {formatRelativeTime(article.pubDate)}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-white/60 text-sm group-hover:text-white transition-colors ml-auto">
                  Read more <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </a>
      </article>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <article
        className="group card-interactive flex gap-4 p-4 animate-slide-up"
        style={style}
      >
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 flex-1 min-w-0"
        >
          <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
            {article.image_url ? (
              <img
                src={article.image_url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-rose-500/10 to-rose-400/10 grid place-items-center">
                <span className="text-2xl opacity-30">📰</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
              {article.title}
            </h3>
            <div className="mt-auto pt-2 flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
              <span className="font-medium">{article.source_name}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-ink-faint)]" />
              <span>{formatRelativeTime(article.pubDate)}</span>
            </div>
          </div>
        </a>

        <button
          type="button"
          onClick={toggleBookmark}
          className={clsx(
            "self-start p-2 rounded-lg transition-all",
            bookmarked
              ? "text-[var(--color-primary)] bg-[var(--color-primary-light)]"
              : "text-[var(--color-ink-faint)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]",
          )}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
        >
          {bookmarked ? (
            <BookmarkCheck className="w-4 h-4" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>
      </article>
    );
  }

  // Default variant
  return (
    <article
      className="group card-interactive flex flex-col animate-slide-up"
      style={style}
    >
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {article.image_url ? (
            <img
              src={article.image_url}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-rose-500/10 to-rose-400/10 grid place-items-center">
              <span className="text-5xl opacity-20">📰</span>
            </div>
          )}

          {article.category?.[0] && (
            <span className="badge-subtle absolute top-3 left-3">
              {article.category[0]}
            </span>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-bold leading-snug line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
            {article.title}
          </h3>

          {article.description && (
            <p className="mt-2 text-sm text-[var(--color-ink-muted)] line-clamp-2">
              {truncateText(article.description, 120)}
            </p>
          )}

          <div className="mt-auto pt-4 flex items-center justify-between text-xs text-[var(--color-ink-muted)]">
            <div className="flex items-center gap-2">
              {article.source_icon && (
                <img
                  src={article.source_icon}
                  alt=""
                  className="w-4 h-4 rounded-full"
                />
              )}
              <span className="font-medium">{article.source_name}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-ink-faint)]" />
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatRelativeTime(article.pubDate)}
              </span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </a>

      <div className="px-5 pb-5">
        <button
          type="button"
          onClick={toggleBookmark}
          className={clsx(
            "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all",
            bookmarked
              ? "bg-[var(--color-primary)] text-white shadow-lg"
              : "bg-[var(--color-surface-alt)] text-[var(--color-ink-muted)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]",
          )}
          style={
            bookmarked
              ? { boxShadow: "0 10px 15px -3px rgba(225, 29, 72, 0.25)" }
              : {}
          }
        >
          {bookmarked ? (
            <>
              <BookmarkCheck className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4" />
              Save for later
            </>
          )}
        </button>
      </div>
    </article>
  );
}
