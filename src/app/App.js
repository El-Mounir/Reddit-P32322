import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../app/Routes';
import { Reddit, token } from './RedditAPI'; 
import { ArticlesTypes } from '../components/ArticlesTypes/ArticlesTypes';
import { MySubredditList } from '../components/SubredditList/MySubredditList';
import { ArticlesList } from '../components/ArticlesList/ArticlesList';
import { TopBar } from '../components/TopBar/TopBar';
import { SearchResult } from '../components/SearchResult/SearchResult';


function App() {

   useEffect(()=>{
    if (!token) {
      Reddit.getAccessToken()
   }},[token]) 
  
  return (
    <Router>
      <TopBar/>
      <div className='center'>
        <main className='main-container'>
          <MySubredditList />
          <Routes>
            <Route path="/" element= {<ArticlesList />}/>
            <Route path="/:subreddit" element= {<ArticlesList />}/>
            <Route path ='/search/:searchQuery' element= {<SearchResult/>}/>
            <Route/>
          </Routes>
        </main>
        </div>
    </Router>
  );
}

export default App;
