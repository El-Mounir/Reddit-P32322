import React, { useEffect } from "react";
import { Subreddit } from "../../features/Subreddit/Subreddit";
import { toolKeys,SubredditLoader} from "../../app/utilities";
import { selectloadMySubsSlice, loadMySubreddits,isLoadingSubreddit } from "./mySubredditListSlice";
import { useSelector, useDispatch } from 'react-redux';
import './MySubredditList.css';
import { ShowMore } from "../ShowMore/ShowMore";

export const MySubredditList = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectloadMySubsSlice);
    const loadingSubreddit= useSelector(isLoadingSubreddit);
    
    useEffect(()=>{
        if (Object.keys(subreddits).length === 0) {
          dispatch(loadMySubreddits());
        };
    },[subreddits]) 

    return(
        <section className="Mysubreddits-container">
            <ul className='subreddit_container'>
                <h4 className="title_subreddits">Your Subreddits</h4>
                {loadingSubreddit ? toolKeys.countArray(5).map((count) => <SubredditLoader key={`Subredditloader ${count}`}/>) :
                <>
                {Object.values(subreddits).map((subreddit) => (                 
                    <Subreddit unit={subreddit} key={subreddit.redditID}/>           
                ))}
                </>
                }
                <div className="show_mySubreddits">
                    <ShowMore segment={subreddits} whatToGet={"mySubreddits"}/>
                </div>
            </ul>
        </section>
    ) 
}