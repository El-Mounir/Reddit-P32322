export const ROUTES = {
    MainPage: (postType) => `/${postType}`,
    MainPageSubreddit: (subreddit) => `/r/${subreddit}`,
    searchResult: (searchQuery) => `/search/${searchQuery}`,
    ArticleComments: (subreddit,commentID) => `/r/${subreddit}/comments/${commentID}`
  };
  

  