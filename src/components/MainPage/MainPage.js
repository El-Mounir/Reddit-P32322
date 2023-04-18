import React  from 'react';
import { Page } from '../Page/Page';
import { ArticlesTypes } from '../../features/ArticlesTypes/ArticlesTypes';
import { MySubredditList } from '../SubredditList/MySubredditList';
import { useParams } from 'react-router-dom';

export const MainPage = () => {
    const {postType} = useParams();
    
    const handleOnClick = () => {
        window.scroll(0,0);
    }

    return (  
        <div className='mainpage-wrapper'>
            <Page className='main'>
                <div className='main-container'>
                    <ArticlesTypes subredditName="" defaultType={ postType ? postType : "best"}/>
                </div>  
                <div className='side-container'>
                    <button className='upToTop' onClick={handleOnClick}>Up</button>
                    <MySubredditList/>
                </div>
            </Page>
        </div>

    )
}