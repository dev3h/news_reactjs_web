import AdminLayout from "../layouts/app-layouts/admin-layouts";
import ListGroupCategory from "../pages/admin-pages/group-category";
import CreateGroupCategory from "../pages/admin-pages/group-category/Create";
import EditGroupCategory from "../pages/admin-pages/group-category/Edit";
import ShowGroupCategory from "../pages/admin-pages/group-category/Show";

import ListCategory from "../pages/admin-pages/category";
import CreateCategory from "../pages/admin-pages/category/Create";
import EditCategory from "../pages/admin-pages/category/Edit";
import ShowCategory from "../pages/admin-pages/category/Show";

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
            path: ":id/show",
            element: <ShowGroupCategory />,
            exact: true,
          },
          {
            path: ":id/edit",
            element: <EditGroupCategory />,
            exact: true,
          },
        ],
      },
      {
        path: "category",
        children: [
          {
            path: "",
            element: <ListCategory />,
            exact: true,
          },
          {
            path: "create",
            element: <CreateCategory />,
            exact: true,
          },
          {
            path: ":id/show",
            element: <ShowCategory />,
            exact: true,
          },
          {
            path: ":id/edit",
            element: <EditCategory />,
            exact: true,
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
