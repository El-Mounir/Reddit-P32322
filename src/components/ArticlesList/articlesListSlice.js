import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const loadPosts = createAsyncThunk(
    "post/loadPosts ",
async (type) => {
        const response = await Reddit.getPosts(type);
        return response;
    }
    
);
export const loadBestPostsAfter = createAsyncThunk(
    "post/loadBestPostsAfter ",
async (afterID) => {
        const response = await Reddit.getBestPostsAfter(afterID)
        return response;
    }
    
);
export const loadArticleSlice = createSlice({
    name: "post",
    initialState: {
        type: {},
        isLoadingPost: false,
        failedToLoadPost: false,
    },
    extraReducers:{
        [loadPosts.pending]: (state,action) =>{
            state.isLoadingPost = true;
            state.failedToLoadPost = false;
        },
        [loadPosts.fulfilled]: (state,action) =>{
            state.type = {};
            const articles = action.payload;
            for (let article in articles) {
                state.type[articles[article].postID] = articles[article];
            }
            state.isLoadingPost = false;
            state.failedToLoadPost = false;
        },
    },
    [loadPosts.failed]: (state,action) =>{
        state.isLoadingPost = false;
        state.failedToLoadPost = true;
    },
});

export const selectLoadArticleSlice = (state)=> state.post.type;
export const isLoadingPost= (state)=> state.search.isLoadingPost;
export default loadArticleSlice.reducer;