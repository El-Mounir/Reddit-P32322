import { configureStore } from '@reduxjs/toolkit';
import searchResultReducer from '../components/SearchResult/searchResultSlice';
import subredditsReducer from '../components/SubredditList/subredditListSlice';

export const store = configureStore({
  reducer: {
    subreddits: subredditsReducer,
    search: searchResultReducer,
  },
});
