import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { toolKeys } from '../../app/utilities';
import { selectloadMySubsSlice,changeSubscription } from '../../components/SubredditList/mySubredditListSlice';
import { ROUTES } from '../../app/Routes';
import './Subreddit.css';

export const Subreddit =({unit})=> {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mySubreddits = useSelector(selectloadMySubsSlice);
    const [toggle,setToggle] = useState();
    const [count,setCount] = useState(0);
 
    useEffect(() => {
        if(toggle === "add" && count > 0) {
            dispatch(changeSubscription({subscription:true,subreddit:unit.name}))
        } else if (toggle === "remove" && count > 0) {
            dispatch(changeSubscription({subscription:false,subreddit:unit.name}))
        }
    },[count])

    const inMySubreddits =() => {
        for (let sub in mySubreddits) {
            if(sub === unit.name) {
                return true;
            }
        }
    };

    const onClickHandler = () => {
       navigate(ROUTES.MainPageSubreddit(unit.name));
    };
    const removeSubreddit = () => {
        let counter = count;
        setToggle("remove")
        setCount(counter+=1)
        
    };
    const addSubreddit = () => {
        let counter = count;
        setToggle("add")
        setCount(counter+=1)
    };
    
    return (
        <li key={unit.redditID} className="subreddit">
            <div className='subreddit_img_container' onClick={onClickHandler}>
                <img src={unit.icon_image ? unit.icon_image : 'no-photo-available.jpg'} alt='' className='reddit_img'/>
            </div>  
            <div className='name_container' onClick={onClickHandler}>
                <h5 className='reddit_name'>r/{unit.name}</h5>
                <p className='member_count'>{toolKeys.convertNumbers(unit.subscriber_count)} Members</p>
            </div>
            {inMySubreddits() ? 
                <button className='add_button' onClick={removeSubreddit}><span>remove</span></button> :
                <button className='add_button' onClick={addSubreddit}><span>add</span></button>
            }      
        </li> 
    )
}