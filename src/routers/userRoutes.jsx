import UserLayout from "../layouts/app-layouts/user-layouts";
import Home from "../pages/app-pages/user-pages/Home";

const userRoutes = [
  {
    path: "",
    element: <UserLayout />,
    exact: true,
    children: [
      {
        path: "",
        element: <Home />,
        exact: true,
      },
    ],
  },
  {
    path: "/user/:id",
    component: <h1>User 1</h1>,
    exact: true,
  },
];

export default userRoutes;
