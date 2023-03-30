import React from 'react';
import {useSelector} from 'react-redux';
import { selectSearchResult} from '../SearchResult/searchResultSlice';

export const SearchResult=()=> {
    const subreddits = useSelector(selectSearchResult);

    return (
        <section>
            <ul>
                {subreddits.map((subreddit) => (
                    <li>
                        <div>
                            <img src={subreddit.icon_image} alt='' />
                        </div>
                        <h5>{subreddit.name}</h5>
                        <p>{subreddit.subscriber_count} members</p>
                    </li>
                ))}
            </ul>
        </section>
   )
}