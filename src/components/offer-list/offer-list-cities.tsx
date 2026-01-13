import React from 'react';
import { type Offer } from '../../types/offer';
import OfferList from './offer-list-base';

type OfferListCitiesProps = {
  offers: Offer[];
  onListItemHover?: (offerId: string) => void;
};

function OfferListCities({ offers, onListItemHover }: OfferListCitiesProps): JSX.Element {
  return (
    <OfferList
      offers={offers}
      className={'cities'}
      tabsContent
      onListItemHover={onListItemHover}
    />
  );
}

const MemoizedOfferListCities = React.memo(OfferListCities);
MemoizedOfferListCities.displayName = 'OfferListCities';

export default MemoizedOfferListCities;
