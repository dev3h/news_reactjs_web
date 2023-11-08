import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userAuthServices from "@/services/authServices/userAuthServices";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("user"));
    if (userToken) {
      const fetchUser = async () => {
        const response = await userAuthServices.getUserInfo();
        if (response) {
          setUser(response);
        }
      };
      fetchUser();
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserContextProvider };
