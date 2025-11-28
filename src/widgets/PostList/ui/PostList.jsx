function PostList() {
  return (
    <div className="lg:col-span-2"> 
      <div className="space-y-4">
        <div className="p-4 post-item"> 
          <h2 className="text-xl font-semibold">Post Title 1</h2>
          <p className="text-gray-600">This is a summary of the first post.</p>
          <a className="simple-link" style={{marginTop: "10px"}} href="/post/1">Read More</a>
        </div>
        <div className="p-4 post-item">
          <h2 className="text-xl font-semibold">Post Title 2</h2>
          <p className="text-gray-600">This is a summary of the second post.</p>
          <a className="simple-link" style={{marginTop: "10px"}} href="/post/2">Read More</a>
        </div>
        <div className="p-4 post-item">
          <h2 className="text-xl font-semibold">Post Title 3</h2>
          <p className="text-gray-600">This is a summary of the third post.</p>
          <a className="simple-link" style={{marginTop: "10px"}} href="/post/3">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default PostList