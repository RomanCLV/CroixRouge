import { createSlice } from '@reduxjs/toolkit';

export const commandSlice = createSlice({
    name: 'command',
    initialState: {
        value: null
    },
    reducers: {
        setCommand: (state, action) => {
            state.value = action.payload;
        },
        clearCommand: (state) => {
            state.value = null;
        }
    }
});

export const selectCommand = (state) => state.command.value;

export const {
    setCommand,
    clearCommand,
} = commandSlice.actions;

export default commandSlice.reducer;
