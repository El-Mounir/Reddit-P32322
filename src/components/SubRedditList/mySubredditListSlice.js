import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const loadMySubreddits= createAsyncThunk(
    "subreddit/loadMySubreddits",
async () => {
        const response = await Reddit.getMySubreddits()
        return response;
    }
);
export const loadMySubsSlice = createSlice({
    name: "subreddit",
    initialState: {},
    extraReducers:{
        [loadMySubreddits.fulfilled]: (state,action) =>{
            const subreddits = action.payload;
            for (let subreddit in subreddits) {
                console.log(subreddits[subreddit]);
                state[subreddits[subreddit].redditID] = subreddits[subreddit];
            }
        },
    }
});

export const selectloadMySubsSlice = (state)=> state.subreddit;
export default loadMySubsSlice.reducer;