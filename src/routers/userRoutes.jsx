import UserLayout from "../layouts/app-layouts/user-layouts";
import DetailPost from "../pages/app-pages/user-pages/DetailPost";
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
      {
        path: ":slug/detail",
        element: <DetailPost />,
        exact: true,
      },
    ],
  },
];

export default userRoutes;
