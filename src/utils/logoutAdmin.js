import AdminAuthServices from "@/services/authServices/AdminAuthServices";

const clearAuthData = (setAdmin, navigate) => {
  localStorage.removeItem("admin");
  setAdmin(null);
  navigate("/auth/admin/login");
}

const logoutAdmin = async (setAdmin, navigate) => {
  try {
    await AdminAuthServices.logout();
  } catch (error) {
    console.log(error);
  } finally {
    clearAuthData(setAdmin, navigate);
  }
};

export default logoutAdmin;
