import React from 'react';
import { Subreddit } from '../../features/Subreddit/Subreddit';
import { useSelector } from 'react-redux';
import { toolKeys,ResultLoader } from '../../app/utilities';
import { selectSearchResult,isLoadingResult } from '../SearchResult/searchResultSlice';
import { Page } from '../Page/Page';
import './SearchResult.css';
import { MySubredditList } from '../SubredditList/MySubredditList';

export const SearchResult=()=> {
    const subreddits = useSelector(selectSearchResult);
    const loadingSearch= useSelector(isLoadingResult);

    const handleOnClick = () => {
        window.scroll(0,0);
    }

    return (
        <div className='mainpage-wrapper'>     
           <Page className="Search">
                <div className='main-container'>
                    <section className='subreddit_results'>
                    <ul className='subreddit_container'>
                    {loadingSearch ? toolKeys.countArray(15).map((count) => <ResultLoader className={`Searchloader ${count}`}/>) :
                    <>
                        {subreddits.map((subreddit) => (                 
                            <Subreddit unit={subreddit} key={subreddit.redditID}/>           
                        ))}
                    </> 
                    }
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