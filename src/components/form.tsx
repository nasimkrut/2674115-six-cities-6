import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../hooks/use-app-dispatch';
import { postReviewAction } from '../store/api-actions';

function ReviewForm() {
  const dispatch = useAppDispatch();
  const { id: offerId } = useParams();

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormReady = selectedRating > 0 && reviewText.length >= 50 && reviewText.length <= 300;

  const ratingOptions = [
    { score: 5, label: 'excellent' },
    { score: 4, label: 'good' },
    { score: 3, label: 'average' },
    { score: 2, label: 'poor' },
    { score: 1, label: 'unacceptable' },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!offerId) {
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        postReviewAction({
          offerId,
          data: { rating: selectedRating, comment: reviewText },
        })
      ).unwrap();

      setSelectedRating(0);
      setReviewText('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="reviews__form form"
      method="post"
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review-content">
        Share your experience
      </label>

      <div className="reviews__rating-form form__rating">
        {ratingOptions.map(({ score, label }) => (
          <React.Fragment key={score}>
            <input
              className="form__rating-input visually-hidden"
              name="review-score"
              value={score}
              id={`rating-${score}`}
              type="radio"
              checked={selectedRating === score}
              disabled={isSubmitting}
              onChange={() => setSelectedRating(score)}
            />
            <label
              htmlFor={`rating-${score}`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review-content"
        name="review-content"
        placeholder="Describe your visit - what stood out and what could be enhanced"
        value={reviewText}
        maxLength={300}
        disabled={isSubmitting}
        onChange={(event) => {
          setReviewText(event.target.value);
        }}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          Please select a <span className="reviews__star">rating</span> and
          provide feedback of at least <b className="reviews__text-amount">50 characters</b>
          to publish your review.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormReady || isSubmitting}
        >
          {isSubmitting ? 'Publishing...' : 'Publish Review'}
        </button>
      </div>
    </form>
  );
}

const MemoizedReviewForm = React.memo(ReviewForm);
MemoizedReviewForm.displayName = 'ReviewForm';

export default MemoizedReviewForm;
