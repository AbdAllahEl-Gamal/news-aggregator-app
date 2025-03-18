import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts';
import { toggleSource, toggleAuthor } from '../redux/slices/preferencesSlice.ts';

const PreferencesPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const sources = useAppSelector(state => state.preferences.sources);
  const authors = useAppSelector(state => state.preferences.authors);

  const articles = useAppSelector(state => state.articles.items);

  const uniqueAuthors = useMemo(() => {
    const authorsSet = new Set<string>();

    articles.forEach(article => {
      const cleanedAuthor = article.author?.trim();
      if (cleanedAuthor && cleanedAuthor !== '') {
        authorsSet.add(cleanedAuthor);
      }
    });

    return Array.from(authorsSet).sort((a, b) => a.localeCompare(b));
  }, [articles]);

  const handleToggleSource = (source: string) => {
    dispatch(toggleSource(source));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);

    if (selectedOptions.includes('reset')) {
      // Clear all authors if reset is selected
      authors.forEach(author => {
        dispatch(toggleAuthor(author)); // Deselect all authors
      });
      return;
    }

    // Add newly selected authors
    selectedOptions.forEach(author => {
      if (!authors.includes(author)) {
        dispatch(toggleAuthor(author));
      }
    });

    // Remove unselected authors
    authors.forEach(author => {
      if (!selectedOptions.includes(author)) {
        dispatch(toggleAuthor(author));
      }
    });
  };

  return (
    <div className="preferences-panel">
      <h3>Preferences</h3>
      <div>
        <h4>Sources:</h4>
        {['The Guardian', 'New York Times', 'BBC News'].map(source => (
          <label key={source}>
            <input
              type="checkbox"
              checked={sources.includes(source)}
              onChange={() => handleToggleSource(source)}
            />{' '}
            {source}
          </label>
        ))}
      </div>
      <div>
        <h4>Authors:</h4>

        {uniqueAuthors.length === 0 ? (
          <p>No authors found</p>
        ) : (
          <select
            multiple
            value={authors}
            onChange={handleAuthorChange}
          >
            <option value="reset">
              No Author Selected (Reset)
            </option>

            {uniqueAuthors.map(author => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default PreferencesPanel;