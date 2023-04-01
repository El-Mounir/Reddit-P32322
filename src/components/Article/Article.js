import React from 'react';
import { toolKeys } from '../../app/utilities';

export const Article=({article})=> {
    // const article = {
    //     author: "CalvinbyHobbes",
    //     comment_count: 570,
    //     content: "https://i.redd.it/02a1jjdob9ra1.png",
    //     postID: "128jaoc",
    //     time: 1680347983,
    //     title: "Screenshots of Kanto remake leaked on pokemon.co.jp's website",
    //     votes: 7365,

    // }

    return(
        <ul className='article_container'>
            <li className='article_box'>
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
                    <p className='post_author'>Posted by u/{article.author} {article.time} hours ago</p>
                    <div className='comments_box'>
                        <img/>
                        <p className='comments_count'>{toolKeys.convertNumbers(article.comment_count)} comments</p>
                    </div>
                </div>
            </li>
        </ul>
    );
}