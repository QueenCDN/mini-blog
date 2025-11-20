import { createBrowserRouter } from "react-router-dom";

import HomePage from "../../pages/Home/ui/HomePage.jsx";
import LoginPage from "../../pages/Login/ui/LoginPage.jsx";
import ProfilePage from "../../pages/Profile/ui/ProfilePage.jsx";
import PostPage from "../../pages/Post/ui/PostPage.jsx";
import NotFoundPage from "../../pages/NotFound/ui/NotFoundPage.jsx";
import App from "../../app/App.jsx";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage/>},
      {path: '/post/:id', element: <PostPage />},
      {path: '/profile', element: <ProfilePage />},
      {path: '/login', element: <LoginPage />},
    ]
  }
]);