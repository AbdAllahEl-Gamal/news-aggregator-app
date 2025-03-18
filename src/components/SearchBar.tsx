import React from 'react';
import { useAppDispatch } from '../redux/hooks.ts';
import { setSearchQuery } from '../redux/slices/preferencesSlice.ts';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="flex mb-4 search-bar">
      <input
        type="text"
        onChange={handleSearchChange}
        placeholder="Search articles..."
      />
    </div>
  );
};

export default SearchBar;