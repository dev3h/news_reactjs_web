import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { AdminContextProvider } from "./context/adminContext";
import { UserContextProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserContextProvider>
      <AdminContextProvider>
        <RouterProvider router={router} />
      </AdminContextProvider>
    </UserContextProvider>
  );
};
export default App;
