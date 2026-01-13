import { AuthorizationStatus, NameSpace } from '../const';
import { City } from './city';
import { Offer } from './offer';
import { ReviewType } from './review';
import { UserData } from './user-data';

export type State = {
  [NameSpace.User]: UserState;
  [NameSpace.Offers]: OffersState;
  [NameSpace.Offer]: OfferState;
  [NameSpace.City]: CityState;
};

export type UserState = {
  user: UserData | null;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
};

export type CityState = {
  city: City;
};

export type OfferState = {
  offer: Offer | null;
  reviews: ReviewType[];
  nearbyOffers: Offer[];
};

export type OffersState = {
  offers: Offer[];
  isOffersDataLoading: boolean;
  favorites: Offer[];
  isFavoritesOffersDataLoading: boolean;
};
