import { createSlice } from "@reduxjs/toolkit";
import { addComment, deleteComment } from "./thunks";

const initialState = {
  status: "idle",
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearCommentsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCommentsError } = commentsSlice.actions;
export default commentsSlice.reducer;