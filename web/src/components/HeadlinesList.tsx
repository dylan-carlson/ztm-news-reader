

interface ArticleProps {
  article: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function HeadlinesList({ article, isFavorite, onToggleFavorite }: ArticleProps) {
  const imageUrl = article.image_url || '/placeholder.png';

  return (
    <div className="featured-card">
      <img src={imageUrl} alt="" className="card-bg-image" />
      <div className="card-overlay"></div>
      
      <div className="card-content-layer">
        <div className="card-header-info">
          <h2 className="card-title">{article.title}</h2>
          <p className="card-snippet">{article.snippet}</p>
          <div className="card-meta">
            {article.source} • {new Date(article.published_at).toLocaleString()}
          </div>
        </div>
        
        <div className="card-actions">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="view-full-btn">
            View Full Article
          </a>
          <button 
            className={`fav-toggle-btn ${isFavorite ? 'is-fav' : ''}`}
            onClick={onToggleFavorite}
          >
            {isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}