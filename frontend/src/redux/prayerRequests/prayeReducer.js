// reducers/prayerRequests.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPrayerRequests,
} from './prayers';

const initialState = {
  prayerRequests: [],
  loading: false,
  error: null,
};

const prayerRequestsSlice = createSlice({
  name: 'prayerRequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrayerRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrayerRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.prayerRequests = action.payload;
      })
      .addCase(fetchPrayerRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default prayerRequestsSlice.reducer;
