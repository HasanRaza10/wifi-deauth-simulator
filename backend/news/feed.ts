import { api, Query } from "encore.dev/api";
import { secret } from "encore.dev/config";

const newsApiKey = secret("NewsApiKey");

export interface NewsArticle {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  description?: string;
  imageUrl?: string;
}

export interface NewsFeedRequest {
  q?: Query<string>;
  page?: Query<number>;
}

export interface NewsFeedResponse {
  articles: NewsArticle[];
  totalResults: number;
}

// Get cybersecurity news feed
export const getNewsFeed = api<NewsFeedRequest, NewsFeedResponse>(
  { expose: true, method: "GET", path: "/news/feed" },
  async (req) => {
    const query = req.q || "cybersecurity";
    const page = req.page || 1;

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20&page=${page}&apiKey=${newsApiKey()}`
      );

      if (!response.ok) {
        throw new Error(`News API error: ${response.status}`);
      }

      const data = await response.json();

      const articles: NewsArticle[] = data.articles?.map((article: any) => ({
        title: article.title || "No title",
        source: article.source?.name || "Unknown source",
        url: article.url || "",
        publishedAt: article.publishedAt || new Date().toISOString(),
        description: article.description || "",
        imageUrl: article.urlToImage || null,
      })) || [];

      return {
        articles,
        totalResults: data.totalResults || 0,
      };
    } catch (error) {
      console.error("News API error:", error);
      
      // Return mock data if API fails
      return {
        articles: [
          {
            title: "New Cybersecurity Threats Emerge in 2024",
            source: "Security Weekly",
            url: "https://example.com/article1",
            publishedAt: new Date().toISOString(),
            description: "Latest trends in cybersecurity threats and how to protect against them.",
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop&crop=center",
          },
          {
            title: "Wi-Fi Security Best Practices Updated",
            source: "Tech News",
            url: "https://example.com/article2",
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            description: "New guidelines for securing wireless networks against modern attacks.",
            imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=200&fit=crop&crop=center",
          },
        ],
        totalResults: 2,
      };
    }
  }
);
