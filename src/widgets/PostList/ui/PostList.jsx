function PostList() {
  return (
    <div className="lg:col-span-2"> 
      <div className="space-y-4">
        <div className="p-4 post-item"> 
          <h2 className="text-xl font-semibold">Post Title 1</h2>
          <p className="text-gray-600">This is a summary of the first post.</p>
        </div>
        <div className="p-4 post-item">
          <h2 className="text-xl font-semibold">Post Title 2</h2>

          <p className="text-gray-600">This is a summary of the second post.</p>
        </div>
        <div className="p-4 post-item">
          <h2 className="text-xl font-semibold">Post Title 3</h2>
          <p className="text-gray-600">This is a summary of the third post.</p>
        </div>
      </div>
    </div>
  )
}

export default PostList