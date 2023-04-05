import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Reddit, token } from './RedditAPI';
import { HeadBar } from '../components/HeadBar/HeadBar';
import { MainPage } from '../components/MainPage/MainPage';
import { SearchResult } from '../components/SearchResult/SearchResult';
import './App.css';

function App() {
  const dispatch = useDispatch(); 

  useEffect(()=>{
      if (!token) {
        Reddit.getAccessToken();
      }
  },[dispatch,token]) 
       
  
  return (
    <Router>
      <HeadBar/>
      <Routes>
          <Route path="/*" element= {<MainPage />}/>
          <Route path="/:postType" element= {<MainPage />}/>
          <Route path ='/search/:searchQuery' element= {<SearchResult/>}/>
      </Routes>
    </Router>
  );
}

export default App;
