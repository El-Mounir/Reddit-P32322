import React from 'react';
import { Subreddit } from '../Subreddit/Subreddit';
import { useSelector } from 'react-redux';
import { selectSearchResult } from '../SearchResult/searchResultSlice';

export const SearchResult=()=> {
    const subreddits = useSelector(selectSearchResult);

    return (
        <section className='subreddit_results'>
            <ul className='subreddit_container'>
                {subreddits.map((subreddit) => (                 
                    <Subreddit unit={subreddit}/>           
                ))} 
            </ul>
        </section>
   )
}