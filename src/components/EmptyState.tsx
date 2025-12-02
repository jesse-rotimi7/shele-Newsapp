import { SearchX, RefreshCw, AlertCircle, Newspaper } from "lucide-react";

interface Props {
  type: "no-results" | "error";
  message?: string;
  onRetry?: () => void;
}

export function EmptyState({ type, message, onRetry }: Props) {
  const isError = type === "error";

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-8">
        <div
          className={`absolute inset-0 rounded-3xl blur-2xl ${isError ? "bg-rose-500/20" : "bg-[var(--color-ink)]/5"}`}
        />
        <div
          className={`relative w-24 h-24 rounded-3xl grid place-items-center ${isError ? "bg-[var(--color-primary-light)]" : "bg-[var(--color-surface-alt)]"}`}
        >
          {isError ? (
            <AlertCircle className="w-12 h-12 text-[var(--color-primary)]" />
          ) : (
            <SearchX className="w-12 h-12 text-[var(--color-ink-muted)]" />
          )}
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-3">
        {isError ? "Oops! Something went wrong" : "No articles found"}
      </h3>

      <p className="text-[var(--color-ink-muted)] max-w-md mb-8 leading-relaxed">
        {message ||
          (isError
            ? "We couldn't load the news right now. This might be a temporary issue. Please try again."
            : "We couldn't find any articles matching your criteria. Try adjusting your filters or search terms.")}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={isError ? "btn btn-primary" : "btn btn-secondary"}
        >
          <RefreshCw className="w-4 h-4" />
          {isError ? "Try Again" : "Clear Filters"}
        </button>
      )}

      {!isError && (
        <a href="/" className="mt-4 btn btn-ghost">
          <Newspaper className="w-4 h-4" />
          Browse all news
        </a>
      )}
    </div>
  );
}
