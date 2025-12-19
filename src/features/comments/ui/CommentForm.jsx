import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/ui/Button";
import { addComment } from "../model/thunks";

function CommentForm({ postId }) {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.comments.status);
  const error = useSelector((s) => s.comments.error);

  const [text, setText] = useState("");

  const onSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    await dispatch(addComment({ postId, text: trimmed }));
    setText("");
  };

  return (
    <div className="post-item p-2 mt-4">
      <textarea
        className="w-full p-3 mb-2 border border-gray-300 rounded-lg"
        rows="4"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        text={status === "loading" ? "Sending..." : "Add Comment"}
        variant="fillBtn"
        style={{ marginBottom: "10px", width: "100%" }}
        onClick={onSubmit}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default CommentForm;