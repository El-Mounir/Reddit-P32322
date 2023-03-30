import {createSlice} from "@reduxjs/toolkit";

export const subredditListSlice = createSlice({
    name: "subreddits",
    initialState: [],
    reducers:{
        addSubreddit:(state,action)=> { 
        },
    }           
});

export const selectSubredditList = (state)=> state.subreddits;
export const { addSubreddit } = subredditListSlice.actions;
export default subredditListSlice.reducer;
