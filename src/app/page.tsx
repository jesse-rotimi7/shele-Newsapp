"use client";

import { useNews } from "@/hooks/useNews";
import { useNewsStore } from "@/store/newsStore";
import { NewsCard } from "@/components/NewsCard";
import { NewsGridSkeleton } from "@/components/NewsCardSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { TrendingUp, Zap, RefreshCw, Sparkles } from "lucide-react";

export default function Home() {
  const { data, isLoading, isError, error, refetch } = useNews();
  const { filters, resetFilters } = useNewsStore();

  const articles = data?.results || [];
  const [featured, ...rest] = articles;
  const sideArticles = rest.slice(0, 3);
  const gridArticles = rest.slice(3);

  if (isLoading) {
    return (
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-96 bg-grid opacity-50" />
        <div className="absolute inset-x-0 top-0 h-96 bg-hero-gradient" />

        <div className="relative container-main py-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 skeleton rounded-2xl" />
            <div className="space-y-2">
              <div className="h-8 w-48 skeleton rounded-lg" />
              <div className="h-4 w-32 skeleton rounded-lg" />
            </div>
          </div>
          <NewsGridSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-main py-16">
        <EmptyState
          type="error"
          message={error?.message}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="container-main py-16">
        <EmptyState type="no-results" onRetry={resetFilters} />
      </div>
    );
  }

  const title = filters.query
    ? `Results for "${filters.query}"`
    : filters.category
      ? `${filters.category.charAt(0).toUpperCase()}${filters.category.slice(1)} News`
      : "Top Stories";

  return (
    <div className="relative">
      {/* Hero background effect */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[500px] bg-hero-gradient pointer-events-none" />

      <div className="relative container-main py-10">
        {/* Hero Header */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-rose-500 rounded-2xl blur-xl opacity-30" />
                <div className="relative grid place-items-center w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-400 rounded-2xl shadow-xl">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
                <p className="text-[var(--color-ink-muted)] mt-1">
                  {data?.totalResults
                    ? `${data.totalResults.toLocaleString()} articles from trusted sources`
                    : "Latest updates from around the world"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => refetch()}
              className="btn btn-secondary self-start sm:self-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Featured + Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured && (
              <NewsCard article={featured} variant="featured" index={0} />
            )}

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="font-semibold">Latest Updates</span>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {sideArticles.map((article, i) => (
                  <NewsCard
                    key={article.article_id}
                    article={article}
                    variant="compact"
                    index={i + 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Grid Section */}
        {gridArticles.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-xl font-bold">More Stories</h2>
              <span className="badge-subtle">{gridArticles.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map((article, i) => (
                <NewsCard
                  key={article.article_id}
                  article={article}
                  index={i + 4}
                />
              ))}
            </div>
          </section>
        )}

        {data?.nextPage && (
          <div className="mt-16 text-center">
            <p className="text-sm text-[var(--color-ink-muted)]">
              More articles available • Refresh to load new content
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
