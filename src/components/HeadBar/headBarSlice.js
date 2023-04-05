import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const loadUserIdentity = createAsyncThunk(
    "user/loadUserIdentity",
async () => {
        const response = await Reddit.getUserName();
        return response;
    }
);

export const headBarSlice = createSlice({
    name: "user",
    initialState: {
        identity: {},
        isLoadingUser: false,
        failedToLoadUser: false,
    },
    extraReducers:{

        [loadUserIdentity.pending]: (state,action) =>{
            state.isLoadingUser= true;
            state.failedToLoadUser= false;
        },   
        [loadUserIdentity.fulfilled]: (state,action) =>{
            state.identity[action.payload.id] = action.payload;
            state.isLoadingUser= false;
            state.failedToLoadUser= false;
        },
        [loadUserIdentity.pending]: (state,action) =>{
            state.isLoadingUser= false;
            state.failedToLoadUser= true;
        },   
    }

});

export const selectHeadBar = (state)=> state.user.identity;
export const isLoadingUser = (state)=> state.subreddit.isLoadingUser;
export default headBarSlice.reducer;