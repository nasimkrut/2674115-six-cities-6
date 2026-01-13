import React from 'react';
import { type Offer } from '../../types/offer';
import OfferList from './offer-list-base';

type OfferListNearPlacesProps = {
  offers: Offer[];
  onListItemHover?: (offerId: string) => void;
};

function OfferListNearPlaces({ offers, onListItemHover }: OfferListNearPlacesProps): JSX.Element {
  return (
    <OfferList
      offers={offers}
      className={'near-places'}
      tabsContent={false}
      onListItemHover={onListItemHover}
    />
  );
}

const MemoizedOfferListNearPlaces = React.memo(OfferListNearPlaces);
MemoizedOfferListNearPlaces.displayName = 'OfferListNearPlaces';

export default MemoizedOfferListNearPlaces;
