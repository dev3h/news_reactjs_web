import ListGroupCategory from "@/pages/app-pages/admin-pages/group-category";
import CreateGroupCategory from "@/pages/app-pages/admin-pages/group-category/Create";
import EditGroupCategory from "@/pages/app-pages/admin-pages/group-category/Edit";
import ShowGroupCategory from "@/pages/app-pages/admin-pages/group-category/Show";

const groupCategoryRoutes = {
  path: "group-category",
  children: [
    {
      path: "",
      element: <ListGroupCategory />,
      exact: true,
    },
    {
      path: "create",
      element: <CreateGroupCategory />,
      exact: true,
    },
    {
      path: ":id/show",
      element: <ShowGroupCategory />,
      exact: true,
    },
    {
      path: ":id/edit",
      element: <EditGroupCategory />,
      exact: true,
    },
  ],
};

export default groupCategoryRoutes;
