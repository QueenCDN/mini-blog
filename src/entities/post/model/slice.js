import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../shared/api/axios";

export const fetchUserPosts = createAsyncThunk(
    "posts/fetchUserPosts",
    async (__, thunkAPI) => {
        try{
            const response = await api.get("/posts/my");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "failed to load posts");
        }
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (postId, thunkAPI) => {
        try{
            await api.delete(`/posts/${postId}`);
            return postId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "failed to delete the  post");
        }
    }
);

const initialState = {
    items: [],
    status: "idle",
    error: null,    
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserPosts.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        });
        builder.addCase(fetchUserPosts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });

        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.items = state.items.filter((p) => p._id !== action.payload);
        });
    }
});

export default postsSlice.reducer;