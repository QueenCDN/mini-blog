import { Link } from "react-router-dom";

function PostCard({ post }) {
    const id = post?._id;
    const title = post?.title ?? "Untitled";
    const summary = post?.description ?? post?.summary ?? post?.content ?? "";

    return (
        <div className="p-4 post-item mb-3">
            <h2 className="text-xl font-semibold">{title}</h2>
            {summary && (
            <p className="text-gray-600">
                {summary.length > 160 ? summary.slice(0, 160) + "..." : summary}
            </p>    
            )}
            <Link className="simple-link" style={{marginTop: "10px"}} to={`/post/${id}`}>Read More</Link>
        </div>
    )
}

export default PostCard;