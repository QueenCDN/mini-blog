import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../../entities/post/ui/PostCard";
import { fetchPosts } from "../../../entities/post/model/slice";
import { selectPostsError, selectPostsItems, selectPostsStatus } from "../../../entities/post/model/selectors.js";

function PostList({ category, search}) {
  const dispatch = useDispatch();
  const posts = useSelector(selectPostsItems);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    dispatch(fetchPosts({ category, search}));
  }, [dispatch, category, search]);

  return (
    <div className="lg:col-span-2"> 
      <div className="space-y-4">
        {status === "loading" && <p>Loading posts...</p>}
        {status === "failed" && <p className="text-red-500">{error || "Failed to load posts."}</p>}
        {status === "succeeded" && posts.length === 0 && <p>No posts yet...</p>}
        {status === "succeeded" && posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  )
}

export default PostList;