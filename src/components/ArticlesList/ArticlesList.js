import React from 'react';
import { Article } from '../Article/Article';
import { ArticlesTypes } from '../ArticlesTypes/ArticlesTypes';
import { selectloadHotPostSlice } from '../ArticlesList/articlesListSlice';
import { selectloadBestPostSlice } from './bestPostSlice';
import { useSelector } from 'react-redux';

export const ArticlesList=()=> {
    const articles = useSelector(selectloadBestPostSlice);
    return(
        <section className='articles'>
            <ArticlesTypes/>
            <div className='article'>
                {Object.values(articles).map((article) => (  
                    <Article article={article}/>
                ))}
            </div>
        </section>
    );
}