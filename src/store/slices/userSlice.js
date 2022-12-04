import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = null;
        }
    }
});

export const selectUser = (state) => state.user;

export const isConnected = (state) => {
    return selectUser(state) != null;
}

export const {
    setUser,
    logout,
} = userSlice.actions;

export default userSlice.reducer;
