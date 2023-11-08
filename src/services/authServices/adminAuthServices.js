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
  static async logout() {
    try {
      const response = await axiosInstance.get("/auth/admin/logout");
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async checkRole(accessToken) {
    try {
      const response = await axiosInstance.get("/auth/admin/check-role", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getUserInfo(accessToken) {
    try {
      const response = await axiosInstance.get("/auth/admin/current", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default adminAuthServices;
