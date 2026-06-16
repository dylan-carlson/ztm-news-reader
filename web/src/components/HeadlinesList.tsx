import React from 'react';

interface ArticleProps {
  article: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function HeadlinesList({ article, isFavorite, onToggleFavorite }: ArticleProps) {
  const imageUrl = article.image_url || '/placeholder.png';

  return (
    <div className="featured-card">
      <div className="card-image-wrapper">
        <img src={imageUrl} alt={article.title} className="card-image" />
        <div className="card-overlay">
          <h2>{article.title}</h2>
          <p className="card-source">{article.source} • {new Date(article.published_at).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="card-content">
        <p className="card-snippet">{article.snippet}</p>
        <div className="card-actions">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="view-full-btn">
            View Full Article
          </a>
          <button 
            className={`fav-toggle-btn ${isFavorite ? 'is-fav' : ''}`}
            onClick={onToggleFavorite}
          >
            {isFavorite ? '★ Saved to Favorites' : '☆ Save to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}