import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';

import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list';
import Map from '../../components/map';
import { OfferListCities } from '../../components/offer-list';
import { EmptyMainState, SortingSelector } from '../../components/main-page-components';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { type City } from '../../types/city';
import { type Offer } from '../../types/offer';
import { setCity } from '../../store/city/city.slice';
import { getCity } from '../../store/city/city.selector';
import { selectOffersByCity, selectUniqueCities } from '../../store/offers/offers.selector';
import { SortingOption } from '../../const';


function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector(getCity);

  const cityOffers = useAppSelector(selectOffersByCity);
  const offersCount = cityOffers.length;

  const cities = useAppSelector(selectUniqueCities);

  const handleCityChange = useCallback((city: City) => {
    dispatch(setCity(city));
  }, [dispatch]);

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const handleListItemHover = useCallback((offerId: string) => {
    const currentOffer = cityOffers.find((offer) => offer.id.toString() === offerId);
    setSelectedOffer(currentOffer);
  }, [cityOffers]);

  const [sortType, setSortType] = useState<SortingOption>(SortingOption.Popular);

  const sortedOffers = useMemo(() => {
    const copiedOffersList = [...cityOffers];

    switch (sortType) {
      case SortingOption.PriceLowToHigh:
        return copiedOffersList.sort((a, b) => a.price - b.price);
      case SortingOption.PriceHighToLow:
        return copiedOffersList.sort((a, b) => b.price - a.price);
      case SortingOption.TopRatedFirst:
        return copiedOffersList.sort((a, b) => b.rating - a.rating);
      default:
        return [...cityOffers];
    }
  }, [cityOffers, sortType]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{`6 cities — ${currentCity.name}`}</title>
      </Helmet>

      <Header />

      <main
        className={classNames('page__main', 'page__main--index', {
          'page__main--index-empty': offersCount === 0,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          cities={cities}
          currentCity={currentCity}
          onCityChange={handleCityChange}
        />

        {offersCount === 0 ? (
          <EmptyMainState city={currentCity.name} />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersCount} places to stay in {currentCity.name}</b>

                <SortingSelector currentSorting={sortType} onSortingChange={setSortType} />

                <OfferListCities
                  offers={sortedOffers}
                  onListItemHover={handleListItemHover}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map" style={{ background: 'none' }}>
                  <Map city={currentCity} offers={sortedOffers} selectedPoint={selectedOffer} />
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainPage;
