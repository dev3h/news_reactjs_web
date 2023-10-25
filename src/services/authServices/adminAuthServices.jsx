import axiosInstance from "@/configs/axiosConfig";

class adminAuthServices {
  static async login({ username, password }) {
    try {
      const response = await axiosInstance.post("/auth/admin/login", {
        username,
        password,
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default adminAuthServices;
