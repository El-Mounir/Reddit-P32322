import React from 'react';
import { useSelector } from 'react-redux';
import { toolKeys,ArticleLoader } from '../../app/utilities';
import { isLoadingPost } from '../../components/ArticlesList/articlesListSlice';
import './Article.css';

export const Article=({article})=> {
    const loadingPost= useSelector(isLoadingPost);

    return(
        <ul className='article_container'>
            <li className='article_box'>
            {loadingPost ? <ArticleLoader/> : 
            <>
                <div className='article_top'>
                    <h2 className='post_title'>{article.title}</h2>
                </div>
                <div className='article_center'>
                    <img src={article.content} alt='' className='content_img'/>
                </div>
                <div className='article_buttom'>
                    <div className='votes'>
                        <button>up</button>
                        <p>{toolKeys.convertNumbers(article.votes)}</p>
                        <button>down</button>
                    </div>
                    <p className='post_author'>Posted by u/{article.author} {toolKeys.epochConverter(article.time)} ago</p>
                    <div className='comments_box'>
                        <img/>
                        <p className='comments_count'>{toolKeys.convertNumbers(article.comment_count)} comments</p>
                    </div>
                </div>
            </>
            }
            </li>
        </ul>
    );
}