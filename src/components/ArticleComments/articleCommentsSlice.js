import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const getComments = createAsyncThunk(
    "comment/getComments",
    async ({subreddit,postID}) => {
            const response = await Reddit.getComments(subreddit,postID);
            return response;
    }   
);
export const sendComments = createAsyncThunk(
    "comment/sendComments",
    async ({comment,postID}) => {
            const response = await Reddit.sendComments(comment,postID);
            return response;
    }   
);

export const loadCommentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        newcomment :[],
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
        [sendComments.pending]: (state,action) =>{
            state.isLoadingComment = true;
            state.failedToLoadComment = false;
        },
        [sendComments.fulfilled]: (state,action) =>{
            state.newcomment = state.comments;
            state.newcomment.push(action.payload);
            state.isLoadingComment = false;
            state.failedToLoadComment = false;
        },
        [sendComments.failed]: (state,action) =>{
            state.isLoadingComment = false;
            state.failedToLoadComment = true;
        },
    },
});

export const selectLoadCommentSlice = (state)=> state.comment.comments;
export const isLoadingComment= (state)=> state.comment.isLoadingComment;
export default loadCommentSlice.reducer;