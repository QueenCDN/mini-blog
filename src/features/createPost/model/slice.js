import { createSlice } from "@reduxjs/toolkit";
import { createPost } from "./thunks.js";

const initialState = {
    status: "idle",
    error: null,
    createdPost: null, 
}

export const createPostSlice = createSlice({
    name: "createPost",
    initialState,
    reducers: {
        resetCreateState(state) {
            state.status = "idle";
            state.error = null;
            state.createdPost = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.pending, (state) => {
            state.status = "loading";
            state.error = null; 
        });
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.createdPost = action.payload;
        });
        builder.addCase(createPost.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    }
});

export const { resetCreateState } = createPostSlice.actions;
export default createPostSlice.reducer;