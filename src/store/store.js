import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice";
import cityReducer from "./slices/citySlice";
import productListReducer from "./slices/productListSlice";

export default configureStore({
    reducer: {
        city: cityReducer,
        user: userReducer,
        productList: productListReducer
    }
});