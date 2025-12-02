"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchNews } from "@/lib/api";
import { useNewsStore } from "@/store/newsStore";
import type { NewsApiResponse } from "@/types/news";

export function useNews() {
  const filters = useNewsStore((state) => state.filters);

  return useQuery({
    queryKey: ["news", filters],
    queryFn: () =>
      fetchNews({
        category: filters.category,
        query: filters.query,
        country: filters.country,
        language: filters.language,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

export function useInfiniteNews() {
  const filters = useNewsStore((state) => state.filters);

  return useInfiniteQuery<NewsApiResponse>({
    queryKey: ["news-infinite", filters],
    queryFn: ({ pageParam }) =>
      fetchNews({
        category: filters.category,
        query: filters.query,
        country: filters.country,
        language: filters.language,
        page: pageParam as string | null,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
