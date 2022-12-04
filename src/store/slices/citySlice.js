import { createSlice } from '@reduxjs/toolkit';

export const citySlice = createSlice({
    name: 'city',
    initialState: {
        value: null
    },
    reducers: {
        setCity: (state, action) => {
            state.value = action.payload;
        },
        clearCity: (state) => {
            state.value = null;
        }
    }
});

export const selectCity = (state) => state.city.value;

export const isCitySelected = (state) => {
    return selectCity(state) != null;
};

export const {
    setCity,
    clearCity,
} = citySlice.actions;

export default citySlice.reducer;
