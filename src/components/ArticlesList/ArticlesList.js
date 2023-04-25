import React from 'react';
import { Article } from '../../features/Article/Article';
import './ArticlesList.css';    
import { ShowMore } from '../ShowMore/ShowMore';

export const ArticlesList=({articles,subredditName})=> {

    return(
        <section className='articles'>
            <div className='article'>
                {Object.values(articles).map((article) => ( 
                    <Article article={article} key={article.postID}/>
                ))}
            </div>
            <ShowMore segment={articles} subredditName={subredditName} whatToGet={"posts"}/>
        </section>
    );
}