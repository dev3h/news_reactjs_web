import AuthorLayout from "../../layouts/app-layouts/author-layouts";

import postRoutes from "./managerRoutes/postRoutes";

const authorRoutes = [
  {
    path: "/author",
    element: <AuthorLayout />,
    exact: true,
    children: [
      {
        path: "dashboard",
        element: <h1>author</h1>,
        exact: true,
      },
      postRoutes,
    ],
  },
];

export default authorRoutes;
