// reducers/videos.js
import { createSlice } from "@reduxjs/toolkit";
import { getVideos } from "./videos";

const initialState = {
  videos: [],
  loading: false,
  error: null,
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.videos = action.payload;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default videosSlice.reducer;
