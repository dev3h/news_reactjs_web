import { createBrowserRouter } from "react-router-dom";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";

const router = createBrowserRouter([...userRoutes, ...adminRoutes]);

export default router;
