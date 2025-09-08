import { Request, Response, NextFunction } from 'express';
import { NewsFeedRequest, NewsFeedResponse } from '../types';

export const getNewsFeed = async (
  req: Request<{}, NewsFeedResponse, {}, NewsFeedRequest>,
  res: Response<NewsFeedResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const query = req.query.q || 'cybersecurity';
    const page = parseInt(req.query.page as string) || 1;
    const newsApiKey = process.env.NEWS_API_KEY;

    if (!newsApiKey) {
      console.warn('NEWS_API_KEY not configured, returning mock data');
      // Return mock data if API key is not configured
      const mockArticles = [
        {
          title: "New Cybersecurity Threats Emerge in 2024",
          source: "Security Weekly",
          url: "https://example.com/article1",
          publishedAt: new Date().toISOString(),
          description: "Latest trends in cybersecurity threats and how to protect against them.",
        },
        {
          title: "Wi-Fi Security Best Practices Updated",
          source: "Tech News",
          url: "https://example.com/article2",
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          description: "New guidelines for securing wireless networks against modern attacks.",
        },
      ];

      res.json({
        articles: mockArticles,
        totalResults: 2,
      });
      return;
    }

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20&page=${page}&apiKey=${newsApiKey}`
      );

      if (!response.ok) {
        throw new Error(`News API error: ${response.status}`);
      }

      const data = await response.json();

      const articles = data.articles?.map((article: any) => ({
        title: article.title || "No title",
        source: article.source?.name || "Unknown source",
        url: article.url || "",
        publishedAt: article.publishedAt || new Date().toISOString(),
        description: article.description || "",
      })) || [];

      res.json({
        articles,
        totalResults: data.totalResults || 0,
      });
    } catch (apiError) {
      console.error("News API error:", apiError);
      
      // Return mock data if API fails
      const mockArticles = [
        {
          title: "New Cybersecurity Threats Emerge in 2024",
          source: "Security Weekly",
          url: "https://example.com/article1",
          publishedAt: new Date().toISOString(),
          description: "Latest trends in cybersecurity threats and how to protect against them.",
        },
        {
          title: "Wi-Fi Security Best Practices Updated",
          source: "Tech News",
          url: "https://example.com/article2",
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          description: "New guidelines for securing wireless networks against modern attacks.",
        },
      ];

      res.json({
        articles: mockArticles,
        totalResults: 2,
      });
    }
  } catch (error) {
    next(error);
  }
};
