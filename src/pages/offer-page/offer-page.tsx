import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Header from '../../components/header/header';
import Form from '../../components/form';
import Map from '../../components/map';
import { OfferListNearPlaces } from '../../components/offer-list';
import ReviewsList from '../../components/reviews-list';
import { OfferImages, OfferDescription } from '../../components/offer-page-components';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchNearbyAction, fetchOfferAction, fetchReviewsAction } from '../../store/api-actions';
import { getCurrentOffer, selectMapOffers, selectReviews, selectTopNearbyOffers } from '../../store/offer/offer.selector';
import { AuthorizationStatus, DEFAULT_CITY } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import { getIsOffersDataLoading } from '../../store/offers/offers.selector';
import LoadingPage from '../loading-page/loading-page';
import { getAuthorizationStatus } from '../../store/user/user.selector';

function OfferPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchReviewsAction(id));
      dispatch(fetchNearbyAction(id));
    }
  }, [id, dispatch]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentOffer = useAppSelector(getCurrentOffer);
  const offerReviews = useAppSelector(selectReviews);
  const nearbyOffers = useAppSelector(selectTopNearbyOffers);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);

  const city = currentOffer?.city ?? DEFAULT_CITY;
  const mapOffers = useAppSelector(selectMapOffers);

  const images = currentOffer?.images ?? [];

  if (isOffersDataLoading) {
    return <LoadingPage />;
  }

  if (!currentOffer && !isOffersDataLoading) {
    return <NotFoundPage />;
  }

  return (
    <div className='page'>
      <Helmet>
        <title>{'6 cities — offer'}</title>
      </Helmet>

      <Header />

      <main className='page__main page__main--offer'>
        <section className='offer'>
          <OfferImages images={images} />
          <div className='offer__container container'>
            <div className='offer__wrapper'>
              {currentOffer && <OfferDescription offer={currentOffer} />}
              <section className='offer__reviews reviews'>
                <ReviewsList reviews={offerReviews} />
                {authorizationStatus === AuthorizationStatus.Auth && <Form />}
              </section>
            </div>
          </div>
          <section className='offer__map map' style={{ background: 'none' }}>
            <Map city={city} offers={mapOffers} selectedPoint={currentOffer ?? undefined} />
          </section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <OfferListNearPlaces offers={nearbyOffers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
