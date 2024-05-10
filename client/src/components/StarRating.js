import StarRatings from 'react-star-ratings';
import { useState } from 'react';

export default function StarRating({ rating }) {

    const [rate, setRate] = useState(rating || 1);

    return (
        <StarRatings
            rating={rate}
            starRatedColor="gold"
            starHoverColor="gold"
            changeRating={setRate}
            numberOfStars={5}
            starDimension="25px"
            starSpacing="1px"
        />
    );
}
