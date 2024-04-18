import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        text: "",
        categories: [],
        genders: [],
        sizes: [],
        vestingState: 1,
        minimumPrice: 0,
        maximumPrice: 10000
    },
    reducers: {
        setSearch: (state, action) => {
            const newState = action.payload;
            state.text = newState.text || "";
            state.categories = newState.categories || [];
            state.genders = newState.genders || [];
            state.sizes = newState.sizes || [];
            state.vestingState = newState.vestingState || 1;
            state.minimumPrice = newState.minimumPrice || 0;
            state.maximumPrice = newState.maximumPrice || 10000;
        },
        setSearchText: (state, action) => {
            state.text = action.payload;
        },
        setSearchCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSearchGenders: (state, action) => {
            state.genders = action.payload;
        },
        setSearchSizes: (state, action) => {
            state.sizes = action.payload;
        },
        setSearchVestingState: (state, action) => {
            state.vestingState = action.payload;
        },
        setSearchMinimumPrice: (state, action) => {
            state.minimumPrice = action.payload;
        },
        setSearchMaximumPrice: (state, action) => {
            state.maximumPrice = action.payload;
        },
        clearSearch: (state) => {
            state.text = "";
            state.categories = [];
            state.genders = [];
            state.sizes = [];
            state.vestingState = 1;
            state.minimumPrice = 0;
            state.maximumPrice = 10000;
        }
    }
});

export const selectSearch = (state) => state.search;
export const selectSearchText = (state) => selectSearch(state).text;
export const selectSearchCategories = (state) => selectSearch(state).categories;
export const selectSearchGenders = (state) => selectSearch(state).genders;
export const selectSearchSizes = (state) => selectSearch(state).sizes;
export const selectSearchVestingState = (state) => selectSearch(state).vestingState;
export const selectSearchMinimumPrice = (state) => selectSearch(state).minimumPrice;
export const selectSearchMaximumPrice = (state) => selectSearch(state).maximumPrice;


export const {
    setSearch,
    setSearchText,
    setSearchCategories,
    setSearchGenders,
    setSearchSizes,
    setSearchVestingState,
    setSearchMinimumPrice,
    setSearchMaximumPrice,
    clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
