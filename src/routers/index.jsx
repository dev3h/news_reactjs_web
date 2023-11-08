import { createBrowserRouter } from "react-router-dom";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import authorRoutes from "./authorRoutes";
import authRoutes from "./authRoutes";

const router = createBrowserRouter([
  ...authRoutes,
  ...userRoutes,
  ...adminRoutes,
  ...authorRoutes,
]);

export default router;
