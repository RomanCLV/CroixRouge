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
        setUser: (state, newAccount) => {
            state.account = newAccount;
        },
        logout: (state) => {
            state.account = null;
        },

        setCity: (state, newCity) => {
            state.city = newCity;
        },
        clearCity: (state) => {
            state.city = null;
        },

        addProduct: (state, newProduct) => {
            state.productList.addProduct(newProduct);
        },
        deleteProduct: (state, productId) => {
            state.productList.deleteProduct(productId);
        },
        clearProduct: (state) => {
            state.productList.clear();
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
    setUser,
    logout,
    setCity,
    clearCity,
    addProduct,
    deleteProduct,
    clearProduct
} = storeSlice.actions;

export default storeSlice.reducer;
