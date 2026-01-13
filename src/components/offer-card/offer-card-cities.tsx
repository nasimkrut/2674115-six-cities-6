import React from 'react';
import { MouseEvent } from 'react';

import { type Offer } from '../../types/offer.ts';
import OfferCard from './offer-card-base.tsx';

type OfferCardCitiesProps = {
  offer: Offer;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
};

function OfferCardCities({ offer, onMouseEnter }: OfferCardCitiesProps) {
  return (
    <OfferCard
      className={'cities'}
      onMouseEnter={onMouseEnter}
      offer={offer}
    />
  );
}

const MemoizedOfferCardCities = React.memo(OfferCardCities);
MemoizedOfferCardCities.displayName = 'OfferCardCities';

export default MemoizedOfferCardCities;
