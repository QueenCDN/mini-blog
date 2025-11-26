function Sidebar() {
  return (
    // i need to fix height of sidebar
    <div className="lg:col-span-1 catedory-sidebar self-start">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="list-disc list-inside">
          <li className="category-link">
            <a href="/">#Travel 🌎</a>
          </li>
          <li className="category-link">
            <a href="/">#Pets 🐶</a>
          </li>
          <li className="category-link">
            <a href="/">#DIY 🔨</a> 
          </li>
          <li className="category-link">
            <a href="/">#Science 🛸</a>
          </li>
          <li className="category-link">
            <a href="/">#Technology 🚀</a>
          </li>
        </ul>
      </div>
    </div> 
  )
}

export default Sidebar