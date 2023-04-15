import React  from 'react';
import { toolKeys } from '../../app/utilities';
import {ReactComponent as UpArrow } from '../../app/resources/upArrow.svg';
import {ReactComponent as DownArrow} from '../../app/resources/downArrow.svg';
import './Comment.css';


export const Comment=({comment})=> {

    // const comment ={author:"TimidEngineer",
    // commentID:"jgbvh06",
    // time:1681540332,
    // votes:480,
    // vote:null,
    // comment:"I would. Your guild lied to you. Why would you keep helping them get loot?",
    // }
    
    return (
        <li key={comment.commentID} className='comment-wrapper'>
            <div className='upper-container'>
              <p className='author-name'>{comment.author}</p>
              <p>{toolKeys.epochConverter(comment.time)} ago</p>
            </div>
            <div className= 'body-container'>
                <p className='commentBody'>{comment.comment}</p>
            </div>
            <div className='bottom-container'>
                <div className='votes'>
                    <UpArrow className={comment.vote? "uparrowActive" : "uparrow" }/>
                        <p>{comment.votes}</p>
                    <DownArrow className={(comment.vote === false)? "downarrowActive" : "downarrow" }/>
                </div>
                <p>reply</p>
            </div>
        </li>
    )
}