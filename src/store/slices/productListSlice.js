import { createSlice } from '@reduxjs/toolkit';

export const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        value: []
    },
    reducers: {
        getProductById: (state, action) => state.value.find(x => x.id === action.payload),
        addProduct: (state, action) => {
            const product = action.payload;
            const match = this.getProductById(state, { payload: product.id });
            if (!match) {
                state.value.push(product);
            }
        },
        deleteProduct: (state, action) => {
            const newItems = state.value.filter(x => x.id !== action.payload.id);
            this.clearProducts();
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

export const selectProductList = (state) => state.productList.value;

export const hasProducts = (state) => {
    return !selectProductList(state).isEmpty();
};

export const {
    getProductById,
    addProduct,
    deleteProduct,
    clearProducts
} = productListSlice.actions;

export default productListSlice.reducer;
