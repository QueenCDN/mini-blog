import { useDispatch } from "react-redux";
import { deleteComment } from "../model/thunks";
import { formatDate } from "../../../shared/lib/formatDate";

function CommentList({ comments = [], postId, currentUserId, postAuthorId }) {
  const dispatch = useDispatch();

  if (!comments.length) {
    return <p className="text-gray-500 mb-4">No comments yet...</p>;
  }

  const canDelete = (commentUserId) =>
    currentUserId &&
    (String(commentUserId) === String(currentUserId) ||
      String(postAuthorId) === String(currentUserId));

  return (
    <div className="space-y-3">
      {comments.map((c) => (
        <div key={c._id} className="comment-item p-4 bg-gray-100 rounded-lg mb-3">
          <p className="text-gray-800 mb-2">{c.text}</p>

          <div className="text-sm text-gray-600 flex justify-between items-center gap-2">
            <span>
              {c.createdAt ? formatDate(c.createdAt) : "Just now"} by{" "}
              <b>{c.username || "Unknown"}</b>
            </span>

            {canDelete(c.userId) && (
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() =>
                  dispatch(deleteComment({ postId, commentId: c._id }))
                }
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;