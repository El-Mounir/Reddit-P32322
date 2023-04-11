import React  from 'react';
import { Page } from '../Page/Page';
import { ArticlesTypes } from '../../features/ArticlesTypes/ArticlesTypes';
import { MySubredditList } from '../SubredditList/MySubredditList';



export const MainPage = () => {
    // let location = useLocation();
    // let subreddit = location.state;
    
    const handleOnClick = () => {
        window.scroll(0,0);
    }

    return (  
        <div className='mainpage-wrapper'>
            <Page className='main'>
                <div className='main-container'>
                    <ArticlesTypes subredditName="" defaultType="best"/>
                </div>  
                <div className='side-container'>
                    <button className='upToTop' onClick={handleOnClick}>Up</button>
                    <MySubredditList/>
                </div>
            </Page>
        </div>

    )
}