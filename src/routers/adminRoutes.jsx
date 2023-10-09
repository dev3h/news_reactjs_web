import AdminLayout from "../layouts/app-layouts/admin-layouts";

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
    ],
  },
];

export default adminRoutes;
