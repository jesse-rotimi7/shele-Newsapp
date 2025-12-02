import type { NewsApiResponse, NewsCategory } from "@/types/news";

const API_KEY = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
const BASE_URL = "https://newsdata.io/api/1";

interface FetchNewsParams {
  category?: NewsCategory | null;
  query?: string;
  country?: string;
  language?: string;
  page?: string | null;
}

export async function fetchNews({
  category = "top",
  query = "",
  country = "us",
  language = "en",
  page = null,
}: FetchNewsParams = {}): Promise<NewsApiResponse> {
  const params = new URLSearchParams({
    apikey: API_KEY || "",
    country,
    language,
  });

  if (category) {
    params.append("category", category);
  }

  if (query.trim()) {
    params.append("q", query.trim());
  }

  if (page) {
    params.append("page", page);
  }

  const response = await fetch(`${BASE_URL}/latest?${params.toString()}`, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.status === "error") {
    throw new Error(data.results?.message || "Unknown API error");
  }

  return data as NewsApiResponse;
}

// Format relative time
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

