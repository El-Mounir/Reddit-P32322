import React, { useEffect } from "react";
import { Subreddit } from "../../features/Subreddit/Subreddit";
import { selectloadMySubsSlice, loadMySubreddits } from "./mySubredditListSlice";
import { useSelector, useDispatch } from 'react-redux';
import './MySubredditList.css';

export const MySubredditList = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectloadMySubsSlice);
    
    useEffect(()=>{
        if (Object.values(subreddits).length === 0) {
          dispatch(loadMySubreddits());
        }
       },[dispatch,subreddits]) 

    return(
        <section className="Mysubreddits-container">
          
                <ul className='subreddit_container'>
                    <h4 className="title_subreddits">Your Subreddits</h4>
                    {Object.values(subreddits).map((subreddit) => (                 
                        <Subreddit unit={subreddit}/>           
                    ))}
                </ul>
          
        </section>
    ) 
}