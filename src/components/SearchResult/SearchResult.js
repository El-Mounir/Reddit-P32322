import React from 'react';
import { Subreddit } from '../../features/Subreddit/Subreddit';
import { useSelector } from 'react-redux';
import { selectSearchResult,isLoadingResult } from '../SearchResult/searchResultSlice';
import { Page } from '../Page/Page';
import './SearchResult.css';
import { MySubredditList } from '../SubredditList/MySubredditList';

export const SearchResult=()=> {
    const subreddits = useSelector(selectSearchResult);

    return (
        <div className='mainpage-wrapper'>     
           <Page className="Search">
                <div className='main-container'>
                    <section className='subreddit_results'>
                    <ul className='subreddit_container'>
                        {subreddits.map((subreddit) => (                 
                            <Subreddit unit={subreddit}/>           
                        ))} 
                    </ul>
                    </section>             
                </div>
                <div className='side-container'>
                    <MySubredditList/>
                </div>
            </Page>  
        </div>
    )
}