import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const getComments = createAsyncThunk(
    "comment/getComments",
    async ({subreddit,postID}) => {
            const response = await Reddit.getComments(subreddit,postID);
            return response;
    }   
);

export const loadCommentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        isLoadingComment: false,
        failedToLoadComment: false,
    },
    extraReducers:{
        [getComments.pending]: (state,action) =>{
            state.isLoadingComment = true;
            state.failedToLoadComment = false;
        },
        [getComments.fulfilled]: (state,action) =>{
            state.comments= action.payload; 
            state.isLoadingComment = false;
            state.failedToLoadComment = false;
        },
        [getComments.failed]: (state,action) =>{
            state.isLoadingComment = false;
            state.failedToLoadComment = true;
        },
    },
});

export const selectLoadCommentSlice = (state)=> state.comment.comments;
export const isLoadingComment= (state)=> state.comment.isLoadingComment;
export default loadCommentSlice.reducer;