"use client";

import { useState } from "react";
import { Clock, ExternalLink, Trash2 } from "lucide-react";

interface BookmarkedArticle {
  id: string;
  title: string;
  image_url: string | null;
  source_name: string;
  link: string;
  savedAt: string;
}

interface BookmarkCardProps {
  bookmark: BookmarkedArticle;
  index: number;
  onRemove: (id: string) => void;
}

export function BookmarkCard({
  bookmark,
  index,
  onRemove,
}: BookmarkCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const showPlaceholder = !bookmark.image_url || imageError;

  return (
    <article
      className="group card-interactive flex flex-col animate-slide-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {showPlaceholder ? (
          <div className="w-full h-full bg-gradient-to-br from-rose-500/10 to-rose-400/10 grid place-items-center">
            <span className="text-5xl opacity-20">📰</span>
          </div>
        ) : (
          <img
            src={bookmark.image_url || ""}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={handleImageError}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold leading-snug line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
          {bookmark.title}
        </h3>

        <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
          <span className="font-medium">{bookmark.source_name}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--color-ink-faint)]" />
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Saved {formatDate(bookmark.savedAt)}
          </span>
        </div>
      </div>

      <div className="px-5 pb-5 flex gap-2">
        <a
          href={bookmark.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary flex-1 text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Read Article
        </a>
        <button
          type="button"
          onClick={() => onRemove(bookmark.id)}
          className="btn btn-icon border border-[var(--color-line)] hover:bg-red-50 hover:text-red-500 hover:border-red-200 rounded-xl"
          aria-label="Remove from saved"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}

