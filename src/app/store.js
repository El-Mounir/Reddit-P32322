import { configureStore } from '@reduxjs/toolkit';
import searchResultReducer from '../components/SearchResult/searchResultSlice';
import loadMySubsSliceReducer from '../components/SubredditList/mySubredditListSlice';
import loadHotPostSliceReducer  from '../components/ArticlesList/articlesListSlice';
import loadBestPostSliceReducer  from '../components/ArticlesList/bestPostSlice';


export const store = configureStore({
  reducer: {
    search: searchResultReducer,
    subreddit: loadMySubsSliceReducer,
    hot: loadHotPostSliceReducer,
    best: loadBestPostSliceReducer,
  },
});
