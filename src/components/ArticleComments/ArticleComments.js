import React, { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Article } from '../../features/Article/Article';
import { selectLoadArticleSlice } from '../ArticlesList/articlesListSlice';
import { useParams } from 'react-router-dom';
import { toolKeys,CommentLoader } from '../../app/utilities';
import { selectLoadCommentSlice,getComments ,sendComments,isLoadingComment } from './articleCommentsSlice';
import { selectHeadBar } from '../HeadBar/headBarSlice';
import { Comment } from '../../features/Comment/Comment';
import { Page } from '../Page/Page';
import './ArticleComments.css';
import { UpButton } from '../UpButton/UpButton';
import { ShowMore } from '../ShowMore/ShowMore';

export const ArticleComments = () => {
    const textarea = document.getElementById('commentSection');
    const {subreddit,commentID} = useParams();
    const [comment,setComment] = useState("");
    const userIdentity = useSelector(selectHeadBar);
    const comments = useSelector(selectLoadCommentSlice);
    const articles = useSelector(selectLoadArticleSlice);
    const loadingComment= useSelector(isLoadingComment);
    const userName = Object.values(userIdentity)[0].user_name;
    const article = Object.values(articles).find(article => article.postID === commentID);
    const dispatch = useDispatch();
    
    useEffect(() =>{
        window.scroll(0,0);
    },[]);

    useEffect(() => {
            dispatch(getComments({subreddit:subreddit,postID:commentID}))
    },[commentID]);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(sendComments({comment:comment,postID:`t3_${commentID}`,userName:userName}));
        setComment('');
        textarea.value = '';
    };
   
    return(
        <section className='mainpage-wrapper'>
            <Page className="comment">
                <div className="mainpage-container">
                    <div className='article-container'>
                        <Article article={article ? article : JSON.parse(sessionStorage.article)}/> 
                        <form onSubmit={onSubmitHandler}>
                            <div className='comment-container'>
                                <textarea name='commentSection' id='commentSection' placeholder='Your comment here' onChange={(event) => setComment(event.currentTarget.value)}></textarea>
                                <button className='comment-button'>Comment</button>
                            </div>
                        </form>
                        <UpButton/>
                    </div>
                    <ul className='comments-container'> 
                    <h4 className="comment-title">Comments</h4>
                    { loadingComment ? toolKeys.countArray(8).map((count) => <CommentLoader  key={`loader ${count}`}/>) : 
                    (comments.length === 0) ? <div className='noComments'>No Comments yet</div> :
                    <>
                    {comments.map((comment) => (comment.comment ?
                        <Comment comment={comment} key={comment.commentID}/> : null)
                    )}
                    </>
                    }
                    <div className='show_moreComments'>
                        <ShowMore segment={comments} whatToGet={"comments"} commentID={commentID}/>
                    </div>
                    </ul> 
                </div>
            </Page>
        </section>
    );

}