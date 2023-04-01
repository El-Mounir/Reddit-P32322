import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const loadHotPosts = createAsyncThunk(
    "hot/loadHotPosts ",
async (subreddit) => {
        const response = await Reddit.getSubredditHot(subreddit)
        return response;
    }
    
);

export const loadHotPostSlice = createSlice({
    name: "hot",
    initialState: {},
    extraReducers:{
        [loadHotPosts.fulfilled]: (state,action) =>{
            const articles = action.payload;
            for (let article in articles) {
                console.log(articles[article]);
                state[articles[article].postID] = articles[article];
            }
        },
    }
});

export const selectloadHotPostSlice = (state)=> state.hot;
export default loadHotPostSlice.reducer;