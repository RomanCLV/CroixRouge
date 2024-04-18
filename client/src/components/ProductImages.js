import React from "react";
import "../styles/Product.css";
import {
    UncontrolledCarousel,
} from "reactstrap";

const ProductImages = (props) => {

    const images = props.images;

    return <UncontrolledCarousel
        dark
        items={images.map((image, index) => {
            return {
                altText: "",
                caption: "",
                key: index,
                src: image
            };
        })}
    />
}


export default ProductImages;
