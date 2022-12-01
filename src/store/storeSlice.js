import { createSlice } from '@reduxjs/toolkit';

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        city: null,
        productList: [],
        account: null
    },
    reducers: {
        connect: (state, newAccount) => {
            state.account = newAccount;
        },
        disconnect: (state) => {
            state.account = null;
        },

        addProduct: (state, newProduct) => {
            const newProductListAdd = state.productList;
            // TODO : Check if product is already in the list
            newProductListAdd.add(newProduct);

            state.productList = newProductListAdd;
        },
        removeProduct: (state, productId) => {
            const newProductListRemove = state.productList;
            // TODO : remove product
            newProductListRemove.remove(null);
            state.productList = newProductListRemove;
        },
        clearProduct: (state) => {
            state.productList = []
        },

        setCity: (state, newCity) => {
            state.city = newCity;
        },
        clearCity: (state) => {
            state.city = null;
        }
    }
});

export const selectAccount = (state) => state.account;

export const isConnected = (state) => {
    return selectAccount(state) != null
}

export const selectProductList = (state) => state.productList;

export const hasProducts = (state) => {
    return selectProductList(state).length > 0;
};

export const selectCity = (state) => state.city;

export const isCitySelected = (state) => {
    return selectCity(state) != null;
};

export const {
    connect,
    disconnect,
    addProduct,
    removeProduct,
    clearProduct,
    setCity,
    clearCity
} = storeSlice.actions;

export default storeSlice.reducer;
