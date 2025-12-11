import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { createPost } from "../model/thunks.js"

function CreatePostForm() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.createPost.status)
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  function handleCreatePost() {
    if (!postTitle.trim()) return;
    dispatch(createPost({ title: postTitle, content: postContent }));
    setPostTitle("");
    setPostContent("");
  }
  return (
    <div className="post-item p-6 mb-3">
      <h2>Create a post</h2>
      <Input 
          type="text" 
          style={{marginBottom: "10px", width: "100%"}} 
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
      ></textarea>
      <Button 
        text="Send" 
        variant="fillBtn" 
        style={{marginBottom: "15px", width: "100%"}} 
        onClick={handleCreatePost}
      />
      {status === "loading" && <p>Sending...</p>}
      {status === "succeeded" && <p style={{color: "green"}}>Post created!</p>}
    </div>
  )
}

export default CreatePostForm;