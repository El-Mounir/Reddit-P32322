import React, { useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { ROUTES } from '../../app/Routes';
import { toolKeys,UserNameLoader } from '../../app/utilities';
import {Search} from '../../features/Search/Search';
import { switchType } from '../MainPage/mainPageSlice';
import { loadUserIdentity,selectHeadBar,isLoadingUser } from './headBarSlice';
import { loadPosts } from '../ArticlesList/articlesListSlice';
import './HeadBar.css';
import {ReactComponent as RedditLogo} from './reddit.svg';

export const HeadBar =()=> {  
    const dispatch = useDispatch();
    const loadingIdentity = useSelector(isLoadingUser);
    const userIdentity = useSelector(selectHeadBar);

    useEffect(()=>{
        if (!Object.keys(userIdentity).length) {
          dispatch(loadUserIdentity());
        }
    },[dispatch,userIdentity]) 

    const onClickHandler = () => {
        dispatch(loadPosts("best"));
    }
    return(
        <header>
            <div className="header-wrapper">
                <div className='home-container' onClick={onClickHandler}>
                    <Link to="/best" className="title">
                        <RedditLogo/>
                        <h4>RedditEclair</h4>  
                    </Link>
                </div>         
                <Search/> 
                <div className='user-container'>
                    {loadingIdentity? <UserNameLoader/> :
                    <>
                        <img className='user-img' src={Object.keys(userIdentity).length ? toolKeys.sliceImageIcon(Object.values(userIdentity)[0].icon_img) :""}/>
                        <h5 className='userName'>{Object.keys(userIdentity).length ? (Object.values(userIdentity)[0].user_name) :""}</h5>
                   </>
                    }
                </div>
            </div>
        </header>
    );
}