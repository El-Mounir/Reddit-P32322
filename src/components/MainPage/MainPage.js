import React  from 'react';
import { Page } from '../Page/Page';
import { ArticlesTypes } from '../../features/ArticlesTypes/ArticlesTypes';
import { MySubredditList } from '../SubredditList/MySubredditList';
import { useParams } from 'react-router-dom';
import { UpButton } from '../UpButton/UpButton';

export const MainPage = () => {
    const {postType} = useParams();

    return (  
        <div className='mainpage-wrapper'>
            <Page className='main'>
                <div className='main-container'>
                    <ArticlesTypes subredditName="" defaultType={ postType ? postType : "best"}/>
                </div>  
                <div className='side-container'>
                    <UpButton />
                    <MySubredditList/>
                </div>
            </Page>
        </div>

    )
}