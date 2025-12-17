import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../shared/api/axios";

import { toggleLike } from "../../../features/likePost/model/thunks";
import { addComment, deleteComment } from "../../../features/comments/model/thunks";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params = {}, thunkAPI) => {
    try {
      const response = await api.get("/posts", {
        params: {
          category: params.category || undefined,
          search: params.search || undefined,
          limit: params.limit ?? 20,
          cursor: params.cursor || undefined,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to load posts"
      );
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/posts/my");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to load posts"
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, thunkAPI) => {
    try {
      await api.delete(`/posts/${postId}`);
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to delete the post"
      );
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId, thunkAPI) => {
    try {
      const response = await api.get(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to load post"
      );
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  nextCursor: null,

  // состояние страницы поста
  current: null,
  currentStatus: "idle",
  currentError: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearCurrentPost(state) {
      state.current = null;
      state.currentStatus = "idle";
      state.currentError = null;
    },
  },
  extraReducers: (builder) => {
    // лента
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      const payload = action.payload;
      state.items = Array.isArray(payload) ? payload : payload?.posts ?? [];
      state.nextCursor = Array.isArray(payload) ? null : payload?.nextCursor ?? null;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // профиль
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

    // удалить пост
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.items = state.items.filter((p) => p._id !== action.payload);
    });

    // страница поста
    builder.addCase(fetchPostById.pending, (state) => {
      state.currentStatus = "loading";
      state.currentError = null;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.currentStatus = "succeeded";
      state.current = action.payload;
    });
    builder.addCase(fetchPostById.rejected, (state, action) => {
      state.currentStatus = "failed";
      state.currentError = action.payload;
    });

    // лайк
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      const { postId, userId } = action.meta?.arg || {};
      if (!postId) return;

      const payload = action.payload || {};
      const serverLiked = payload.liked;       // может быть undefined
      const serverLikesCount = payload.likesCount;

      const pid = String(postId);
      const uid = userId ? String(userId) : null;

      const extractLikeUserId = (l) => {
        const id =
          typeof l === "string"
            ? l
            : l?._id || l?.id || l?.userId || l?.user?._id || l?.user?.id;
        return id == null ? null : String(id);
      };

      const computeLikedFromPost = (p) => {
        if (!uid || !Array.isArray(p?.likes)) return false;
        return p.likes.some((l) => extractLikeUserId(l) === uid);
      };

      const applyToPost = (p) => {
        if (!p || String(p._id) !== pid) return;

        const prevLiked =
          typeof p.isLiked === "boolean" ? p.isLiked : computeLikedFromPost(p);

        const nextLiked =
          typeof serverLiked === "boolean" ? serverLiked : !prevLiked;

        p.isLiked = nextLiked;

        if (typeof serverLikesCount === "number") {
          p.likesCount = serverLikesCount;
        } else if (typeof p.likesCount === "number") {
          p.likesCount = Math.max(0, p.likesCount + (nextLiked ? 1 : -1));
        }

        // если likes массив есть, поддержим его
        if (uid && Array.isArray(p.likes)) {
          const has = p.likes.some((l) => extractLikeUserId(l) === uid);
          if (nextLiked && !has) p.likes.push(userId);
          if (!nextLiked && has) {
            p.likes = p.likes.filter((l) => extractLikeUserId(l) !== uid);
          }
        }
      };

      applyToPost(state.current);
      state.items.forEach(applyToPost);
    });


    // комменты
    builder.addCase(addComment.fulfilled, (state, action) => {
      const { postId } = action.meta.arg || {};
      if (!state.current || state.current._id !== postId) return;

      if (!Array.isArray(state.current.comments)) state.current.comments = [];
      state.current.comments.push(action.payload);
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const { postId, commentId } = action.meta.arg || {};
      if (!state.current || state.current._id !== postId) return;

      if (Array.isArray(state.current.comments)) {
        state.current.comments = state.current.comments.filter(
          (c) => String(c._id) !== String(commentId)
        );
      }
    });
  },
});

export const { clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;