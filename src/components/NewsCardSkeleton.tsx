interface Props {
  variant?: "default" | "featured" | "compact";
}

export function NewsCardSkeleton({ variant = "default" }: Props) {
  if (variant === "featured") {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-[var(--color-surface-alt)]">
        <div className="aspect-[4/3] sm:aspect-video skeleton" />
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 lg:p-8 space-y-4">
          <div className="h-4 w-20 bg-white/20 rounded-full" />
          <div className="space-y-2">
            <div className="h-8 w-full bg-white/20 rounded-lg" />
            <div className="h-8 w-3/4 bg-white/20 rounded-lg" />
          </div>
          <div className="flex gap-4 pt-2">
            <div className="h-4 w-24 bg-white/20 rounded-full" />
            <div className="h-4 w-16 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="card flex gap-4 p-4">
        <div className="w-24 h-24 rounded-xl skeleton shrink-0" />
        <div className="flex-1 space-y-3 py-1">
          <div className="h-4 w-full skeleton" />
          <div className="h-4 w-4/5 skeleton" />
          <div className="h-3 w-1/2 skeleton mt-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="aspect-[16/10] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-full skeleton" />
        <div className="h-5 w-4/5 skeleton" />
        <div className="h-4 w-full skeleton" />
        <div className="h-4 w-2/3 skeleton" />
        <div className="flex items-center gap-2 pt-3">
          <div className="w-4 h-4 skeleton rounded-full" />
          <div className="h-3 w-20 skeleton" />
          <div className="h-3 w-16 skeleton" />
        </div>
      </div>
      <div className="px-5 pb-5">
        <div className="h-11 w-full skeleton rounded-xl" />
      </div>
    </div>
  );
}

export function NewsGridSkeleton() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NewsCardSkeleton variant="featured" />
        <div className="space-y-4">
          <NewsCardSkeleton variant="compact" />
          <NewsCardSkeleton variant="compact" />
          <NewsCardSkeleton variant="compact" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
