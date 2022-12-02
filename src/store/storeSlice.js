import { createSlice } from '@reduxjs/toolkit';
import ProductListModel from "../models/productListModel";

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        city: null,
        productList: new ProductListModel(),
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
            state.productList.addProduct(newProduct);
        },
        deleteProduct: (state, productId) => {
            state.productList.deleteProduct(productId);
        },
        clearProduct: (state) => {
            state.productList.clear();
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
    return selectAccount(state) != null;
}

export const selectProductList = (state) => state.productList;

export const hasProducts = (state) => {
    return !selectProductList(state).isEmpty();
};

export const selectCity = (state) => state.city;

export const isCitySelected = (state) => {
    return selectCity(state) != null;
};

export const {
    connect,
    disconnect,
    addProduct,
    deleteProduct,
    clearProduct,
    setCity,
    clearCity
} = storeSlice.actions;

export default storeSlice.reducer;
