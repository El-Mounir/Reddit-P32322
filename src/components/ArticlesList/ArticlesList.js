import React from 'react';
import { useEffect,useState } from 'react';

import { useDispatch } from 'react-redux';
import { Article } from '../../features/Article/Article';
import { loadMorePosts } from './articlesListSlice';
import './ArticlesList.css';

export const ArticlesList=({articles,subredditName})=> {
    const [afterID,setAfterID] =useState();
    const dispatch = useDispatch();
    const articlesLength = Object.keys(articles).length;

    useEffect(() => {
        if (afterID) {
            dispatch(loadMorePosts({subredditName:subredditName, type:Object.values(articles)[0].type, afterID: Object.values(articles)[articlesLength-1].after}))
        }
    },[afterID]);

    const onClickHandler= (event) => {
        event.preventDefault();
        setAfterID(Object.values(articles)[articlesLength-1].after);
    };

    return(
        <section className='articles'>
            <div className='article'>
                {Object.values(articles).map((article) => (  
                    <Article article={article} key={article.postID}/>
                ))}
            </div>
            <button className='addmore' onClick={onClickHandler}>More</button> 
        </section>
    );
}