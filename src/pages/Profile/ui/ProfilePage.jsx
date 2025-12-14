import CreatePostForm from "../../../features/createPost/ui/CreatePostForm.jsx";

import ProfileCard from "../../../widgets/ProfileCard/ui/ProfileCard.jsx";
import UserPosts from "../../../widgets/UserPosts/ui/UserPosts.jsx";

function ProfilePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ProfileCard />
      <CreatePostForm />
      <UserPosts />
    </main>
  );
}

export default ProfilePage;