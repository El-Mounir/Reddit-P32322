import React from 'react';
import { toolKeys } from '../../app/utilities';

export const Subreddit =({unit})=> {
    
   return (  
        <li className='subreddit'>
            <div className='subreddit_img_container'>
                <img src={unit.icon_image} alt='' className='reddit_img'/>
            </div>
            <h5 className='reddit_name'>r/{unit.name}</h5>
            <p className='member_count'>{toolKeys.convertNumbers(unit.subscriber_count)} Members</p>
            <button className='add_button'>+</button>
        </li>     
   )
}