// reducers/sermons.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchSermons } from "./sermons";

const initialState = {
  sermons: [],
  loading: false,
  error: null,
};

const sermonsSlice = createSlice({
  name: "sermons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSermons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSermons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.sermons = action.payload;
      })
      .addCase(fetchSermons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default sermonsSlice.reducer;
