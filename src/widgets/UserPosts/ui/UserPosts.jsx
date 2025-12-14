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

      {postsStatus === "loading" && <p>Loading posts...</p>}

      {postsStatus === "succeeded" && posts.length === 0 && (
        <p>No posts yet...</p>
      )}

      {posts.map((post) => (
        <div
          key={post._id}
          className="flex justify-between items-center mt-3 p-2 border-b"
        >
          <Link to={`/post/${post._id}`} className="text-blue-400 hover:underline">
            {post.title}
          </Link>

          <button
            onClick={() => dispatch(deletePost(post._id))}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;