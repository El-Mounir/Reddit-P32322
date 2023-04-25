import React from 'react';
import { Subreddit } from '../../features/Subreddit/Subreddit';
import { useSelector } from 'react-redux';
import { toolKeys,ResultLoader } from '../../app/utilities';
import { selectSearchResult,isLoadingResult } from '../SearchResult/searchResultSlice';
import { Page } from '../Page/Page';
import './SearchResult.css';
import { UpButton } from '../UpButton/UpButton';
import { MySubredditList } from '../SubredditList/MySubredditList';
import { ShowMore } from '../ShowMore/ShowMore';

export const SearchResult=()=> {
    const subreddits = useSelector(selectSearchResult);
    const loadingSearch= useSelector(isLoadingResult);

    return (
        <div className='mainpage-wrapper'>     
           <Page className="Search">
                <div className='main-container'>
                    <section className='subreddit_results'>
                        <ul className='subreddit_container'>
                        <h4 className="subreddits_results">Subreddits</h4>
                        {loadingSearch ? toolKeys.countArray(15).map((count) => <ResultLoader className={`Searchloader ${count}`}/>) :
                        <>
                            {subreddits.map((subreddit) => (                 
                                <Subreddit unit={subreddit} key={subreddit.redditID}/>           
                            ))}
                        </> 
                        }
                        <div className='show_moreSearch'>
                            <ShowMore segment={subreddits} whatToGet={"search"}/>
                        </div>
                        </ul>
                    </section>             
                </div>
                <div className='side-container'>
                    <UpButton />
                    <MySubredditList/>
                </div>
            </Page>  
        </div>
    )
}