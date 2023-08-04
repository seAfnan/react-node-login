import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { NavBar } from "../components/NavBar";
import { loginKey } from "../components/NavBar";
import ErrorPage from "../components/ErrorPage";

let router;
if (loginKey == "" || loginKey == undefined || loginKey == null) {
  router = createBrowserRouter([
    {
      path: "/login",
      errorElement: <ErrorPage />,
      element: (
        <>
          <NavBar />
          <Login />
        </>
      ),
    },
    {
      path: "/register",
      errorElement: <ErrorPage />,
      element: (
        <>
          <NavBar />
          <Register />
        </>
      ),
    },
  ]);
} else {
  router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: (
        <>
          <NavBar />
          <HomePage />
        </>
      ),
    },
  ]);
}
export default router;
