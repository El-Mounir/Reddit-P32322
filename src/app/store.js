import { configureStore } from '@reduxjs/toolkit';
import searchResultReducer from '../components/SearchResult/searchResultSlice';
import loadMySubsSliceReducer from '../components/SubredditList/mySubredditListSlice';
import loadPostSliceReducer  from '../components/ArticlesList/articlesListSlice';
import headBarSliceReducer from '../components/HeadBar/headBarSlice';
import mainPageReducer from '../components/MainPage/mainPageSlice';


export const store = configureStore({
  reducer: {
    main: mainPageReducer,
    search: searchResultReducer,
    subreddit: loadMySubsSliceReducer,
    post: loadPostSliceReducer,
    user: headBarSliceReducer,
  },
});
