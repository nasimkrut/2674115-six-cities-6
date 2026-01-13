import React from 'react';
import { MouseEvent } from 'react';

import { type Offer } from '../../types/offer.ts';
import OfferCard from './offer-card-base.tsx';


type OfferCardNearPlacesProps = {
  offer: Offer;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
};

function OfferCardNearPlaces({ offer, onMouseEnter }: OfferCardNearPlacesProps) {
  return (
    <OfferCard
      className={'near-places'}
      onMouseEnter={onMouseEnter}
      offer={offer}
    />
  );
}

const MemoizedOfferCardNearPlaces = React.memo(OfferCardNearPlaces);
MemoizedOfferCardNearPlaces.displayName = 'OfferCardNearPlaces';

export default MemoizedOfferCardNearPlaces;
