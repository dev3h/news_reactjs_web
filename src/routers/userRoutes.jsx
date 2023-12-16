import PasswordUpdateUser from "../components/PasswordUpdate/PasswordUpdateUser";
import UserLayout from "../layouts/app-layouts/user-layouts";
import DetailPost from "../pages/app-pages/user-pages/DetailPost";
import FilterPost from "../pages/app-pages/user-pages/FilterPostByGroupAnndCategory";
import Home from "../pages/app-pages/user-pages/Home/Home";
import SearchResult from "../pages/app-pages/user-pages/SearchResult";

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
      {
        path: "search",
        element: <SearchResult />,
        exact: true,
      },
      {
        path: "profile",
        element: <PasswordUpdateUser />,
        exact: true,
      },
      {
        // path group but category is optional
        path: "group/:slug/:category?",
        element: <FilterPost />,
        exact: true,
      }
    ],
  },
];

export default userRoutes;
