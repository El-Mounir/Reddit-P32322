import React from 'react';
import { Page } from '../Page/Page';
import { useSelector} from 'react-redux';
import { useParams} from "react-router-dom";
import { toolKeys, ArticleLoader } from '../../app/utilities';
import { ArticlesTypes } from '../../features/ArticlesTypes/ArticlesTypes';
import { MySubredditList } from '../SubredditList/MySubredditList';
import { SubredditBanner } from '../SubredditBanner/SubredditBanner';
import { selectSearchResult } from '../SearchResult/searchResultSlice';
import { selectloadMySubsSlice } from '../SubredditList/mySubredditListSlice';


export const MainPageSubreddit = () => {
    const {subreddit} = useParams();
    const searchResults = useSelector(selectSearchResult);
    const mySubreddits = useSelector(selectloadMySubsSlice);
   
    const onClickHandler = () => {
        window.scroll(0,0);
    };
     
    if (Object.keys(mySubreddits).length === 0) {
        return <div>
            <ArticleLoader/>
        </div>
    }
       
    return (  
        <>
        <div className='main-banner'>
           <SubredditBanner subreddit={toolKeys.getSelectedSubreddit(searchResults,mySubreddits,subreddit)}/> 
        </div>
        <div className='mainpage-wrapper'>
            <Page className='main'>
                <div className='main-container'>
                   <ArticlesTypes subredditName= {toolKeys.getSelectedSubreddit(searchResults,mySubreddits,subreddit).name} defaultType= {"hot"}/>
                </div>  
                <div className='side-container'>
                    <button className='upToTop' onClick={onClickHandler}>Up</button>
                    <MySubredditList/>
                </div>
            </Page>
        </div> 
        </> 
    )
}