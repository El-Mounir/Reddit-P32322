import React, { useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link,useNavigate} from "react-router-dom";
import { toolKeys,UserNameLoader } from '../../app/utilities';
import {Search} from '../../features/Search/Search';
import { loadUserIdentity,selectHeadBar,isLoadingUser } from './headBarSlice';
import './HeadBar.css';
import {ReactComponent as RedditLogo} from '../../app/resources/reddit.svg';

export const HeadBar =()=> {  
    const dispatch = useDispatch();
    const loadingIdentity = useSelector(isLoadingUser);
    const userIdentity = useSelector(selectHeadBar);
    const navigate= useNavigate();

    useEffect(()=>{
        if (!Object.keys(userIdentity).length) {
          dispatch(loadUserIdentity());
        }
    },[dispatch,userIdentity]) 
    
   
    const onClickHandler = (event) => {
        event.preventDefault();
        navigate("/")
    }    

    return(
        <header>
            <div className="header-wrapper">
                <div className='home-container' onClick={onClickHandler}>
                    <Link to='/' className="title">
                        <RedditLogo/>
                        <h4>RedditEclair</h4>  
                    </Link>
                </div>         
                <Search/> 
                <div className='user-container'>
                    {loadingIdentity? <UserNameLoader/> :
                    <>
                        <img className='user-img' src={Object.keys(userIdentity).length ? toolKeys.sliceImageIcon(Object.values(userIdentity)[0].icon_img) : '../../app/resources/account_circle.png'}/>
                        <h5 className='userName'>{Object.keys(userIdentity).length ? (Object.values(userIdentity)[0].user_name) :""}</h5>
                   </>
                    }
                </div>
            </div>
        </header>
    );
}