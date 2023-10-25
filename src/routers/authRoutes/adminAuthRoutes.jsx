import AdminAuthLayout from "@/layouts/auth-layouts/admin-layouts";
import AdminLogin from "@/pages/auth-pages/admin-auth/Login";

const adminAuthRoutes = [
  {
    path: "/auth/admin",
    element: <AdminAuthLayout />,
    exact: true,
    children: [
      {
        path: "login",
        element: <AdminLogin />,
        exact: true,
      },
    ],
  },
];

export default adminAuthRoutes;
