import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        value: []
    },
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;
            const match = state.value.find(x => x ? x.id === product.id : true);
            if (!match) {
                state.value.push(product);
            }
        },
        deleteProduct: (state, action) => {
            let newItems;
            if (action.payload) {
                newItems = state.value.filter(x => x ? x.id !== action.payload.id : true);
            }
            else {
                newItems = state.value.filter(x => x !== null);
            }
            // clearProducts
            while (state.value.length > 0) {
                state.value.pop();
            }
            for (let i = 0; i < newItems.length; i++) {
                state.value.push(newItems[i]);
            }
        },
        deleteProductIndex: (state, action) => {
            const newItems = state.value.filter((x, index) => index !== action.payload);
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
    return selectProducts(state).length !== 0;
};

export const {
    addProduct,
    deleteProduct,
    deleteProductIndex,
    clearProducts
} = productsSlice.actions;

export default productsSlice.reducer;
