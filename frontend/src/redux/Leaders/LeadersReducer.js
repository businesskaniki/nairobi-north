// reducers/churchOfficials.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChurchOfficials
} from "./leaders";

const initialState = {
  churchOfficials: [],
  loading: false,
  error: null,
};

const churchOfficialsSlice = createSlice({
  name: "churchOfficials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChurchOfficials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChurchOfficials.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.churchOfficials = action.payload;
      })
      .addCase(fetchChurchOfficials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default churchOfficialsSlice.reducer;
