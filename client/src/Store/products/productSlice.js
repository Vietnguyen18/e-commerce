import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const productSlice = createSlice({
  name: "product",
  initialSate: {
    category: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.category = action.payload.productCategories;
    });
    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});


export default productSlice.reducer;
