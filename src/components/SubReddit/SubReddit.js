import {useSelector} from 'react-redux';
import { selectSubredditList } from '../SubredditList/subredditListSlice';

export const Subreddit =()=> {
   const subreddits = useSelector(selectSubredditList);

   return (
    <section>
        <ul>
            {subreddits.map((subreddit) => (
                <li>
                    <div>
                        <img src={subreddit.icon_image} alt='' />
                    </div>
                    <h5>{subreddit.name}</h5>
                    <p>{subreddit.subscriber_count}members</p>
                </li>
            ))}
        </ul>
    </section>
   )
}