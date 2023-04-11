import React from 'react';
import { useEffect,useState } from 'react';
import { ArticleLoader } from '../../app/utilities';
import { useDispatch,useSelector } from 'react-redux';
import { Article } from '../../features/Article/Article';
import { loadMorePosts,isLoadingPost } from '../ArticlesList/articlesListSlice';

export const ArticleComments = (article) => {
    return(
        <section className='articles'>
            <div className='article'>
                {/* <Article article={article} key={article.postID}/> */}
            </div>
        </section>
    );

}