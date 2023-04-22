import React , {useState} from 'react';
import { toolKeys } from '../../app/utilities';
import { useDispatch } from 'react-redux';
import { sendVotes } from '../ArticlesList/articlesListSlice';
import {ReactComponent as UpArrow } from '../../app/resources/upArrow.svg';
import {ReactComponent as DownArrow} from '../../app/resources/downArrow.svg';
import './Votes.css';

export const Votes=({article})=> {
    const dispatch = useDispatch();
    const [ voteCount,setVoteCount ] = useState(article.votes);
    const [ voteStatus,setVoteStatus ] = useState(article.vote);

    const upVote = () =>{
        if (voteStatus) {
             dispatch(sendVotes({id:`t3_${article.postID}`, vote:0}));
             setVoteStatus(null);
             setVoteCount(voteCount-1)
        } else if (voteStatus === false) {
             dispatch(sendVotes({id:`t3_${article.postID}`, vote:1}));
             setVoteStatus(true);
             setVoteCount(voteCount+2);
        } else {
             dispatch(sendVotes({id:`t3_${article.postID}`, vote:1}));
             setVoteStatus(true);
             setVoteCount(voteCount+1);
        }
    };
    const downVote = () =>{
        if (voteStatus === false) {
                dispatch(sendVotes({id:`t3_${article.postID}`, vote:0}));
                setVoteStatus(null);
                setVoteCount(voteCount+1);
        } else if (voteStatus) {
                dispatch(sendVotes({id:`t3_${article.postID}`, vote:-1}));
                setVoteStatus(false);
                setVoteCount(voteCount-2);
        } else{
                dispatch(sendVotes({id:`t3_${article.postID}`, vote:-1}));
                setVoteStatus(false);
                setVoteCount(voteCount-1);
        }
    };
    
    return(
        <div className='votes'>
            <UpArrow className={voteStatus ? "uparrowActive" : "uparrow" } onClick={upVote}/>
            <p>{toolKeys.convertNumbers(voteCount)}</p>
            <DownArrow className={voteStatus === false ? "downarrowActive" : "downarrow" } onClick={downVote}/>
        </div>
    )
}