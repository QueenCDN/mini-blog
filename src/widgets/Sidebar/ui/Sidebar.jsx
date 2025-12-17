const category = [
  { value: "Travel", label: "Travel 🌎" },
  { value: "Pets", label: "Pets 🐶" },
  { value: "DIY", label: "DIY 🔨" },
  { value: "Science", label: "Science 🛸" },
  { value: "Technology", label: "Technology 🚀" },
  { value: "Other", label: "Other" },
];

function Sidebar({ activeCategory, onSelectCategory }) {
  return (
    <div className="lg:col-span-1 category-sidebar self-start">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="list-disc list-inside">
          <li
          className={`category-link ${
              activeCategory === "" ? "active" : ""
            }`}
          onClick={() => onSelectCategory("")}  
          > 
          #All
          </li>
          {category.map((cat, i) => (
            <li
            key={cat.value}
            className={`category-link ${
              activeCategory === cat.value ? "active" : ""
            }`}
            onClick={()=> onSelectCategory(cat.value)}
            >
            #{cat.label}
            </li>
          ))}
        </ul>
      </div>
    </div> 
  )
}

export default Sidebar