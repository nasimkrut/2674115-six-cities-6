import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { City } from '../../types/city';
import { CityState } from '../../types/state';
import { DEFAULT_CITY } from '../../const';

const initialState: CityState = {
  city: DEFAULT_CITY,
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    },
  },
});

export const { setCity } = citySlice.actions;

