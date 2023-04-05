import React from 'react';
import { useSelector } from 'react-redux';
import { toolKeys } from '../../app/utilities';
import { isLoadingSubreddit } from '../../components/SubredditList/mySubredditListSlice';
import { isLoadingResult } from '../../components/SearchResult/searchResultSlice';
import { ResultLoader } from '../../app/utilities';

import './Subreddit.css';

export const Subreddit =({unit})=> {
    const loadingSubreddit= useSelector(isLoadingSubreddit);
    const loadingResult = useSelector( isLoadingResult);
    
    return (
        <li  className='subreddit'>
            {loadingResult || loadingSubreddit ? <ResultLoader/> :
            <>
                <div className='subreddit_img_container'>
                    <img src={unit.icon_image} alt='' className='reddit_img'/>
                </div>  
                <div className='name_container'>
                    <h5 className='reddit_name'>r/{unit.name}</h5>
                    <p className='member_count'>{toolKeys.convertNumbers(unit.subscriber_count)} Members</p>
                </div>
                <button className='add_button'>+</button>
            </>  
        }      
        </li> 
    )
}