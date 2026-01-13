import { createSlice } from '@reduxjs/toolkit';

import { addFavorite, fetchFavoriteOffers, fetchOffersAction } from '../api-actions';
import { OffersState } from '../../types/state';

const initialState: OffersState = {
  offers: [],
  isOffersDataLoading: false,
  favorites: [],
  isFavoritesOffersDataLoading: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        if (updatedOffer.isFavorite) {
          if (!state.favorites.some((o) => o.id === updatedOffer.id)) {
            state.favorites.push(updatedOffer);
          }
        } else {
          state.favorites = state.favorites.filter(
            (o) => o.id !== updatedOffer.id
          );
        }
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoritesOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesOffersDataLoading = false;
      });
  },
});
