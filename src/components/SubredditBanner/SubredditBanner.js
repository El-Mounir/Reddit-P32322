import React  from 'react';
import { toolKeys } from '../../app/utilities';
import { Subreddit } from '../../features/Subreddit/Subreddit';
import './SubredditBanner.css';


export const SubredditBanner = ({subreddit}) => {
sessionStorage.setItem("subreddit", JSON.stringify(subreddit));

    return ( 
         <div className='banner-wrapper'>
          <img src={toolKeys.sliceImageIcon(subreddit.background_img)} className='banner_img'/>
          <div className='subreddit_banner'>
            <Subreddit unit={subreddit}/> 
          </div>  
        </div> 
    )
}
