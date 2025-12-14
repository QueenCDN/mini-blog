export const selectPostsItems = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export const selectCurrentPost = (state) => state.posts.current;
export const selectCurrentPostStatus = (state) => state.posts.currentStatus;
export const selectCurrentPostError = (state) => state.posts.currentError;
