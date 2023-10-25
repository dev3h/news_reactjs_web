import { createBrowserRouter } from "react-router-dom";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";

const router = createBrowserRouter([...authRoutes, ...userRoutes, ...adminRoutes]);

export default router;
