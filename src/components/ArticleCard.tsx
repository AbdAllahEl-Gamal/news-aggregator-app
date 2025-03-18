import React from 'react';
import { Article } from '../types';

const sourceLogos: Record<string, string> = {
  'The Guardian': 'https://tse2.mm.bing.net/th?id=OIP.2tBnpNfLLHu2hvGmncfxKwHaBT&pid=Api',
  'New York Times': 'https://www.pngmart.com/files/23/New-York-Times-Logo-PNG-File.png',
  'BBC News': 'https://iconape.com/wp-content/png_logo_vector/bbc-world-news.png',
};

type Props = {
  article: Article;
};

const ArticleCard: React.FC<Props> = ({ article }) => {
  const logoUrl = sourceLogos[article.source ?? ''] ?? 'https://via.placeholder.com/40x40?text=News';

  return (
    <div className="article-card">
      <img
        src={logoUrl}
        alt={article.source}
      />
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
    </div>
  );
};

export default ArticleCard;