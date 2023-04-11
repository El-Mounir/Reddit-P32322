import React from 'react';
import { Subreddit } from '../../features/Subreddit/Subreddit';
import { useSelector } from 'react-redux';
import { selectSearchResult } from '../SearchResult/searchResultSlice';
import { Page } from '../Page/Page';
import './SearchResult.css';
import { MySubredditList } from '../SubredditList/MySubredditList';

export const SearchResult=()=> {
    const subreddits = useSelector(selectSearchResult);

    const handleOnClick = () => {
        window.scroll(0,0);
    }

    return (
        <div className='mainpage-wrapper'>     
           <Page className="Search">
                <div className='main-container'>
                    <section className='subreddit_results'>
                    <ul className='subreddit_container'>
                        {subreddits.map((subreddit) => (                 
                            <Subreddit unit={subreddit} key={subreddit.redditID}/>           
                        ))} 
                    </ul>
                    </section>             
                </div>
                <div className='side-container'>
                    <button className='upToTop' onClick={handleOnClick}>Up</button>
                    <MySubredditList/>
                </div>
            </Page>  
        </div>
    )
}