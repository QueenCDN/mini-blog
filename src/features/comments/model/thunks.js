import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../shared/api/axios";

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, text }, thunkAPI) => {
    try {
      const res = await api.post(`/posts/${postId}/comments`, { text });
      return res.data; // новый комментарий
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to add comment"
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ postId, commentId }, thunkAPI) => {
    try {
      await api.delete(`/posts/${postId}/comments/${commentId}`);
      return commentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to delete comment"
      );
    }
  }
);
