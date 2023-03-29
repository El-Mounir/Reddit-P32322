import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArticlesTypes } from '../components/ArticlesTypes/ArticlesTypes';
import { ArticlesList } from '../components/ArticlesList/ArticlesList';
import { TopBar} from '../components/TopBar/TopBar';

function App() {
  return (
    <Router>
      <TopBar/>
      <ArticlesTypes/>
      <Routes>
        <Route path="/*" element={<ArticlesList />}/>
        <Route/>
        <Route/>
      </Routes>
      <div className='button-container'>
        <button className="back">
           Back to Top
        </button>
      </div>
    </Router>
  );
}

export default App;
