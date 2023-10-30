import UserAuthLayout from "@/layouts/auth-layouts/user-layouts";
import Register from "@/pages/auth-pages/user-auth/register";
import Login from "@/pages/auth-pages/user-auth/Login";
import ForgotPassword from "@/pages/auth-pages/user-auth/ForgotPassword";
import ResetPassword from "@/pages/auth-pages/user-auth/ResetPassword";

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
        element: <ForgotPassword />,
        exact: true,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
        exact: true,
      },
    ],
  },
];

export default userAuthRoutes;
