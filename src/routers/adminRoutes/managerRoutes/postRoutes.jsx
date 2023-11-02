import ListPost from "@/pages/app-pages/admin-pages/post";
import CreatePost from "@/pages/app-pages/admin-pages/post/Create";
import EditPost from "@/pages/app-pages/admin-pages/post/Edit";
import ShowPost from "@/pages/app-pages/admin-pages/post/Show";

const postRoutes = {
  path: "post",
  children: [
    {
      path: "",
      element: <ListPost />,
      exact: true,
    },
    {
      path: "create",
      element: <CreatePost />,
      exact: true,
    },
    {
      path: ":id/show",
      element: <ShowPost />,
      exact: true,
    },
    {
      path: ":id/edit",
      element: <EditPost />,
      exact: true,
    },
  ],
};

export default postRoutes;
