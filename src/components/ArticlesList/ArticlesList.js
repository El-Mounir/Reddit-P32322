import React from 'react';
import { useEffect,useState } from 'react';
import { useScrollPosition } from '../../app/utilities';
import { useDispatch } from 'react-redux';
import { Article } from '../../features/Article/Article';
import { loadMorePosts } from './articlesListSlice';
import './ArticlesList.css';

export const ArticlesList=({articles,subredditName})=> {
    const [afterID,setAfterID] =useState();
    const scrollPosition = useScrollPosition();
    const dispatch = useDispatch();
    const articlesLength = Object.keys(articles).length;

    useEffect(() => {
        if (afterID) {
            dispatch(loadMorePosts({subredditName:subredditName, type:Object.values(articles)[0].type, afterID: afterID}))
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
            <button className={scrollPosition === 0 ? 'hidden' : 'addmore'} onClick={onClickHandler}>More</button> 
        </section>
    );
}