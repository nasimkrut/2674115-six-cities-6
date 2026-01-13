import React from 'react';
import { type ReviewType } from '../types/review';
import { MaxOfferCounter } from '../const';

type ReviewProps = ReviewType;

function Review(props: ReviewProps): JSX.Element {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar"
            src={props.user?.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {props.user?.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${Math.min(MaxOfferCounter.Rating, Math.round(props.rating)) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {props.comment}
        </p>
        <time className="reviews__time" dateTime={props.date}>{formatDate(props.date)}</time>
      </div>
    </li>
  );
}

const MemoizedReview = React.memo(Review);
MemoizedReview.displayName = 'Review';

export default MemoizedReview;
