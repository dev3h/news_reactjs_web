import adminAuthRoutes from "./adminAuthRoutes";
import userAuthRoutes from "./userAuthRoutes";

const authRoutes = [...adminAuthRoutes, ...userAuthRoutes];

export default authRoutes;
