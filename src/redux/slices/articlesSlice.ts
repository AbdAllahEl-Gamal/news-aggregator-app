import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesFromAPIs } from '../../services/newsService.ts';
import { Article } from '../../types';

interface ArticlesState {
  items: Article[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ArticlesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  return await fetchArticlesFromAPIs();
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch';
      });
  },
});

export default articlesSlice.reducer;