import adminAuthServices from "@/services/authServices/adminAuthServices";

const logoutAdmin = async (setAdmin, navigate) => {
  try {
    localStorage.removeItem("admin");
    setAdmin(null);
    navigate("/auth/admin/login");
    // const response = await adminAuthServices.logout();
    // if (response) {
    //   localStorage.removeItem("admin");
    //   setAdmin(null);
    //   navigate("/auth/admin/login");
    // }
  } catch (error) {
    console.log(error);
  }
};

export default logoutAdmin;
