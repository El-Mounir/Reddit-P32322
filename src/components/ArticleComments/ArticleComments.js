import React from 'react';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Article } from '../../features/Article/Article';
import { selectLoadArticleSlice } from '../ArticlesList/articlesListSlice';
import { useParams } from 'react-router-dom';
import { selectLoadCommentSlice,getComments  } from './articleCommentsSlice';
import { Comment } from '../../features/Comment/Comment';
import './ArticleComments.css';

export const ArticleComments = () => {
    const {subreddit,commentID} = useParams();
    const articles = useSelector(selectLoadArticleSlice);
    const comments = useSelector(selectLoadCommentSlice);
    console.log(comments)
    const article = Object.values(articles).find(article => article.postID === commentID);
    const dispatch = useDispatch();
    
    useEffect(() => {
            dispatch(getComments({subreddit:subreddit,postID:commentID}));
    },[commentID])

    return(
        <section className='mainpage-wrapper'>
            <div className="mainpage-container">
                <div className='article-container'>
                    <Article article={article}/> 
                </div>
                <ul className='comments-container'> 
                    {comments.map((comment) => (
                    <Comment comment={comment}/>)
                    )}
                </ul>
            </div>
        </section>
    );

}