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
    initialState: {
        result: {},
        isLoadingSubreddit: false,
        failedToLoadSubreddit: false,
    },
    // reducers:{
    //     resetState: (state) => {
    //       state = {};
    //     }
    // },
    extraReducers:{
        [loadMySubreddits.pending]: (state,action) =>{
            state.isLoadingSubreddit = true;
            state.failedToLoadSubreddit = false;
        },
        [loadMySubreddits.fulfilled]: (state,action) =>{
            const subreddits = action.payload;
            for (let subreddit in subreddits) {
                console.log(subreddits[subreddit]);
                state.result[subreddits[subreddit].redditID] = subreddits[subreddit];
            }
            state.isLoadingSubreddit= false;
            state.failedToLoadSubreddit= false;
        },
        [loadMySubreddits.failed]: (state,action) =>{
            state.isLoadingSubreddit = false;
            state.failedToLoadSubreddit = true;
        },
    }
});

export const selectloadMySubsSlice = (state)=> state.subreddit.result;
export const isLoadingSubreddit = (state)=> state.subreddit.isLoadingSubreddit;
// export const {resetState} = loadMySubsSlice.actions;
export default loadMySubsSlice.reducer;