import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const loadSearchResultByName = createAsyncThunk(
    "search/loadSearchResultByName",
async (searchTerm) => {
        const response = await Reddit.getSubreddits(searchTerm)
        return response;
    }
);
export const loadMoreSearchResult = createAsyncThunk(
    "search/loadMoreSearchResult",
async ({searchTerm,afterID}) => {
        const response = await Reddit.getSubreddits(searchTerm,afterID)
        return response;
    }
);

export const searchResultSlice = createSlice({
    name: "search",
    initialState: {
        result: [],
        isLoadingResult: false,
        failedToLoadResult: false,
    },
    extraReducers:{
        [loadSearchResultByName.pending]: (state,action) =>{
            state.isLoadingResult = true;
            state.failedToLoadResult = false;
        },
        [loadSearchResultByName.fulfilled]: (state,action) =>{
            state.result = action.payload;
            state.isLoadingResult = false;
            state.failedToLoadResult = false;
        },
        [loadSearchResultByName.failed]: (state,action) =>{
            state.isLoadingResult = false;
            state.failedToLoadResult = true;
        },
        [loadMoreSearchResult.pending]: (state,action) =>{
            state.isLoadingResult = true;
            state.failedToLoadResult = false;
        },
        [loadMoreSearchResult.fulfilled]: (state,action) =>{
            const newResults = action.payload;
            for (let subreddit in newResults) {
                state.result.push(newResults[subreddit]);
            }
            state.isLoadingResult = false;
            state.failedToLoadResult = false;
        },
        [loadMoreSearchResult.failed]: (state,action) =>{
            state.isLoadingResult = false;
            state.failedToLoadResult = true;
        },
    }           
});

export const selectSearchResult = (state)=> state.search.result;
export const isLoadingResult = (state)=> state.search.isLoadingResult;
export default searchResultSlice.reducer;
