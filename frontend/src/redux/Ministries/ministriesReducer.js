// reducers/ministries.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchMinistries } from "./ministries";

const initialState = {
  ministries: [],
  loading: false,
  error: null,
};

const ministriesSlice = createSlice({
  name: "ministries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMinistries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMinistries.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ministries = action.payload;
      })
      .addCase(fetchMinistries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default ministriesSlice.reducer;
