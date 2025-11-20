import { configureStore } from "@reduxjs/toolkit";

// import userReducer from "../../entities/user/model/slice";
// import postReducer from "../../entities/post/model/slice";
// import authReducer from "../../features/auth/model/slice";
// import commentsReducer from "../../features/comments/model/slice";
// import createPostReducer from "../../features/createPost/model/slice";
// import likePostReducer from "../../features/likePost/model/slice";

export const store = configureStore({
    reducer: {
        // user: userReducer,
        // post: postReducer,
        // auth: authReducer,
        // comments: commentsReducer,
        // createPost: createPostReducer, 
        // likePost: likePostReducer,
    }
});