import React, { useEffect }from "react";
import { Subreddit } from "../Subreddit/Subreddit";
import { selectloadMySubsSlice, loadMySubreddits } from "./mySubredditListSlice";
import { useSelector, useDispatch } from 'react-redux';

export const MySubredditList = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectloadMySubsSlice);
    
    useEffect(()=>{
        if (Object.values(subreddits).length === 0) {
          dispatch(loadMySubreddits())
       }},[dispatch,!subreddits]) 

    return(
        <section className="Mysubreddits-container">
            <div>
                <ul className='subreddit_container'>
                    <h4 className="title_subreddits">Your Subreddits</h4>
                    {Object.values(subreddits).map((subreddit) => (                 
                        <Subreddit unit={subreddit}/>           
                    ))}
                </ul>
            </div>
        </section>
    ) 
}