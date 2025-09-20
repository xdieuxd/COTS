import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Home from "@pages/Home";
import Search from "@pages/Search";
import BookDetail from "@pages/BookDetail";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Cart from "@pages/Cart";
import Checkout from "@pages/Checkout";
import Orders from "@pages/Orders";
import OrderDetail from "@pages/OrderDetail";
import Library from "@pages/Library";
import Profile from "@pages/Profile";
import ProtectedRoute from "@routes/ProtectedRoute";
import User from "@pages/User";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "book/:id", element: <BookDetail /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "cart", element: <Cart /> },

      {
        path: "user", element: <User />,
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <Profile /> },
          { path: "orders", element: <Orders /> },
          { path: "orders/:id", element: <OrderDetail /> },
        ]
      },
      { path: "checkout", element: <Checkout /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "library", element: <Library /> },
        ],
      },
    ],
  },
]);
