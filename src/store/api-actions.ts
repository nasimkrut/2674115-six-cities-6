import { AxiosInstance, isAxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { type AuthData } from '../types/auth-data';
import { type Offer } from '../types/offer';
import { type ReviewType } from '../types/review';
import { type UserData } from '../types/user-data';
import { type FavoriteData } from '../types/favorite-data';
import { dropToken, saveToken } from '../services/token';
import { setError } from './user/user.slice';
import { CommentData } from '../types/comment-data';

export const clearErrorAction = createAsyncThunk(
  'user/clearError',
  (_, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, string, {
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<ReviewType[], string, {
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<ReviewType[]>(`${APIRoute.Reviews}/${offerId}`);
    return data;
  }
);

export const postReviewAction = createAsyncThunk<
  void,
  { offerId: string; data: CommentData },
  {
    extra: AxiosInstance;
    rejectValue: string;
  }
>(
  'data/postReview',
  async ({ offerId, data }, { extra: api, dispatch, rejectWithValue }) => {
    try {
      await api.post(`${APIRoute.Reviews}/${offerId}`, data);
      await dispatch(fetchReviewsAction(offerId));
    } catch {
      const errorMessage = 'Failed to send review. Please try again.';

      dispatch(setError(errorMessage));
      dispatch(clearErrorAction());

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchNearbyAction = createAsyncThunk<Offer[], string, {
  extra: AxiosInstance;
}>(
  'data/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  extra: AxiosInstance;
  rejectValue: string;
}>(
  'user/checkAuth',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      return data;
    } catch (error: unknown) {
      let message = 'Ошибка авторизации';
      if (isAxiosError(error) && error.response) {
        message = (error.response.data as { message: string }).message || message;
      }
      return rejectWithValue(message);
    }
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const addFavorite = createAsyncThunk<Offer, FavoriteData, {
  extra: AxiosInstance;
}>(
  'offer/addFavorite',
  async ({ offerId, isFavorite }, { extra: api }) => {
    const status = isFavorite ? 0 : 1;
    const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    return data;
  },
);

export const fetchFavoriteOffers = createAsyncThunk<Offer[], undefined, {
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  }
);
