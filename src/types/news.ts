// newsdata.io API Types

export interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  keywords: string[] | null;
  creator: string[] | null;
  video_url: string | null;
  description: string | null;
  content: string | null;
  pubDate: string;
  pubDateTZ: string;
  image_url: string | null;
  source_id: string;
  source_name: string;
  source_url: string;
  source_icon: string | null;
  source_priority: number;
  country: string[];
  category: NewsCategory[];
  language: string;
  ai_tag?: string[];
  sentiment?: "positive" | "negative" | "neutral";
  sentiment_stats?: {
    positive: number;
    negative: number;
    neutral: number;
  };
  ai_region?: string;
  ai_org?: string[];
  duplicate: boolean;
}

export interface NewsApiResponse {
  status: "success" | "error";
  totalResults: number;
  results: NewsArticle[];
  nextPage: string | null;
}

export interface NewsApiError {
  status: "error";
  results: {
    message: string;
    code: string;
  };
}

export type NewsCategory =
  | "business"
  | "crime"
  | "domestic"
  | "education"
  | "entertainment"
  | "environment"
  | "food"
  | "health"
  | "lifestyle"
  | "other"
  | "politics"
  | "science"
  | "sports"
  | "technology"
  | "top"
  | "tourism"
  | "world";

// Icon keys that map to Lucide icons
export type CategoryIconKey =
  | "flame"
  | "briefcase"
  | "cpu"
  | "clapperboard"
  | "trophy"
  | "flask"
  | "heart-pulse"
  | "landmark"
  | "globe"
  | "leaf"
  | "utensils"
  | "sparkles";

export interface CategoryInfo {
  value: NewsCategory;
  label: string;
  iconKey: CategoryIconKey;
}

export const NEWS_CATEGORIES: CategoryInfo[] = [
  { value: "top", label: "Top Stories", iconKey: "flame" },
  { value: "business", label: "Business", iconKey: "briefcase" },
  { value: "technology", label: "Technology", iconKey: "cpu" },
  { value: "entertainment", label: "Entertainment", iconKey: "clapperboard" },
  { value: "sports", label: "Sports", iconKey: "trophy" },
  { value: "science", label: "Science", iconKey: "flask" },
  { value: "health", label: "Health", iconKey: "heart-pulse" },
  { value: "politics", label: "Politics", iconKey: "landmark" },
  { value: "world", label: "World", iconKey: "globe" },
  { value: "environment", label: "Environment", iconKey: "leaf" },
  { value: "food", label: "Food", iconKey: "utensils" },
  { value: "lifestyle", label: "Lifestyle", iconKey: "sparkles" },
];

export interface NewsFilters {
  category: NewsCategory | null;
  query: string;
  country: string;
  language: string;
}

export const DEFAULT_FILTERS: NewsFilters = {
  category: "top",
  query: "",
  country: "us",
  language: "en",
};
