import { useState } from "react";

import Sidebar from "../../../widgets/Sidebar/ui/Sidebar.jsx";
import PostList from "../../../widgets/PostList/ui/PostList.jsx";
import SearchBar from "../../../widgets/SearchBar/ui/SearchBar.jsx";

import { useDebounce } from "../../../shared/lib/hooks/useDebounce";

function HomePage() {
  const [category, setCategory] = useState("");
  const [searchDraft, setSearchDraft] = useState("");

  const debouncedSearch = useDebounce(searchDraft, 350).trim();

  return (
    <main className="container mx-auto px-4 py-8">
      <SearchBar
        value={searchDraft}
        onChange={(value) => {
          setSearchDraft(value);
          if (value.trim() !== "") {
            setCategory("");
          }
        }}
        onClear={() => {setSearchDraft(""); setCategory("");}}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Sidebar
          activeCategory={category}
          onSelectCategory={setCategory}
        />

        <PostList category={category} search={debouncedSearch} />
      </div>
    </main>
  );
}

export default HomePage;
