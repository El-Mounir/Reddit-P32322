import React , { useState,useEffect }from 'react';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../app/Routes';
import { useNavigate } from 'react-router-dom';
import { loadHotPosts } from '../ArticlesList/articlesListSlice';

export const ArticlesTypes=()=> {
    // const [subreddit,setSubreddit] = useState();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // useEffect (() => {
    //     if (subreddit) {
    //         dispatch(loadHotPosts(subreddit));
    //     }
    // },[dispatch,subreddit])

    // const onClickHandler = () => {
    //     const subredditName = window.location.href.match(/r([^&]*)/);
    //     setSubreddit(subredditName[1]);
    //     navigate(ROUTES.ArticlesList(subreddit))
    // }

    return(
        <ul className="navBar-container">
            <li>
                {/* <button onClick={onClickHandler}>Hot</button> */}
            </li>
            <li>
                <button>New</button>
            </li>
            <li className='button-top'>
                <button >Top</button>
            </li>
        </ul>
    );
}