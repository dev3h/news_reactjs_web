import ListCategory from "@/pages/app-pages/admin-pages/category";
import CreateCategory from "@/pages/app-pages/admin-pages/category/Create";
import EditCategory from "@/pages/app-pages/admin-pages/category/Edit";
import ShowCategory from "@/pages/app-pages/admin-pages/category/Show";

const categoryRoutes = {
  path: "category",
  children: [
    {
      path: "",
      element: <ListCategory />,
      exact: true,
    },
    {
      path: "create",
      element: <CreateCategory />,
      exact: true,
    },
    {
      path: ":id/show",
      element: <ShowCategory />,
      exact: true,
    },
    {
      path: ":id/edit",
      element: <EditCategory />,
      exact: true,
    },
  ],
};
export default categoryRoutes;
