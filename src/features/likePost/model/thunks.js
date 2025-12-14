import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../shared/api/axios";

export const toggleLike = createAsyncThunk(
  "likePost/toggleLike",
  async ({ postId }, thunkAPI) => {
    try {
      const res = await api.post(`/posts/${postId}/like`);
      return res.data; // { liked, likesCount }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to toggle like"
      );
    }
  }
);