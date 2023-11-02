import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const RatingStars = ({ rating }: { rating: number[] | null }) => {
  const maxStars = 5;

const averageRating =
  rating && rating.length > 0
    ? rating.map(Number).reduce((sum, value) => sum + value, 0) / rating.length
    : 0;
  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    if (i < averageRating) {
      stars.push(
        <FontAwesomeIcon key={i} icon={solidStar} style={{ color: 'gold' }} />
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={regularStar} style={{ color: 'gray' }} />
      );
    }
  }
  return (
    <div>
      {stars}
    </div>
  );
};

export default RatingStars;
