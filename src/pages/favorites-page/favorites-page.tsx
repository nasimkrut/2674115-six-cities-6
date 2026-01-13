import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { AppRoute } from '../../const';
import Header from '../../components/header/header';
import { OfferListCities } from '../../components/offer-list';
import EmptyFavoritesState from '../../components/empty-favorite-state';

import { useAppSelector } from '../../hooks/use-app-selector';
import { type Offer } from '../../types/offer';
import { getFavoritesOffers } from '../../store/offers/offers.selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchFavoriteOffers } from '../../store/api-actions';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  const favoriteOffers = useAppSelector(getFavoritesOffers);

  const offersByCity = useMemo(() => favoriteOffers.reduce<Record<string, Offer[]>>((acc, offer) => {
    if (!acc[offer.city.name]) {
      acc[offer.city.name] = [];
    }
    acc[offer.city.name].push(offer);
    return acc;
  }, {}), [favoriteOffers]);

  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities — favorites'}</title>
      </Helmet>

      <Header />

      <main
        className={classNames('page__main', 'page__main--favorites', {
          'page__main--favorites-empty': favoriteOffers.length === 0,
        })}
      >
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 ? (
            <EmptyFavoritesState />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                  <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferListCities offers={cityOffers} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}


export default FavoritesPage;
