import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice";
import cityReducer from "./slices/citySlice";
import productsReducer from "./slices/productsSlice";
import searchReducer from "./slices/searchSlice";
import toastReducer from "./slices/toastSlice";
import commandReducer from "./slices/commandSlice";

export default configureStore({
    reducer: {
        city: cityReducer,
        user: userReducer,
        products: productsReducer,
        search: searchReducer,
        toast: toastReducer,
        command: commandReducer
    }
});