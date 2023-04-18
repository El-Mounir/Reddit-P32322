import React , { useState,useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../app/Routes';
import { useNavigate, useParams } from "react-router-dom";
import { ArticlesList } from '../../components/ArticlesList/ArticlesList';
import { loadPosts,selectLoadArticleSlice } from '../../components/ArticlesList/articlesListSlice';
import './ArticlesTypes.css';

export const ArticlesTypes=({subredditName, defaultType})=> {
    const dispatch = useDispatch();
    const {postType} = useParams();
    const navigate = useNavigate();
    const [type,setType] = useState(defaultType);
    const articles = useSelector(selectLoadArticleSlice);

    useEffect (() => {
            dispatch(loadPosts({subredditName,type}));   
    },[subredditName,type]);

    useEffect (() => {
        (postType? setType(postType) : setType(defaultType))
    },[postType])

    const onClickHandler = (event) => {
        event.preventDefault();
        if(!subredditName) {
            navigate(ROUTES.MainPage(event.target.value));
        } else {
            setType(event.target.value)
            navigate(`${event.target.value}`);
        }
    };
    
    return(
        <>
        <ul className="navBar-container">
            <li className='hot'> 
                <button onClick={onClickHandler} value='hot' className='type hot'>Hot</button>
            </li>
            <li className='new'>
                <button onClick={onClickHandler} value='new' className='type new'>New</button>
            </li>
            <li className='top'>
                <button onClick={onClickHandler} value='top' className='type top'>Top</button>
            </li>
        </ul>
        <ArticlesList articles={articles} subredditName={subredditName}/>
        </>
    );
}