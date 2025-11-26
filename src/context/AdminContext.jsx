import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem("admin");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Failed to parse admin from localStorage:", e);
      return null;
    }
  });

  const contextValue = useMemo(() => ({ admin, setAdmin }), [admin]);

  return (
    <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>
  );
};

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AdminContext, AdminContextProvider };
