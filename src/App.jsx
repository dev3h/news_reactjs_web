import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { AdminContextProvider } from "./context/adminContext";

const App = () => {
  return (
    <AdminContextProvider>
      <RouterProvider router={router} />
    </AdminContextProvider>
  );
};
export default App;
