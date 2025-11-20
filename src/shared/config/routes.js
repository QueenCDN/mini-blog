import HomePage from "../../pages/Home/ui/HomePage.jsx";
import LoginPage from "../../pages/Login/ui/LoginPage.jsx";
import ProfilePage from "../../pages/Profile/ui/ProfilePage.jsx";
import PostPage from "../../pages/Post/ui/PostPage.jsx";
import NotFoundPage from "../../pages/NotFound/ui/NotFoundPage.jsx";

export const appRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/post/:id",
    element: <PostPage />,
  },
  {
    path: "*",
    element: <NotFoundPage/>,
  }
];