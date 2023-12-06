import { createSlice } from "@reduxjs/toolkit";
import { getChurches } from "./churches";

const initialState = {
  churches: [],
  loading: false,
  error: null,
};

const churchesSlice = createSlice({
  name: "churches", 
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChurches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChurches.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.churches = action.payload;
      })
      .addCase(getChurches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});

export default churchesSlice.reducer;
