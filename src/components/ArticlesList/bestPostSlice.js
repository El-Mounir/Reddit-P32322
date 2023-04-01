import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const loadBestPosts = createAsyncThunk(
    "best/loadBestPosts ",
async () => {
        const response = await Reddit.getBestPosts()
        return response;
    }
    
);

export const loadBestPostSlice = createSlice({
    name: "best",
    initialState: {},
    extraReducers:{
        [loadBestPosts.fulfilled]: (state,action) =>{
            const articles = action.payload;
            for (let article in articles) {
                console.log(articles[article]);
                state[articles[article].postID] = articles[article];
            }
        },
    }
});

export const selectloadBestPostSlice = (state)=> state.best;
export default loadBestPostSlice.reducer;