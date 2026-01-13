import React, { useCallback } from 'react';
import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { AppRoute, AuthorizationStatus, getOfferRoute, MaxOfferCounter } from '../../const';
import { type Offer } from '../../types/offer';
import { addFavorite } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getAuthorizationStatus } from '../../store/user/user.selector';
import { useAppSelector } from '../../hooks/use-app-selector';

type OfferCardProps = {
  offer: Offer;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
};

function OfferCard({ offer, onMouseEnter, className, }: OfferCardProps): JSX.Element {
  const offerRoute = getOfferRoute(offer.id);
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const handleFavoriteClick = useCallback(() => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      dispatch(addFavorite({ offerId: offer.id, isFavorite: offer.isFavorite }));
    }
  }, [dispatch, offer.isFavorite, offer.id, authStatus, navigate]);
  return (
    <article
      id={offer.id.toString()}
      className={`${className}__card place-card`}
      onMouseEnter={onMouseEnter}
    >
      {offer.isPremium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}

      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerRoute}>
          <img className='place-card__image' src={offer?.previewImage} width='260' height='200' alt='Place image' />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            {' '}
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className={classNames(
              'place-card__bookmark-button',
              { 'place-card__bookmark-button--active': offer.isFavorite },
              'button')}
            type='button'
            onClick={handleFavoriteClick}
          >
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${Math.min(MaxOfferCounter.Rating, Math.round(offer.rating)) * 20}%` }}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={offerRoute}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</p>
      </div>
    </article>
  );
}

const MemoizedOfferCard = React.memo(OfferCard);
MemoizedOfferCard.displayName = 'OfferCard';

export default MemoizedOfferCard;

