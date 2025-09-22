import AdminAuthServices from "@/services/authServices/AdminAuthServices";

const logoutAdmin = async (setAdmin, navigate) => {
  try {
    localStorage.removeItem("admin");
    setAdmin(null);
    navigate("/auth/admin/login");
    // const response = await AdminAuthServices.logout();
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
