import { createSlice } from "@reduxjs/toolkit";
import { getchurch } from "./churches";

const initialState = {
  church: [],
  loading: false,
  error: null,
};

const churchSlice = createSlice({
  name: "church", 
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getchurch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getchurch.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.church = action.payload;
      })
      .addCase(getchurch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});

export default churchSlice.reducer;
