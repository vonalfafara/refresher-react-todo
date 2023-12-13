import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import Layout from "./layout/Layout";
import Profile from "./views/Profile/Profile";
import Todos from "./views/Todos/Todos";

export const appRoutes = [
  {
    path: "/",
    element: <Todos />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/*",
    element: <Layout />,
  },
];

export default routes;
