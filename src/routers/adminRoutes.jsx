import AdminLayout from "../layouts/app-layouts/admin-layouts";
import ListGroupCategory from "../pages/admin-pages/group-category";
import CreateGroupCategory from "../pages/admin-pages/group-category/Create";

const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    exact: true,
    children: [
      {
        path: "dashboard",
        element: <h1>admin</h1>,
        exact: true,
      },
      {
        path: "group-category",
        children: [
          {
            path: "",
            element: <ListGroupCategory />,
            exact: true,
          },
          {
            path: "create",
            element: <CreateGroupCategory />,
            exact: true,
          },
          {
            path: "show/:id",
            element: <h1>show</h1>,
            exact: true,
          },
          {
            path: "edit/:id",
            element: <h1>edit</h1>,
            exact: true,
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
