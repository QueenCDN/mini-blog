import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";

import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";

import { createPost } from "../model/thunks.js";
import { fetchUserPosts } from "../../../entities/post/model/slice"; // ✅ добавили

const CATEGORIES = [
  { value: "Travel", label: "Travel 🌎" },
  { value: "Pets", label: "Pets 🐶" },
  { value: "DIY", label: "DIY 🔨" },
  { value: "Science", label: "Science 🛸" },
  { value: "Technology", label: "Technology 🚀" },
  { value: "Other", label: "Other" },
];

function CreatePostForm() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.createPost.status);

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("Other");

  const titleTrim = postTitle.trim();
  const contentTrim = postContent.trim();

  const canSubmit = useMemo(() => {
    return titleTrim.length > 0 && contentTrim.length > 0 && status !== "loading";
  }, [titleTrim, contentTrim, status]);

  const handleCreatePost = async () => {
    if (!canSubmit) return;

    try {
      await dispatch(
        createPost({
          title: titleTrim,
          description: contentTrim, // ✅ ВАЖНО: бэк ждёт description
          category: postCategory,
        })
      ).unwrap();

      // ✅ обновляем список постов пользователя без перезагрузки страницы
      dispatch(fetchUserPosts());

      // ✅ очищаем поля только после успеха
      setPostTitle("");
      setPostContent("");
      setPostCategory("Other");
    } catch (e) {
      console.error("Create post failed:", e);
    }
  };

  return (
    <div className="post-item p-6 mb-3">
      <h2>Create a post</h2>

      <Input
        type="text"
        style={{ marginBottom: "10px", width: "100%" }}
        ph="Post title"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />

      <textarea
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        rows="4"
        placeholder="Write your post content here..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />

      <select
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        value={postCategory}
        onChange={(e) => setPostCategory(e.target.value)}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <Button
        text={status === "loading" ? "Sending..." : "Send"}
        variant="fillBtn"
        style={{
          marginBottom: "15px",
          width: "100%",
          opacity: canSubmit ? 1 : 0.5,
          cursor: canSubmit ? "pointer" : "not-allowed",
        }}
        disabled={!canSubmit}
        onClick={handleCreatePost}
      />

      {status === "succeeded" && <p style={{ color: "green" }}>Post created!</p>}
    </div>
  );
}

export default CreatePostForm;
