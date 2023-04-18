import React , {useState} from 'react';
import { Link   } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { ArticleLoader, toolKeys } from '../../app/utilities';
import { isLoadingPost,sendVotes } from '../../components/ArticlesList/articlesListSlice';
import { ROUTES } from '../../app/Routes';
import {ReactComponent as UpArrow } from '../../app/resources/upArrow.svg';
import {ReactComponent as DownArrow} from '../../app/resources/downArrow.svg';
import { ReactComponent as Comment } from '../../app/resources/comment.svg';
import './Article.css';

export const Article=({article})=> {
    sessionStorage.setItem("article", JSON.stringify(article));
    const dispatch = useDispatch();
    const loadingPost= useSelector(isLoadingPost);
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
        <ul className='article_container'>
            { loadingPost ? <ArticleLoader/> :
            <li className='article_box' key={article.postID}>
                <Link to={ROUTES.ArticleComments(article.subreddit,article.postID)} className="toComments">
                    <div className='article_top'> 
                        <h2 className='post_title'>{article.title}</h2>
                    </div> 
                </Link>
                { article.postType === "link" || article.postType === "self" || !article.postType ? 
                <div className='content_text' id="text_container">
                    {article.postType === "link"? <a href={article.url} className="content_link">{article.url}</a> : <p className='content_paragraph' >{article.selftext.replaceAll(".", ".\n")}</p>}
                </div> :
                <div className='article_center'>
                    {article.postType === "hosted:video" || article.postType === "rich:video" ?
                    article.postType === "hosted:video" ? <video className='content_video' controls data-setup='{}'> <source src={article.video} type="video/mp4" /></video>  : 
                    <iframe src={toolKeys.embedYoutube(article.content)} className="youtube_content" allowFullScreen height= "350px"></iframe>  :   
                    <img src={article.content} alt='' className='content_img'/>
                    }         
                </div>
                }
                <div className='article_buttom'>
                    <div className='votes'>
                        <UpArrow className={voteStatus ? "uparrowActive" : "uparrow" } onClick={upVote}/>
                        <p>{toolKeys.convertNumbers(voteCount)}</p>
                        <DownArrow className={voteStatus === false ? "downarrowActive" : "downarrow" } onClick={downVote}/>
                    </div>
                    <p className='post_author'>Posted by u/{article.author} {toolKeys.epochConverter(article.time)} ago</p>
                    <Link to={ROUTES.ArticleComments(article.subreddit,article.postID)} className="toComments">
                        <div className='comments_box'>
                            <Comment className='commentIcon'/>
                            <p className='comments_count'>{toolKeys.convertNumbers(article.comment_count)} comments</p>
                        </div>
                    </Link>
                </div>
            </li>
            }
        </ul>
    );
}