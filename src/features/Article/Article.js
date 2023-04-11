import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ArticleLoader, toolKeys } from '../../app/utilities';
import { isLoadingPost } from '../../components/ArticlesList/articlesListSlice';
import { ROUTES } from '../../app/Routes';
import './Article.css';

export const Article=({article})=> {
    const loadingPost= useSelector(isLoadingPost);
    const navigate = useNavigate();

    return(
        // <Link to={ROUTES.ArticleComments()} className="toComments">
            <ul className='article_container'>
                { loadingPost ? <ArticleLoader/> :
                <li className='article_box' key={article.postID}>
                    <div className='article_top'> 
                        <h2 className='post_title'>{article.title}</h2>
                    </div> 
                    { article.postType === "link" || article.postType === "self" || !article.postType ? 
                    <div className='content_text' id="text_container">
                        {article.postType === "link"? <a href={article.url} className="content_link">{article.url}</a> : <p className='content_paragraph' >{article.selftext.replaceAll(".", ".\n")}</p>}
                    </div> :
                    <div className='article_center'>
                        {article.postType === "hosted:video" || article.postType === "rich:video" ?
                        article.postType === "hosted:video" ? <video className='content_video' controls data-setup='{}'> <source src={article.video} type="video/mp4" /></video>  : 
                        <iframe src={toolKeys.embedYoutube(article.content)} className="youtube_content" allowFullScreen height= "350px"></iframe>  :   
                        <img src={article.content} alt='' className='content_img'/>
                        }         
                    </div>
                    }
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
                
                </li>
                }
            </ul>
        // </Link>
    );
}