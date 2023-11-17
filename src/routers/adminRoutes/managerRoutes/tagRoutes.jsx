import ListTag from "@/pages/app-pages/admin-pages/tag";
import CreateTag from "@/pages/app-pages/admin-pages/tag/Create";
import EditTag from "@/pages/app-pages/admin-pages/tag/Edit";
import ShowTag from "@/pages/app-pages/admin-pages/tag/Show";

const tagRoutes = {
  path: "tag",
  children: [
    {
      path: "",
      element: <ListTag />,
      exact: true,
    },
    {
      path: "create",
      element: <CreateTag />,
      exact: true,
    },
    {
      path: ":id/show",
      element: <ShowTag />,
      exact: true,
    },
    {
      path: ":id/edit",
      element: <EditTag />,
      exact: true,
    },
  ],
};

export default tagRoutes;
