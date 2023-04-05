import React from 'react';
import { Article } from '../../features/Article/Article';
import './ArticlesList.css';

export const ArticlesList=({articles})=> {

    return(
        <section className='articles'>
            <div className='article'>
                {Object.values(articles).map((article) => (  
                    <Article article={article}/>
                ))}
            </div>
        </section>
    );
}