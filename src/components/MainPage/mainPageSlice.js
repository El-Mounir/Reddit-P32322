import {  createSlice} from "@reduxjs/toolkit";

export const mainPageSlice = createSlice({
    name: "main",
    initialState: {
        activeType: "best",
    },
    reducers:{
        switchType:(state,action)=> { 
            state.activeType= action.payload;
        }
    }
});

export const selectMainPageSlice = (state)=> state.main.activeType;
export const {switchType} =  mainPageSlice.actions;
export default mainPageSlice.reducer;