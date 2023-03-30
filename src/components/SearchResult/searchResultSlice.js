import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const loadSearchResult = createAsyncThunk(
    "search/loadSearchResult",
async (searchTerm) => {
        const response = await Reddit.searchSubreddits(searchTerm)
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
        [loadSearchResult.pending]: (state,action) =>{
            state.isLoadingResult = true;
            state.failedToLoadResult = false;
        },
        [loadSearchResult.fulfilled]: (state,action) =>{
            state.result = action.payload;
            state.isLoadingResult = false;
            state.failedToLoadResult = false;
        },
        [loadSearchResult.failed]: (state,action) =>{
            state.isLoadingResult = false;
            state.failedToLoadResult = true;
        },
    }           
});

export const selectSearchResult = (state)=> state.search.result;
export const isLoadingResult = (state)=> state.search.isLoadingResult;
export default searchResultSlice.reducer;
