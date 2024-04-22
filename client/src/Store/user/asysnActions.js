import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../Api";

export const getCurrent = createAsyncThunk(
  " user/current",
  async (data, { rejectWithValue }) => {
    const response = await api.apiGetCurrent();
    if (!response.success) return rejectWithValue(response);
    return response.rs;
  }
);
