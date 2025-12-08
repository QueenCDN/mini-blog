import { createBrowserRouter } from "react-router-dom";

import HomePage from "../../pages/Home/ui/HomePage.jsx";
import LoginPage from "../../pages/Login/ui/LoginPage.jsx";
import ProfilePage from "../../pages/Profile/ui/ProfilePage.jsx";
import PostPage from "../../pages/Post/ui/PostPage.jsx";
import NotFoundPage from "../../pages/NotFound/ui/NotFoundPage.jsx";
import App from "../../app/App.jsx";

import { ProtectedRoute } from "../lib/routing/ProtectedRoute.jsx";
import { GuestRoute } from "../lib/routing/GuestRoute.jsx";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage/>},
      {path: '/post/:id', element: <PostPage />},
      {path: '/profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute>},
      {path: '/login', element: <GuestRoute><LoginPage /></GuestRoute>},
    ]
  }
]);