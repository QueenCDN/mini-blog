import { Link } from "react-router-dom";
import Button from '../../../shared/ui/Button/';

function PostPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Link className="simple-link" style={{marginBottom: "20px"}} to={"/"}>← Return</Link>
      <div className="post-item p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Why we love cats?</h2>
        <p className="text-gray-700 mb-6">
          Cats are wonderful companions that bring joy and comfort to our lives. Their playful nature, independent spirit, and affectionate behavior make them beloved pets around the world. Whether it's their soothing purrs or their curious antics, cats have a unique way of capturing our hearts.
          And let's not forget their ability to reduce stress and provide emotional support. Owning a cat can lead to numerous health benefits, including lower blood pressure and reduced anxiety levels.
        </p>
        <hr />
        <div className="post-meta text-sm" style={{color: "crimson", display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "10px"}}>
          <p>25 November 2025, Fonerge</p>
          <p style={{display: "flex", alignItems: "center", gap: "5px"}}>

            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
            124
          </p>
          
        </div>
      </div>
      {/* ЗАВТРА НАДО БУДЕТ НАПИСАТЬ КНОПКУ ЛАЙКА И ДОДЕЛАТЬ КОММЕНТАРИИ */}
      <div className="comments-section mt-8">
        <h3 className="text-2xl font-semibold mt-8 mb-4">Comments</h3>
        <textarea
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          rows="4"></textarea>
        <Button text="Add Comment" variant="fillBtn" style={{marginBottom: "15px", width: "100%"}} />

        <div className="comment-item p-4 bg-gray-100 rounded-lg mb-4">
          <p className="text-gray-800 mb-2">
            I absolutely love cats! They bring so much joy to my life.
          </p>
          <div className="comment-meta text-sm text-gray-600">
            Posted on 26 November, 2025 by CatLover123
          </div>
        </div>
        <div className="comment-item p-4 bg-gray-100 rounded-lg mb-4">
          <p className="text-gray-800 mb-2">
            Cats are the best pets! Their playful nature is unmatched.
          </p>
          <div className="comment-meta text-sm text-gray-600">
            Posted on 27 November, 2025 by FelineFanatic
          </div>
        </div>
      </div>
    </main>
  )
}

export default PostPage