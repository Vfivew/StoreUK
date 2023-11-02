import React, { useEffect,useState, ChangeEvent } from 'react';
import { useAppSelector,useAppDispatch } from '../../../../../../hooks/redux-hooks';
import { setNewReview, resetNewFullData } from '../../../../../../store/slice/itemSlice'; 
import { useParams } from 'react-router-dom';
import { updateReview } from '../../../../../../Service/updateReview'

const AddReviews = () => {
  const { itemId, article } = useParams();
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state) => state.user.email);
  const fullData = useAppSelector((state) => state.item.fullData);
  const selectItemData = useAppSelector((state) => state.item.selectedItem);
  const newFullData = useAppSelector((state) => state.item.newFullData);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(''); 
  const [advantages, setAdvantages] = useState('');
  const [disadvantages, setDisadvantages] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  const handleReviewTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setReviewText(newText);
    setIsButtonDisabled(newText.trim() === '' || rating === '' || reviewText.trim() === '');
  };

  const handleRatingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newRating = event.target.value; 
    setRating(newRating);
    setIsButtonDisabled(newRating === '' || reviewText.trim() === '');
  };

  const handleAdvantagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAdvantages(event.target.value);
  };

  const handleDisadvantagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDisadvantages(event.target.value);
  };

  const handleSubmit = () => {
    setReviewText('');
    setRating('');
    setAdvantages('');
    setDisadvantages('');
    if (fullData !== null && selectItemData !== null) {
      const reviewData = {
        переваги:advantages,
        недоліки:disadvantages,
        email: userEmail,
        текст: reviewText,
        рейтинг: rating,
      };
      dispatch(setNewReview({ reviewData, rating }));
    }
  };

  useEffect(() => {
    if (newFullData !== null) {
      updateReview(itemId, newFullData);
      dispatch(resetNewFullData())
    }
  }, [newFullData]);

  return (
    <section className="add-reviews-container">
      <div>
        <strong>Email:</strong> {userEmail}
      </div>
      <div className="input-field review-rating">
        <strong>Рейтинг (1-5):</strong>
        <select
          value={rating}
          onChange={handleRatingChange}
        >
          <option value="">Оберіть рейтинг</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="input-field ">
        <strong>Текст</strong>
        <textarea
          className='review-text'
          value={reviewText}
          onChange={handleReviewTextChange}
          rows={4}
          cols={50}
          placeholder="Enter your review..."
          style={{ resize: 'none' }}
        />
      </div>
      <div className="input-field">
        <strong>Переваги:</strong>
        <input
          className='review-adv'
          type="text"
          value={advantages}
          onChange={handleAdvantagesChange}
        />
      </div>
      <div className="input-field">
        <strong>Недоліки:</strong>
        <input
          className='review-dis'
          type="text"
          value={disadvantages}
          onChange={handleDisadvantagesChange}
        />
      </div>
      <button onClick={handleSubmit} disabled={isButtonDisabled}>
        Додати відгук
      </button>
    </section>
  );
};

export default AddReviews;
