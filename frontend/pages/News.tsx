import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Search, Calendar, Globe } from 'lucide-react';
import backend from '~backend/client';

export default function News() {
  const [searchQuery, setSearchQuery] = useState('cybersecurity');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: newsData, isLoading, error } = useQuery({
    queryKey: ['news-feed', searchQuery, currentPage],
    queryFn: () => backend.news.getNewsFeed({ q: searchQuery, page: currentPage }),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const suggestedTopics = [
    'cybersecurity',
    'data breach',
    'ransomware',
    'network security',
    'wifi security',
    'vulnerability',
    'malware',
    'phishing',
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Cybersecurity News</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest cybersecurity news and trends
        </p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search News</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for cybersecurity topics..."
              className="flex-1"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Suggested topics:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => {
                    setSearchQuery(topic);
                    setCurrentPage(1);
                  }}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Articles */}
      <div className="space-y-4">
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading news articles...</p>
          </div>
        )}

        {error && (
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <CardContent className="pt-6">
              <p className="text-red-800 dark:text-red-200">
                Failed to load news articles. Please try again later.
              </p>
            </CardContent>
          </Card>
        )}

        {newsData?.articles && newsData.articles.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Found {newsData.totalResults} articles for "{searchQuery}"
              </p>
              <Badge variant="outline">Page {currentPage}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsData.articles.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg leading-tight">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Globe className="h-3 w-3" />
                        <span>{article.source}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {article.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {article.description}
                      </p>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Read Full Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={newsData.articles.length < 20}
              >
                Next
              </Button>
            </div>
          </>
        )}

        {newsData?.articles && newsData.articles.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                No articles found for "{searchQuery}". Try a different search term.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
