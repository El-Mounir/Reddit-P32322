import { createSlice} from "@reduxjs/toolkit";
  

const loadScrollPositionSlice = createSlice({
    name: "position",
    initialState: true,
    reducers : {
        editPosition: (state,action) => {
            state = action.payload;
        }
    }
});

export const {editPosition} = loadScrollPositionSlice.actions;
export const selectLoadScrollPosition = (state) => state.position;
export default loadScrollPositionSlice.reducer;