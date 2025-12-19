import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPostById } from "../../../entities/post/model/slice";
import {
  selectCurrentPost,
  selectCurrentPostError,
  selectCurrentPostStatus,
} from "../../../entities/post/model/selectors";

import {
  selectIsAuth,
  selectAuthUser,
} from "../../../features/auth/model/selectors";

import { toggleLike } from "../../../features/likePost/model/thunks";

import CommentForm from "../../../features/comments/ui/CommentForm";
import CommentList from "../../../features/comments/ui/CommentList";

import { formatDate } from "../../../shared/lib/formatDate";

function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const post = useSelector(selectCurrentPost);
  const status = useSelector(selectCurrentPostStatus);
  const error = useSelector(selectCurrentPostError);

  const isAuth = useSelector(selectIsAuth);
  const authUser = useSelector(selectAuthUser);

  const currentUserId =
    authUser?._id || authUser?.id || authUser?.user?._id || authUser?.user?.id;

  useEffect(() => {
    if (id) dispatch(fetchPostById(id));
  }, [dispatch, id]);

  if (status === "loading") return <p className="text-center mt-10">Loading post...</p>;
  if (status === "failed") return <p className="text-center mt-10 text-red-500">{error || "Failed to load post."}</p>;
  if (!post) return <p className="text-center mt-10">Post not found.</p>;

  const likesCount = post.likesCount ?? (Array.isArray(post.likes) ? post.likes.length : 0);
  const likesArray = Array.isArray(post.likes) ? post.likes : [];

  const isLikedByArray =
    Boolean(currentUserId) &&
    likesArray.some((l) => {
      const likedId =
        typeof l === "string"
          ? l
          : l?._id || l?.id || l?.userId || l?.user?._id || l?.user?.id;
      return String(likedId) === String(currentUserId);
    });

  const isLikedUI = typeof post.isLiked === "boolean" ? post.isLiked : isLikedByArray;

  const onLikeClick = () => {
    if (!isAuth) return;
    dispatch(toggleLike({ postId: post._id, userId: currentUserId }))
      .unwrap()
      .catch((e) => console.error("Like toggle failed:", e));
  };

  const authorLabel =
    post.authorUsername ||
    post.author?.username ||
    (typeof post.author === "string" ? post.author : "Unknown");

  return (
    <main className="container mx-auto px-4 py-8">
      <Link className="simple-link" style={{ marginBottom: "20px" }} to="/">
        ⬅ Return
      </Link>

      <div className="post-item p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">{post.title}</h2>

        <p className="text-gray-700 mb-6 whitespace-pre-wrap">
          {post.description || "No description..."}
        </p>

        <hr />

        <div
          className="post-meta text-sm"
          style={{
            color: "crimson",
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          <p>
            {post.createdAt ? formatDate(post.createdAt) : "Unknown date"},{" "}
            {authorLabel}
          </p>

          <button
            onClick={onLikeClick}
            disabled={!isAuth}
            title={!isAuth ? "Login to like" : "Like"}
            className={`flex items-center gap-2 ${!isAuth ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="crimson"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
                style={{ fill: isLikedUI ? "crimson" : "none" }}
              />
            </svg>
            {likesCount}
          </button>
        </div>
      </div>

      <div className="comments-section mt-8">
        <h3 className="text-2xl font-semibold mt-8 mb-4">Comments</h3>

        {!isAuth ? (
          <div className="post-item p-4 mb-2">
            <p className="text-gray-600">You need to log in to add comments.</p>
          </div>
        ) : (
          <CommentForm postId={post._id} />
        )}

        <div className="mt-6">
          <CommentList
            comments={post.comments || []}
            postId={post._id}
            currentUserId={currentUserId}
            postAuthorId={post.author}
          />
        </div>
      </div>
    </main>
  );
}

export default PostPage;