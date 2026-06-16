import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchNews } from './lib/newsapi';
import { HeadlinesList } from './components/HeadlinesList';

const CATEGORIES = ['tech', 'general', 'science', 'sports', 'business', 'health', 'entertainment', 'politics', 'food', 'travel'];

export default function App() {
  const [category, setCategory] = useState('tech');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const cacheRef = useRef<Record<string, any>>({});
  const prefetchCacheRef = useRef<Record<string, any>>({});
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCacheKey = (c: string, s: string, p: number) => `${c}-${s}-${p}`;

  const loadData = useCallback(async (c: string, s: string, p: number, isPrefetch = false) => {
    const key = getCacheKey(c, s, p);
    
    if (cacheRef.current[key]) {
      if (!isPrefetch) {
        setArticles(cacheRef.current[key]);
        setLoading(false);
        setError(null);
      }
      return cacheRef.current[key];
    }
    
    if (prefetchCacheRef.current[key]) {
      const data = prefetchCacheRef.current[key];
      if (!isPrefetch) {
        setArticles(data);
        cacheRef.current[key] = data;
        setLoading(false);
        setError(null);
      }
      return data;
    }

    if (!isPrefetch) {
      setLoading(true);
      setError(null);
    }

    try {
      const data = await fetchNews({ category: c, search: s, page: p });
      if (data.error) {
        throw new Error(data.error);
      }
      if (!isPrefetch) {
        setArticles(data.data || []);
        cacheRef.current[key] = data.data || [];
      } else {
        prefetchCacheRef.current[key] = data.data || [];
      }
      return data.data || [];
    } catch (err: any) {
      if (!isPrefetch) {
        setError(err.message || 'Failed to fetch news');
      }
    } finally {
      if (!isPrefetch) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (showFavorites) return;
    setPage(1);
    setCurrentIndex(0);
    cacheRef.current = {}; 
    prefetchCacheRef.current = {};
    loadData(category, search, 1);
  }, [category, search, showFavorites, loadData]);

  useEffect(() => {
    if (showFavorites) return;
    if (currentIndex === 1) {
      loadData(category, search, page + 1, true);
    }
    if (currentIndex === 0 && page > 1) {
      loadData(category, search, page - 1, true);
    }
  }, [currentIndex, page, category, search, showFavorites, loadData]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handleCategoryClick = (cat: string) => {
    setSearchInput('');
    setSearch('');
    setCategory(cat);
    setShowFilters(false);
  };

  const toggleFavorite = (article: any) => {
    let newFavs;
    if (favorites.some((f) => f.uuid === article.uuid)) {
      newFavs = favorites.filter((f) => f.uuid !== article.uuid);
    } else {
      newFavs = [...favorites, article];
    }
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  const handleNext = () => {
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const nextP = page + 1;
      setPage(nextP);
      setCurrentIndex(0);
      loadData(category, search, nextP);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (page > 1) {
      const prevP = page - 1;
      setPage(prevP);
      setCurrentIndex(2);
      loadData(category, search, prevP);
    }
  };

  const handleFirstPage = () => {
    setPage(1);
    setCurrentIndex(0);
    loadData(category, search, 1);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const displayArticles = showFavorites ? favorites : articles;
  const currentArticle = displayArticles[currentIndex];

  return (
    <div className="app-container">
      <div className={`sidebar ${showFilters ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>NewsReader</h2>
          <button className="mobile-close" onClick={() => setShowFilters(false)}>✕</button>
        </div>
        
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search news..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="categories">
          <h3>Categories</h3>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${category === cat && !search ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <button 
          className={`favorites-btn ${showFavorites ? 'active' : ''}`}
          onClick={() => {
            setShowFavorites(!showFavorites);
            setCurrentIndex(0);
            setShowFilters(false);
          }}
        >
          {showFavorites ? 'Back to News' : '⭐ Favorites'}
        </button>
      </div>

      <div className="main-content">
        <button className="mobile-toggle" onClick={() => setShowFilters(true)}>
          Show Filters
        </button>
        
        {loading && !showFavorites ? (
          <div className="loading-skeleton">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : !currentArticle ? (
          <div className="no-results">
            <p>No articles found.</p>
          </div>
        ) : (
          <div className="article-view">
            <HeadlinesList
              article={currentArticle}
              isFavorite={favorites.some(f => f.uuid === currentArticle.uuid)}
              onToggleFavorite={() => toggleFavorite(currentArticle)}
            />
            
            <div className="pager">
              <button onClick={handleFirstPage} disabled={(page === 1 && currentIndex === 0) || showFavorites}>«</button>
              <button onClick={handlePrev} disabled={(page === 1 && currentIndex === 0) || showFavorites && currentIndex === 0}>‹</button>
              
              {displayArticles.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(idx)}
                >
                  {showFavorites ? idx + 1 : (page - 1) * 3 + idx + 1}
                </button>
              ))}
              
              <button onClick={handleNext} disabled={showFavorites && currentIndex === favorites.length - 1}>›</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}