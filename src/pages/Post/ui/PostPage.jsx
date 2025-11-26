import { Link } from "react-router-dom";

function PostPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Link className="simple-link" to={"/"}>← Return</Link>
      <div className="post-item p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Why we love cats?</h2>
        <p className="text-gray-700 mb-6">
          Cats are wonderful companions that bring joy and comfort to our lives. Their playful nature, independent spirit, and affectionate behavior make them beloved pets around the world. Whether it's their soothing purrs or their curious antics, cats have a unique way of capturing our hearts.
          And let's not forget their ability to reduce stress and provide emotional support. Owning a cat can lead to numerous health benefits, including lower blood pressure and reduced anxiety levels.
        </p>
        <hr />
        <div className="post-meta text-sm" style={{color: "crimson"}}>
          Posted on 25 November, 2025 by Fonerge
        </div>
      </div>
    </main>
  )
}

export default PostPage