import React , { useState,useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../app/Routes';
import { useNavigate } from "react-router-dom";
import { ArticlesList } from '../../components/ArticlesList/ArticlesList';
import { loadPosts,selectLoadArticleSlice } from '../../components/ArticlesList/articlesListSlice';
import './ArticlesTypes.css';

export const ArticlesTypes=()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [type,setType] = useState("best");

    const articles = useSelector(selectLoadArticleSlice);
    useEffect (() => {
        if(type){
            dispatch(loadPosts(type));
        }
    },[dispatch,type]);

    const onClickHandler = (e) => {
        e.preventDefault();
        setType(e.target.value);
        navigate(ROUTES.MainPage(e.target.value));
    }
    return(
        <>
        <ul className="navBar-container">
            <li>
                <button onClick={onClickHandler} value='hot'>Hot</button>
            </li>
            <li>
                <button onClick={onClickHandler} value='new'>New</button>
            </li>
            <li className='button-top'>
                <button onClick={onClickHandler} value='top'>Top</button>
            </li>
        </ul>
        <ArticlesList articles={articles}/>
        </>
    );
}