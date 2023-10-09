const userRoutes = [
  {
    path: "/user",
    element: <div>Hello world!</div>,
    exact: true,
  },
  {
    path: "/user/:id",
    component: <h1>User 1</h1>,
    exact: true,
  },
];

export default userRoutes;
