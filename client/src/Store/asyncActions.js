import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../Api";

export const getCategories = createAsyncThunk(
  " app/categories",
  async (data, { rejectWithValue }) => {
    const response = await api.apiGetCategories(data);
    console.log(response);
    if (!response.success) return rejectWithValue(response);
    return response.productCategories;
  }
);
