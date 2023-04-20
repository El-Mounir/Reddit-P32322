import React from 'react';
import { Page } from '../Page/Page';
import {  useSelector} from 'react-redux';
import { useParams} from "react-router-dom";
import { toolKeys} from '../../app/utilities';
import { ArticlesTypes } from '../../features/ArticlesTypes/ArticlesTypes';
import { MySubredditList } from '../SubredditList/MySubredditList';
import { SubredditBanner } from '../SubredditBanner/SubredditBanner';
import { selectSearchResult } from '../SearchResult/searchResultSlice';
import { selectloadMySubsSlice } from '../SubredditList/mySubredditListSlice';
import { UpButton } from '../UpButton/UpButton';

export const MainPageSubreddit = () => {
    window.scroll(0,0);
    const {subreddit,postType} = useParams();
    const searchResults = useSelector(selectSearchResult);
    const mySubreddits = useSelector(selectloadMySubsSlice);
    
    return (  
        <>
        <div className='main-banner'>
           <SubredditBanner subreddit={Object.keys(mySubreddits).length && (toolKeys.getSelectedSubreddit(searchResults,mySubreddits,subreddit)) ? 
            toolKeys.getSelectedSubreddit(searchResults,mySubreddits,subreddit) : JSON.parse(sessionStorage.subreddit)}/> 
        </div>
        <div className='mainpage-wrapper'>
            <Page className='main'>
                <div className='main-container'>
                   <ArticlesTypes subredditName= {Object.keys(mySubreddits).length && (toolKeys.getSelectedSubreddit(searchResults,mySubreddits,subreddit)) ? 
                    toolKeys.getSelectedSubreddit(searchResults,mySubreddits,subreddit).name : JSON.parse(sessionStorage.subreddit).name} defaultType= {postType ? postType : "hot"}/>
                </div>  
                <div className='side-container'>
                    <UpButton/>
                    <MySubredditList/>
                </div>
            </Page>
        </div> 
        </> 
    )
}