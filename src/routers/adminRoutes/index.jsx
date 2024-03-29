import AdminLayout from "../../layouts/app-layouts/admin-layouts";

import categoryRoutes from "./managerRoutes/categoryRoutes";
import groupCategoryRoutes from "./managerRoutes/groupCategoryRoutes";
import managerAuthorRoutes from "./managerRoutes/managerAuthorRoutes";
import postRoutes from "./managerRoutes/postRoutes";
import tagRoutes from "./managerRoutes/tagRoutes";

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
      groupCategoryRoutes,
      categoryRoutes,
      postRoutes,
      managerAuthorRoutes,
      tagRoutes,
    ],
  },
];

export default adminRoutes;
