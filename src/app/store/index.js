import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/model/slice";
import userReducer from "../../entities/user/model/slice";
// import postReducer from "../../entities/post/model/slice";
// import commentsReducer from "../../features/comments/model/slice";
// import createPostReducer from "../../features/createPost/model/slice";
// import likePostReducer from "../../features/likePost/model/slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        // post: postReducer,
        // createPost: createPostReducer, 
        // comments: commentsReducer,
        // likePost: likePostReducer,
    }
});