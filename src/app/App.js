import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../app/Routes';
import { Reddit } from './RedditAPI'; 
import { ArticlesTypes } from '../components/ArticlesTypes/ArticlesTypes';
import { ArticlesList } from '../components/ArticlesList/ArticlesList';
import { TopBar} from '../components/TopBar/TopBar';
import { SearchResult } from '../components/SearchResult/SearchResult';


function App() {
  const token = sessionStorage.getItem("tokenId");
   useEffect(()=>{
    if (!token) {
      Reddit.getAccessToken()
   }},[token]) 
  
  return (
    <Router>
      <TopBar/>
      <Routes>
        <Route path="/" element= {<ArticlesList />}/>
        <Route path ='/search/:searchQuery' element= {<SearchResult/>}/>
        <Route/>
      </Routes>
    </Router>
  );
}

export default App;
