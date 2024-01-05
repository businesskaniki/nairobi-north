import { createSlice } from "@reduxjs/toolkit";
import { addChurch } from "./churches";

const initialState = {
    churches: [],
    loading: false,
    error: null,
  };

const churchSlice = createSlice({
    name: 'addchurche',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(addChurch.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(addChurch.fulfilled, (state, action) => {
        state.loading = false;
        state.churches.push(action.payload);
      });
  
      builder.addCase(addChurch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add church';
      });
    },
  });
  
  export default churchSlice.reducer;