import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slices/articlesSlice.ts';
import preferencesReducer from './slices/preferencesSlice.ts';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    preferences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;