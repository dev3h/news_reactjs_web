import UserAuthLayout from "@/layouts/auth-layouts/user-layouts";
import Register from "@/pages/auth-pages/user-auth/register";
import Login from "@/pages/auth-pages/user-auth/Login";

const userAuthRoutes = [
  {
    path: "/auth",
    element: <UserAuthLayout />,
    exact: true,
    children: [
      {
        path: "login",
        element: <Login />,
        exact: true,
      },
      {
        path: "register",
        element: <Register />,
        exact: true,
      },
      {
        path: "forgot-password",
        element: <h1>Forgot password</h1>,
        exact: true,
      },
    ],
  },
];

export default userAuthRoutes;
