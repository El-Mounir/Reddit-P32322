import React, { useEffect,useRef} from 'react';
import { Link } from "react-router-dom";
import { ROUTES } from '../../app/Routes';
import {Search} from '../Search/Search';
import { useDispatch } from 'react-redux';
import { loadBestPosts } from '../ArticlesList/bestPostSlice';

export const TopBar =()=> {
    const dispatch = useDispatch();
    useEffect (() => {
        dispatch(loadBestPosts());
    },[dispatch])

    return(
        <header>
            <div className="header-container">
                <Link to={ROUTES.ArticlesList()} className="title">
                    <img/>
                    <h4>Reddit<span>Eclair</span></h4>
                </Link>
                <Search/> 
            </div>
        </header>
    );
}