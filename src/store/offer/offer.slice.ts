import { createSlice } from '@reduxjs/toolkit';

import {
  fetchOfferAction,
  fetchReviewsAction,
  fetchNearbyAction,
  addFavorite
} from '../api-actions';
import { OfferState } from '../../types/state';


const initialState: OfferState = {
  offer: null,
  reviews: [],
  nearbyOffers: [],
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }

        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
      });
  },
});


