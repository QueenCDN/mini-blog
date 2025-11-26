import Sidebar from '../../../widgets/Sidebar/ui/Sidebar.jsx';
import PostList from '../../../widgets/PostList/ui/PostList.jsx';
import SearchBar from '../../../widgets/SearchBar.jsx/ui/SearchBar.jsx';

function HomePage() {
return (
  <main className="container mx-auto px-4 py-8">
    <SearchBar />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Sidebar /> 
      <PostList />
    </div>
  </main>
)
}

export default HomePage