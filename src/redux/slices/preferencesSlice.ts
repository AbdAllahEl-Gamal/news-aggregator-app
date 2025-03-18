import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
    sources: string[];
    categories: string[];
    authors: string[];
    searchQuery: string;
    selectedDate: string;
}
  
const initialState: PreferencesState = {
    sources: [],
    categories: [],
    authors: [],
    searchQuery: '',
    selectedDate: '',
};
  
const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
      toggleSource(state, action: PayloadAction<string>) {
        const source = action.payload;
        state.sources.includes(source)
          ? state.sources = state.sources.filter(s => s !== source)
          : state.sources.push(source);
      },
      setSearchQuery(state, action: PayloadAction<string>) {
        state.searchQuery = action.payload;
      },
      setCategory(state, action: PayloadAction<string>) {
        state.categories = [action.payload];
      },
      setDate(state, action: PayloadAction<string>) {
        state.selectedDate = action.payload;
      },
      toggleAuthor(state, action: PayloadAction<string>) {
        const author = action.payload;
        state.authors.includes(author)
          ? state.authors = state.authors.filter(a => a !== author)
          : state.authors.push(author);
      },
    },
});
  
export const { toggleSource, setSearchQuery, setCategory, setDate, toggleAuthor } = preferencesSlice.actions;
export default preferencesSlice.reducer;