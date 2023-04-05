import React  from 'react';
import { Page } from '../Page/Page';
import { ArticlesTypes } from '../../features/ArticlesTypes/ArticlesTypes';
import { MySubredditList } from '../SubredditList/MySubredditList';
import { SubredditBanner } from '../../features/SubredditBanner/SubredditBanner';



export const MainPage = () => {

    return (  
        <div className='mainpage-wrapper'>
            <SubredditBanner/>
            <Page className='main'>
                <div className='main-container'>
                    <ArticlesTypes/>
                </div>  
                <div className='side-container'>
                    <MySubredditList/>
                </div>

            </Page>
        </div>    
    )
}