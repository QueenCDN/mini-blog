// const category = ["Travel 🌎", "Pets 🐶", "DIY 🔨", "Science 🛸", "Technology 🚀"];
const category = ["Travel", "Pets", "DIY", "Science", "Technology"];

function Sidebar({ onSelectCategory }) {
  return (
    <div className="lg:col-span-1 category-sidebar self-start">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="list-disc list-inside">
          <li className="category-link">
            <button
              type="button"
              onClick={() => onSelectCategory("")}
            >
              #All
            </button>
          </li>
          {category.map((cat) => (
            <li className="category-link">
              <button 
              type="button"
              onClick={()=> onSelectCategory(cat)}
              >#{cat}</button>
            </li>
          ))}
        </ul>
      </div>
    </div> 
  )
}

export default Sidebar