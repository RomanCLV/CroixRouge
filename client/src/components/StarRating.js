import StarRatings from 'react-star-ratings';
import { useState } from 'react';

export default function StarRating({ rating, onRatingChanged }) {

    const [rate, setRate] = useState(rating || 1);

    const handleStarClick = (newRating) => {
        setRate(newRating);
        onRatingChanged(newRating);
    };

    return (
        <StarRatings
            rating={rate}
            starRatedColor="gold"
            starHoverColor="gold"
            changeRating={handleStarClick} // Utilise handleStarClick pour mettre à jour la valeur
            numberOfStars={5}
            starDimension="25px"
            starSpacing="1px"
        />
    );
}