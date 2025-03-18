import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import { fetchArticles } from './redux/slices/articlesSlice.ts';
import ArticleCard from './components/ArticleCard.tsx';
import FilterPanel from './components/FilterPanel.tsx';
import SearchBar from './components/SearchBar.tsx';
import PreferencesPanel from './components/PreferencesPanel.tsx';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(state => state.articles);
  const preferences = useAppSelector(state => state.preferences);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const filteredArticles = items.filter(article => {
    const matchesSource = preferences.sources.length === 0 || 
      preferences.sources.includes(article.source ?? '');
    const matchesCategory = preferences.categories.length === 0 || 
      preferences.categories.includes(article.category ?? '');
    const matchesAuthor = preferences.authors.length === 0 ||
      preferences.authors.some(author => (article.author ?? '').toLowerCase().includes(author.toLowerCase()));
    const matchesSearch = preferences.searchQuery === '' ||
      article.title.toLowerCase().includes(preferences.searchQuery.toLowerCase());
    const matchesDate = preferences.selectedDate === '' ||
      (article.date ?? '').startsWith(preferences.selectedDate);
    return matchesSource && matchesCategory && matchesAuthor && matchesSearch && matchesDate;
  });    

  return (
    <div className="container">
      <h1>News Aggregator</h1>
      <PreferencesPanel />
      <SearchBar />
      <FilterPanel />

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <div className="articles-grid">
        {filteredArticles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default App;