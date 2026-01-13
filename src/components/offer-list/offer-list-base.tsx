import React, { useMemo } from 'react';
import { MouseEvent, useCallback } from 'react';
import classNames from 'classnames';

import { type Offer } from '../../types/offer';
import { OfferCard, OfferCardCities, OfferCardNearPlaces } from '../offer-card';

type OfferListProps = {
  offers: Offer[];
  onListItemHover?: (offerId: string) => void;
  className: string;
  tabsContent: boolean;
};

const getComponentByType = (className: string, offer: Offer, onMouseEnter: (event: MouseEvent<HTMLElement>) => void) => {
  switch (className) {
    case 'cities':
      return (
        <OfferCardCities
          offer={offer}
          onMouseEnter={onMouseEnter}
        />
      );
    case 'near-places':
      return (
        <OfferCardNearPlaces
          offer={offer}
          onMouseEnter={onMouseEnter}
        />
      );
  }

  return <OfferCard offer={offer} />;
};

function OfferList({ offers, onListItemHover, className, tabsContent, }: OfferListProps): JSX.Element {
  const handleListItemHover = useCallback((event: MouseEvent<HTMLElement>) => {
    if (!onListItemHover) {
      return;
    }

    event.preventDefault();
    const offerId = event.currentTarget.id;
    if (offerId) {
      onListItemHover(offerId);
    }
  }, [onListItemHover]);

  const renderedOffers = useMemo(
    () => offers.map((offer) => (
      <div key={offer.id}>{getComponentByType(className, offer, handleListItemHover)}</div>
    )),
    [offers, className, handleListItemHover]
  );

  return (
    <div
      className={classNames(
        'places__list',
        {
          'near-places__list': className === 'near-places',
          [`${className}__places-list`]: className !== 'near-places',
          'tabs__content': tabsContent && className !== 'near-places'
        }
      )}
    >
      {renderedOffers}
    </div>
  );
}

const MemoizedOfferList = React.memo(OfferList);
MemoizedOfferList.displayName = 'OfferList';

export default MemoizedOfferList;
