import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../shared/api/axios";

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ title, content, category }, thunkAPI) => {
    try {
      const response = await api.post("/posts", {
        title,
        description: content,
        category: category || "Other",
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to create post"
      );
    }
  }
);
