import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Reddit } from "../../app/RedditAPI";

export const loadSearchResultByName = createAsyncThunk(
    "search/loadSearchResultByName",
async (searchTerm) => {
        const response = await Reddit.searchSubredditsName(searchTerm)
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
    }           
});

export const selectSearchResult = (state)=> state.search.result;
export const isLoadingResult = (state)=> state.search.isLoadingResult;
export default searchResultSlice.reducer;
