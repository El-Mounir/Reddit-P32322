import React  from 'react';
import { Link, useParams   } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ArticleLoader, toolKeys } from '../../app/utilities';
import { isLoadingPost} from '../../components/ArticlesList/articlesListSlice';
import { ROUTES } from '../../app/Routes';
import { Votes } from '../../components/Votes/Votes';
import { ReactComponent as Comment } from '../../app/resources/comment.svg';
import ReactMarkdown from 'react-markdown';
import './Article.css';

export const Article=({article})=> {
    const { commentID } = useParams();
    sessionStorage.setItem("article", JSON.stringify(article));
    const loadingPost= useSelector(isLoadingPost);

    return(
        <ul className='article_container'>
            { loadingPost ? <ArticleLoader/> :
            <li className='article_box' key={article.postID}>
                <Link to={ROUTES.ArticleComments(article.subreddit,article.postID)} className="toComments">
                    <div className='article_top'> 
                        <h2 className='post_title'>{article.title}</h2>
                    </div> 
                </Link>
                { article.postType === "link" || article.postType === "self" || !article.postType ? 
                <div className={commentID ? 'comment-active' :'content_text'} id="text_container">
                    {article.postType === "link"? <a href={article.url} className="content_link">{article.url}</a> : <ReactMarkdown className={commentID ? 'comment-post' : 'content_paragraph'}>{article.selftext}</ReactMarkdown>}
                </div> :
                <div className={commentID ? 'comment-active' :'article_center'}>
                    {article.postType === "hosted:video" || article.postType === "rich:video" ?
                    article.postType === "hosted:video" ? <video className='content_video' controls data-setup='{}'> <source src={article.video} type="video/mp4" /></video>  : 
                    <iframe src={toolKeys.embedYoutube(toolKeys.replaceText(article.url,"?"))} className="youtube_content" allowFullScreen height= "350px"></iframe> :   
                    <img src={article.content} alt='' className='content_img'/>
                    }         
                </div>
                }
                <div className='article_buttom'>
                    <div className='votes'>
                        <Votes article={article}/>
                    </div>
                    <p className='post_author'>Posted by u/{article.author} {toolKeys.epochConverter(article.time)} ago</p>
                    <Link to={ROUTES.ArticleComments(article.subreddit,article.postID)} className="toComments">
                        <div className='comments_box'>
                            <Comment className='commentIcon'/>
                            <p className='comments_count'>{toolKeys.convertNumbers(article.comment_count)} comments</p>
                        </div>
                    </Link>
                </div>
            </li>
            }
        </ul>
    );
}