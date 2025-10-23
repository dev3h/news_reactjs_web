import AuthorLayout from "../../layouts/app-layouts/author-layouts";
import AuthorDashboard from "@/pages/app-pages/author-pages/Dashboard";

import postRoutes from "./managerRoutes/postRoutes";

const authorRoutes = [
  {
    path: "/author",
    element: <AuthorLayout />,
    exact: true,
    children: [
      {
        path: "dashboard",
        element: <AuthorDashboard />,
        exact: true,
      },
      postRoutes,
    ],
  },
];

export default authorRoutes;
