import ListAuthor from "@/pages/app-pages/admin-pages/manager-author";
import CreateAuthor from "@/pages/app-pages/admin-pages/manager-author/Create";
import EditAuthor from "@/pages/app-pages/admin-pages/manager-author/Edit";
import ShowAuthor from "@/pages/app-pages/admin-pages/manager-author/Show";

const managerAuthorRoutes = {
  path: "manager-author",
  children: [
    {
      path: "",
      element: <ListAuthor />,
      exact: true,
    },
    {
      path: "create",
      element: <CreateAuthor />,
      exact: true,
    },
    {
      path: ":id/show",
      element: <ShowAuthor />,
      exact: true,
    },
    {
      path: ":id/edit",
      element: <EditAuthor />,
      exact: true,
    },
  ],
};

export default managerAuthorRoutes;
