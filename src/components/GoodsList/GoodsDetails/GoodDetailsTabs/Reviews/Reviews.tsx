import React from 'react';
import { useAppSelector } from '../../../../../hooks/redux-hooks';
import AddReviews from './AddReviews/AddReviews';

interface Review {
  email: string;
  текст: string;
  переваги?: string;
  недоліки?: string;
}

const Reviews = () => {
  const item = useAppSelector((state) => state.item.selectedItem);
  const userEmail = useAppSelector((state) =>state.user.email);

  if (!item) {
    return <div>Завантаження...</div>;
  }
  if (!item.відгуки) {
    return (
      <div className='review-warning'>
        Немає відгуків
        {/* {userEmail ? (
          <AddReviews />
        ) : (
          <div className='review-warning'>Please log in to leave a review.</div>
        )} */}
      </div>
    );
  }

  const firstFourReviews = item.відгуки.slice(0, 4);

  return (
    <section className='review-section'>
      <h3>Відгуки</h3>
      <ul>
        {firstFourReviews.map((review: Review, index: number) => (
          <li
            className='review' 
            key={index}>
            <p> {review.email}<br /></p>
            <p>{review.текст}<br /></p>
            {review.переваги && (
              <p>
                <strong>Переваги:</strong> {review.переваги}<br />
              </p>
            )}
            {review.недоліки && (
              <p>
                <strong>Недоліки:</strong> {review.недоліки}<br />
              </p>
            )}
          </li>
        ))}
      </ul>
      {userEmail ? (
          <AddReviews />
        ) : (
          <div className='review-warning'>Для написання відгуку авторизуйтесь.</div>
       )}
    </section>
  );
};

export default Reviews;
