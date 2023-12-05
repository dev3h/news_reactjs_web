import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { AdminContextProvider } from "./context/AdminContext";
import { UserContextProvider } from "./context/UserContext";
import "./App.css";

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
