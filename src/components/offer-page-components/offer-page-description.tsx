import React from 'react';

import { type Offer } from '../../types/offer';
import OfferBookmarkButton from './offer-page-bookmark-button';
import OfferFeatures from './offer-page-features';
import { MaxOfferCounter } from '../../const';

type OfferDescriptionProps = {
  offer: Offer;
};

function OfferDescription({ offer }: OfferDescriptionProps): JSX.Element {
  return (
    <>
      {offer.isPremium && (
        <div className='offer__mark'>
          <span>Premium</span>
        </div>
      )}
      <div className='offer__name-wrapper'>
        <h1 className='offer__name'>
          {offer.title}
        </h1>

        <OfferBookmarkButton offerId={offer.id} isFavorite={offer.isFavorite} />

      </div>
      <div className='offer__rating rating'>
        <div className='offer__stars rating__stars'>
          <span style={{ width: `${Math.min(MaxOfferCounter.Rating, Math.round(offer.rating)) * 20}%` }}></span>
          <span className='visually-hidden'>Rating</span>
        </div>
        <span className='offer__rating-value rating__value'>{offer.rating}</span>
      </div>

      <OfferFeatures
        type={offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
        bedrooms={offer.bedrooms}
        maxAdults={offer.maxAdults}
      />

      <div className='offer__price'>
        <b className='offer__price-value'>&euro;{offer.price}</b>
        <span className='offer__price-text'>&nbsp;night</span>
      </div>
      <div className='offer__inside'>
        <h2 className='offer__inside-title'>What&apos;s inside</h2>
        <ul className='offer__inside-list'>
          {offer.goods.map((benefit) => (
            <li className='offer__inside-item' key={benefit}>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <div className='offer__host'>
        <h2 className='offer__host-title'>Meet the host</h2>
        <div className='offer__host-user user'>
          <div className='offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper'>
            <img className='offer__avatar user__avatar' src={offer.host.avatarUrl} width='74' height='74' alt='Host avatar' />
          </div>
          <span className='offer__user-name'>
            {offer.host.name}
          </span>
          {offer.host.isPro && (
            <span className='offer__user-status'>
              Pro
            </span>
          )}
        </div>
        <div className='offer__description'>
          <p className='offer__text'>
            {offer.description}
          </p>
        </div>
      </div>
    </>
  );
}

const MemoizedOfferDescription = React.memo(OfferDescription);
MemoizedOfferDescription.displayName = 'OfferDescription';

export default MemoizedOfferDescription;
