import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Reddit, token } from './RedditAPI';
import { HeadBar } from '../components/HeadBar/HeadBar';
import { MainPageSubreddit } from '../components/MainPageSubreddit/MainPageSubreddit';
import { MainPage } from '../components/MainPage/MainPage';
import { SearchResult } from '../components/SearchResult/SearchResult';
import { ArticleComments } from '../components/ArticleComments/ArticleComments';
import './App.css';

function App() {

  useEffect(()=>{
      if (!token) {
        Reddit.getAccessToken();
      }
  },[]) 
       
  
  return (
    <Router>
      <HeadBar/>
      <Routes>
          <Route path="/*" element= {<MainPage />}>
            <Route path=":postType" element={<MainPage />}/>
          </Route>
          <Route path="r/:subreddit/*" element= {<MainPageSubreddit />}>
            <Route path=":postType"/>
          </Route>
          <Route path="/r/:subreddit/comments/:commentID" element={<ArticleComments />}/>
          <Route path ='/search/:searchQuery' element= {<SearchResult/>}/>
      </Routes>
    </Router>
  );
}

export default App;
