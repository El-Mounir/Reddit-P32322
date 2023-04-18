import React  from 'react';
import { toolKeys } from '../../app/utilities';
import {ReactComponent as UpArrow } from '../../app/resources/upArrow.svg';
import {ReactComponent as DownArrow} from '../../app/resources/downArrow.svg';
import './Comment.css';


export const Comment=({comment})=> {
    
    return (
        <li key={comment.commentID} className='comment-wrapper'>
            <div className='upper-container'>
              <p className='author-name'>{comment.author}</p>
              {toolKeys.epochConverter(comment.time) ? <p>{toolKeys.epochConverter(comment.time)} ago</p> : <p>just now</p>}
            </div>
            <div className= 'body-container'>
                <p className='commentBody'>{comment.comment}</p>
            </div>
            <div className='bottom-container'>
                <div className='votes'>
                    <UpArrow className={comment.vote? "uparrowActive" : "uparrow" }/>
                        <p>{comment.votes ? toolKeys.convertNumbers(comment.votes) : ""}</p>
                    <DownArrow className={(comment.vote === false)? "downarrowActive" : "downarrow" }/>
                </div>
                <p>Reply</p>
            </div>      
        </li>
    )
}