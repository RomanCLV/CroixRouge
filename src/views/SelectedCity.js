import React from "react";
import { useLoaderData, Navigate } from "react-router-dom";
import { setCity } from "../store/slices/citySlice";
import { useDispatch } from "react-redux";
import { ROUTES } from "../router/routes";

const SelectedCity = () => {

    const dispatch = useDispatch();
    const city = useLoaderData();

    if (city) {
        dispatch(setCity(city));
        return <Navigate to={ROUTES.root} />;
    }
    return <Navigate to={ROUTES.cities} />;
};

export default SelectedCity;