import { createSlice } from "@reduxjs/toolkit";
import { toggleLike } from "./thunks";

const initialState = {
  status: "idle",
  error: null,
};

const likePostSlice = createSlice({
  name: "likePost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(toggleLike.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default likePostSlice.reducer;