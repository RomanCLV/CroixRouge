import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        value: []
    },
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;
            const match = state.value.find(x => x.id === product.id);
            if (!match) {
                state.value.push(product);
            }
        },
        deleteProduct: (state, action) => {
            const newItems = state.value.filter(x => x.id !== action.payload.id);
            // clearProducts
            while (state.value.length > 0) {
                state.value.pop();
            }
            for (let i = 0; i < newItems.length; i++) {
                state.value.push(newItems[i]);
            }
        },
        clearProducts: (state) => {
            while (state.value.length > 0) {
                state.value.pop();
            }
        }
    }
});

export const selectProducts = (state) => state.products.value;

export const hasProducts = (state) => {
    return !selectProducts(state).isEmpty();
};

export const {
    addProduct,
    deleteProduct,
    clearProducts
} = productsSlice.actions;

export default productsSlice.reducer;
