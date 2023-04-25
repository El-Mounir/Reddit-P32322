import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const loadMySubreddits= createAsyncThunk(
    "subreddit/loadMySubreddits",
async () => {
        const response = await Reddit.getSubreddits();
        return response;
    }
);

export const loadMoreSubreddits = createAsyncThunk(
    "subreddit/loadMoreSubreddits",
    async ({subreddit,afterID}) => {
        const response = await Reddit.getSubreddits(subreddit,afterID);
        return response;
    }  
);

export const changeSubscription = createAsyncThunk(
    "subreddit/addRemoveMySubreddits",
    async ({subscription,subreddit}) => {
            const response = await Reddit.manageSubscriptions(subscription,subreddit);
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
   
    extraReducers:{
        [loadMySubreddits.pending]: (state,action) =>{
            state.isLoadingSubreddit = true;
            state.failedToLoadSubreddit = false;
        },
        [loadMySubreddits.fulfilled]: (state,action) =>{
            const subreddits = action.payload;
            for (let subreddit in subreddits) {
                state.result[subreddits[subreddit].name] = subreddits[subreddit];
            }
            state.isLoadingSubreddit= false;
            state.failedToLoadSubreddit= false;
        },
        [loadMySubreddits.failed]: (state,action) =>{
            state.isLoadingSubreddit = false;
            state.failedToLoadSubreddit = true;
        },
        [loadMoreSubreddits.pending]: (state,action) =>{
            state.isLoadingSubreddit = true;
            state.failedToLoadSubreddit = false;
        },
        [loadMoreSubreddits.fulfilled]: (state,action) =>{
            const newSubreddits = action.payload;
            for (let subreddit in newSubreddits) {
                state.result[newSubreddits[subreddit].name] = newSubreddits[subreddit];
            }
            state.isLoadingSubreddit= false;
            state.failedToLoadSubreddit= false;
        },
        [loadMoreSubreddits.failed]: (state,action) =>{
            state.isLoadingSubreddit = false;
            state.failedToLoadSubreddit = true;
        },
        [changeSubscription.pending]: (state,action) =>{
            state.isLoadingSubreddit = true;
            state.failedToLoadSubreddit = false;
        },
        [changeSubscription.fulfilled]: (state,action) =>{
            const subreddits = action.payload;
            state.result = {};
            for (let subreddit in subreddits) {
                state.result[subreddits[subreddit].name] = subreddits[subreddit];
            }
            state.isLoadingSubreddit= false;
            state.failedToLoadSubreddit= false;
        },
        [changeSubscription.failed]: (state,action) =>{
            state.isLoadingSubreddit = false;
            state.failedToLoadSubreddit = true;
        },
    }
});

export const selectloadMySubsSlice = (state)=> state.subreddit.result;
export const isLoadingSubreddit = (state)=> state.subreddit.isLoadingSubreddit;
export default loadMySubsSlice.reducer;