import React, { useEffect,useState } from "react";
import { toolKeys } from "../../app/utilities";
import { useDispatch } from 'react-redux';
import { loadMoreSearchResult } from '../SearchResult/searchResultSlice';
import { loadMorePosts } from "../ArticlesList/articlesListSlice";
import { loadMoreSubreddits } from "../SubredditList/mySubredditListSlice";
import { getMoreComments } from "../ArticleComments/articleCommentsSlice";
import { useScrollPosition } from "../../app/utilities";
import './ShowMore.css';

export const ShowMore = ({segment,subredditName,whatToGet,commentID}) => {
    const [afterID,setAfterID] =useState();
    const scrollPosition = useScrollPosition();
    const segmentLength = Object.keys(segment).length;
    const dispatch = useDispatch();

    useEffect(() => {
        if (afterID) {
            switch (whatToGet) {
                case ("search"):
                    const searchTerm = toolKeys.getSearchTerm();
                    dispatch(loadMoreSearchResult({searchTerm:searchTerm, afterID: afterID}));
                    break;
                case ("mySubreddits"):
                    dispatch(loadMoreSubreddits({subreddit:"",afterID:afterID}));
                    break;
                case ("posts") :
                    dispatch(loadMorePosts({subredditName:subredditName, type:Object.values(segment)[0].type, afterID: afterID}));
                    break;
                case ("comments") :
                    dispatch(getMoreComments({comment:"",postID:commentID,children:afterID}));
                    break;
                default:
            }

        }
    },[afterID]);
    
    const onClickHandler= (event) => {
        event.preventDefault();
        setAfterID(whatToGet === "comments" ? segment[segmentLength-1].children : Object.values(segment)[segmentLength-1].after);
    };
    
    return (
        <button className={whatToGet === "mySubreddits" ? "addmore" :  (scrollPosition === 0 ? 'hidden' : 'addmore')} onClick={onClickHandler}> Show more</button> 
    )
}