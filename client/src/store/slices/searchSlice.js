import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        city: "",
        text: "",
        categories: [],
        genders: [],
        sizes: [],
        state: 1,
        minimumPrice: 0,
        maximumPrice: 10000,
        limit: 20
    },
    reducers: {
        setSearch: (state, action) => {
            const newState = action.payload;
            state.city = newState.city || "";
            state.text = newState.text || "";
            state.categories = newState.categories || [];
            state.genders = newState.genders || [];
            state.sizes = newState.sizes || [];
            state.state = newState.state || 1;
            state.minimumPrice = newState.minimumPrice || 0;
            state.maximumPrice = newState.maximumPrice || 10000;
            state.limit = newState.limit || 20;
        },
        setSearchCity: (state, action) => {
            state.city = action.payload;
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
        setSearchState: (state, action) => {
            state.state = action.payload;
        },
        setSearchMinimumPrice: (state, action) => {
            state.minimumPrice = action.payload;
        },
        setSearchMaximumPrice: (state, action) => {
            state.maximumPrice = action.payload;
        },
        setSearchLimit: (state, action) => {
            state.limit = action.payload;
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
export const selectSearchCity = (state) => selectSearch(state).city;
export const selectSearchText = (state) => selectSearch(state).text;
export const selectSearchCategories = (state) => selectSearch(state).categories;
export const selectSearchGenders = (state) => selectSearch(state).genders;
export const selectSearchSizes = (state) => selectSearch(state).sizes;
export const selectSearchVestingState = (state) => selectSearch(state).vestingState;
export const selectSearchMinimumPrice = (state) => selectSearch(state).minimumPrice;
export const selectSearchMaximumPrice = (state) => selectSearch(state).maximumPrice;
export const selectSearchLimit = (state) => selectSearch(state).limit;


export const {
    setSearch,
    setSearchCity,
    setSearchText,
    setSearchCategories,
    setSearchGenders,
    setSearchSizes,
    setSearchState,
    setSearchMinimumPrice,
    setSearchMaximumPrice,
    setSearchLimit,
    clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
