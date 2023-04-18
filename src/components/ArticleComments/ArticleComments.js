import React, { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Article } from '../../features/Article/Article';
import { selectLoadArticleSlice } from '../ArticlesList/articlesListSlice';
import { useParams } from 'react-router-dom';
import { toolKeys,CommentLoader } from '../../app/utilities';
import { selectHeadBar } from '../HeadBar/headBarSlice';
import { selectLoadCommentSlice,getComments ,sendComments,isLoadingComment } from './articleCommentsSlice';
import { Comment } from '../../features/Comment/Comment';
import { Page } from '../Page/Page';
import './ArticleComments.css';

export const ArticleComments = () => {
    window.scroll(0,0);
    const {subreddit,commentID} = useParams();
    const [comment,setComment] = useState("");
    const comments = useSelector(selectLoadCommentSlice);
    const articles = useSelector(selectLoadArticleSlice);
    const loadingComment= useSelector(isLoadingComment);
    const article = Object.values(articles).find(article => article.postID === commentID);
    const dispatch = useDispatch();
    
    useEffect(() => {
            dispatch(getComments({subreddit:subreddit,postID:commentID}))
    },[commentID])

    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(sendComments({comment:comment,postID:`t3_${commentID}`}));
        setComment('');
    };
   

    const handleOnClick = () => {
        window.scroll(0,0);
    }

    return(
        <section className='mainpage-wrapper'>
            <Page className="comment">
                <div className="mainpage-container">
                    <div className='article-container'>
                        <Article article={article ? article : JSON.parse(sessionStorage.article)}/> 
                        <form onSubmit={onSubmitHandler}>
                            <div className='comment-container'>
                                <textarea type='text' name='commentSection' id='commentSection' placeholder='Your comment here' onChange={(event) => setComment(event.currentTarget.value)}/>
                                <button className='comment-button'>
                                    Comment
                                </button>
                            </div>
                        </form>
                        <button className='upToTop topComment' onClick={handleOnClick}>Up</button>
                    </div>
                    <ul className='comments-container'> 
                    <h4 className="comment-title">Comments</h4>
                    { loadingComment ? toolKeys.countArray(8).map((count) => <CommentLoader  key={`loader ${count}`}/>) : 
                    (comments.length === 0) ? <div className='noComments'>No Comments yet</div> :
                    <>
                     {comments.map((comment) => (
                        <Comment comment={comment} key={comment.commentID}/>)
                        )}
                    </>
                    }
                    </ul>
                </div>
            </Page>
        </section>
    );

}