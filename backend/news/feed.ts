import { api, Query } from "encore.dev/api";

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

// Get cybersecurity news feed with fallback mock data
export const getNewsFeed = api<NewsFeedRequest, NewsFeedResponse>(
  { expose: true, method: "GET", path: "/news/feed" },
  async (req) => {
    const query = req.q || "cybersecurity";
    const page = req.page || 1;

    // Return mock data for demo - no external API dependency
    const mockArticles: NewsArticle[] = [
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
      {
        title: "Zero-Day Vulnerabilities in Popular Router Firmware",
        source: "Cyber Defense Magazine",
        url: "https://example.com/article3",
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        description: "Security researchers discover critical flaws in widely-used router firmware.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop&crop=center",
      },
      {
        title: "Enterprise Network Security: 2024 Trends",
        source: "InfoSec Today",
        url: "https://example.com/article4",
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        description: "How enterprises are adapting their security strategies for modern threats.",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&crop=center",
      },
      {
        title: "Password Manager Security: What You Need to Know",
        source: "Security Focus",
        url: "https://example.com/article5",
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        description: "Best practices for selecting and using password managers securely.",
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop&crop=center",
      },
      {
        title: "IoT Device Security: Growing Concerns",
        source: "Network World",
        url: "https://example.com/article6",
        publishedAt: new Date(Date.now() - 18000000).toISOString(),
        description: "The expanding attack surface of Internet of Things devices.",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop&crop=center",
      },
    ];

    // Filter articles based on query if not default
    let filteredArticles = mockArticles;
    if (query !== "cybersecurity") {
      filteredArticles = mockArticles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Simulate pagination
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    return {
      articles: paginatedArticles,
      totalResults: filteredArticles.length,
    };
  }
);
