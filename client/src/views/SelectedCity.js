import React, { useEffect } from "react";
import {useLoaderData, Navigate, useNavigate} from "react-router-dom";
import { setCity } from "../store/slices/citySlice";
import { useDispatch } from "react-redux";
import { ROUTES } from "../router/routes";
import { Spinner } from "reactstrap";

const SelectedCity = () => {

    const dispatch = useDispatch();
    const cityLoaded = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        if (cityLoaded) {
            dispatch(setCity(cityLoaded));
            setTimeout(() => {
                navigate(ROUTES.root);
            }, 50);
        }
    });

    return cityLoaded ? <Spinner /> : <Navigate to={ROUTES.cities} />;
};

export default SelectedCity;