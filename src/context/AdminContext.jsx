import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem("admin");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>{children}</AdminContext.Provider>
  );
};

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AdminContext, AdminContextProvider };
