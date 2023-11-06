// reducers/images.js
import { createSlice } from "@reduxjs/toolkit";
import { getImages } from "./images";

const initialState = {
  images: [],
  loading: false,
  error: null,
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.images = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default imagesSlice.reducer;
