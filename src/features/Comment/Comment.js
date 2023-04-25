import React  from 'react';
import { toolKeys } from '../../app/utilities';
import { Votes } from '../../components/Votes/Votes';
import ReactMarkdown from 'react-markdown';
import './Comment.css';


export const Comment=({comment})=> {
    
    return (
        <li key={comment.commentID} className='comment-wrapper'>
            <div className='upper-container'>
              <p className='author-name'>{comment.author}</p>
              {!toolKeys.epochConverter(comment.time) ? <p>just now</p> : <p>{toolKeys.epochConverter(comment.time)} ago</p>}
            </div>
            <div className= 'body-container'>
                <ReactMarkdown className='commentBody'>{comment.comment}</ReactMarkdown>
            </div>
            <div className='bottom-container'>
                <Votes article= {comment}/>
            </div>      
        </li>
    )
}