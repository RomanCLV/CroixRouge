import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        title: "",
        message: "",
        type: null,
        buttons: []
    },
    reducers: {
        setToast: (state, action) => {
            state.message = action.payload.message || "";
            state.title = action.payload.title || "";
            state.type = action.payload.type || "";
            state.buttons = action.payload.buttons || [];
        },

        clearToast: (state) => {
            state.message = "";
            state.title = "";
            state.type = null;
            state.buttons = [];
        }
    }
});

export const selectToast = (state) => state.toast;

export const {
    setToast,
    clearToast,
} = toastSlice.actions;

export default toastSlice.reducer;
