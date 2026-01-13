import { createSelector } from '@reduxjs/toolkit';

import { MaxOfferCounter, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCurrentOffer = (state: State) => state[NameSpace.Offer].offer;
export const getOfferReviews = (state: State) => state[NameSpace.Offer].reviews;
export const getNearbyOffers = (state: State) => state[NameSpace.Offer].nearbyOffers;

export const selectTopNearbyOffers = createSelector(
  [getNearbyOffers],
  (nearbyOffers) => nearbyOffers.slice(0, MaxOfferCounter.Nearby)
);

export const selectMapOffers = createSelector(
  [getCurrentOffer, selectTopNearbyOffers],
  (currentOffer, topNearbyOffers) =>
    currentOffer ? [...topNearbyOffers, currentOffer] : topNearbyOffers
);

export const selectReviews = createSelector(
  [getOfferReviews],
  (reviews) => {
    const sorted = [...reviews].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sorted.slice(0, MaxOfferCounter.Reviews);
  }
);
