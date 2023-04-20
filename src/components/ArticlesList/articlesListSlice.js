import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const loadPosts = createAsyncThunk(
    "post/loadPosts ",
    async ({subredditName,type}) => {
            const response = await Reddit.getPosts(subredditName,type);
            return response;
    }   
);

export const loadMorePosts = createAsyncThunk(
    "post/loadMorePosts ",
    async ({subredditName,type,afterID}) => {
        const response = await Reddit.getPosts(subredditName,type,afterID);
        return response;
    }  
);

export const sendVotes = createAsyncThunk(
    "post/sendVotes",
    async ({id,vote}) => {
        const response = await Reddit.postVotes(id,vote);
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
        [loadPosts.failed]: (state,action) =>{
            state.isLoadingPost = false;
            state.failedToLoadPost = true;
        },
        //
        [loadMorePosts.pending]: (state,action) =>{
            state.isLoadingPost = true;
            state.failedToLoadPost = false;
        },
        [loadMorePosts.fulfilled]: (state,action) =>{
            const newArticles = action.payload;
            for (let article in newArticles) {
                state.type[newArticles[article].postID] = newArticles[article];
            }
            state.isLoadingPost = false;
            state.failedToLoadPost = false;
        },
        [loadMorePosts.failed]: (state,action) =>{
            state.isLoadingPost = false;
            state.failedToLoadPost = true;
        },
}
});

export const selectLoadArticleSlice = (state)=> state.post.type;
export const isLoadingPost= (state)=> state.post.isLoadingPost;
export default loadArticleSlice.reducer;