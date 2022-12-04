import React from "react";
import {useLoaderData, Navigate} from "react-router-dom";
import {setCity} from "../store/storeSlice";
import {useDispatch} from "react-redux";

const SelectedCity = () => {

    const city = useLoaderData();
    const dispatch = useDispatch();

    if (city) {
        dispatch(setCity(city));
        return <Navigate to={"/"} />;
    }

    return <Navigate to={"/cities"} />;
};

export default SelectedCity;