import AdminLayout from "../layouts/app-layouts/admin-layouts";
import List from "../pages/admin-pages/group-category";

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
        element: <List />,
        exact: true,
      },
    ],
  },
];

export default adminRoutes;
