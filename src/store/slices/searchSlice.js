import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        value: ""
    },
    reducers: {
        setSearch: (state, action) => {
            state.value = action.payload;
        },
        clearSearch: (state) => {
            state.value = null;
        }
    }
});

export const selectSearch = (state) => state.search.value;


export const {
    setSearch,
    clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
