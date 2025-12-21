import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUserPosts, deletePost } from "../../../entities/post/model/slice";
import {
  selectPostsItems,
  selectPostsStatus,
} from "../../../entities/post/model/selectors";

function UserPosts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPostsItems);
  const postsStatus = useSelector(selectPostsStatus);

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, [dispatch]);

  return (
    <div className="post-item p-6 mb-3">
      <h2>Your posts</h2>

      {postsStatus === "loading" && <p className="mb-2 mt-2">Loading posts...</p>}

      {postsStatus === "succeeded" && posts.length === 0 && (
        <p>No posts yet...</p>
      )}

      {posts.map((post) => (
        <div
          key={post._id}
          className="user-post flex justify-between items-center"
        >
          <Link to={`/post/${post._id}`}>
            {post.title}
          </Link>

          <button
            onClick={() => dispatch(deletePost(post._id))}
            className="simple-link"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;