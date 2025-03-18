import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts';
import { setCategory, setDate } from '../redux/slices/preferencesSlice.ts';

const categories = [
  'Business',
  'Entertainment',
  'General',
  'Health',
  'Science',
  'Sports',
  'Technology',
  'Politics',
  'Environment',
  'Education',
  'Lifestyle',
  'World',
];

const FilterPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.preferences.categories[0] || '');
  const selectedDate = useAppSelector(state => state.preferences.selectedDate);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDate(e.target.value));
  };

  return (
    <div className="filter-panel-container">
      <div className="all-categories-select-menu">
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="date-input">
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default FilterPanel;