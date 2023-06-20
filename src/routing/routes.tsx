import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
